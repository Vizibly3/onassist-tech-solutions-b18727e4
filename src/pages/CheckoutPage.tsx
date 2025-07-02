import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Loader2, ShoppingCart, CreditCard } from 'lucide-react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const checkoutFormSchema = z.object({
  first_name: z.string().min(1, { message: "First name is required" }),
  last_name: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone_number: z.string()
    .regex(/^(\+\d{1,4}\s?)?\d{5,15}$/, { 
      message: "Please enter a valid phone number (e.g., +91 99999 99999)" 
    }),
  address: z.string().min(1, { message: "Address is required" }),
  city: z.string().min(1, { message: "City is required" }),
  state: z.string().min(1, { message: "State is required" }),
  zip_code: z.string().min(1, { message: "ZIP code is required" })
});

type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;

const CheckoutPage = () => {
  const { cart, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      phone_number: '',
      address: '',
      city: '',
      state: '',
      zip_code: ''
    },
  });

  useEffect(() => {
    if (!user) {
      toast.error('Please login to continue with checkout');
      navigate('/auth/login');
      return;
    }

    if (cart.length === 0) {
      toast.error('Your cart is empty');
      navigate('/cart');
      return;
    }

    fetchUserProfile();
  }, [user, cart, navigate]);

  const fetchUserProfile = async () => {
    if (!user) return;

    try {
      console.log('Fetching profile for checkout:', user.id);
      
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error);
        toast.error('Unable to load your profile information');
      }

      if (profile) {
        console.log('Profile found for checkout:', profile);
        form.reset({
          first_name: profile.first_name || '',
          last_name: profile.last_name || '',
          email: user.email || '',
          phone_number: profile.phone_number || '',
          address: profile.address || '',
          city: profile.city || '',
          state: profile.state || '',
          zip_code: profile.zip_code || ''
        });
      } else {
        console.log('No profile found, using user email only');
        form.setValue('email', user.email || '');
      }
    } catch (error) {
      console.error('Error in fetchUserProfile:', error);
      toast.error('Unable to load profile information');
    } finally {
      setIsLoading(false);
    }
  };

  const sendOrderConfirmationEmail = async (orderData: any, cartItems: any[]) => {
    try {
      const { data, error } = await supabase.functions.invoke('send-order-confirmation', {
        body: {
          customerName: `${orderData.first_name} ${orderData.last_name}`,
          customerEmail: orderData.email,
          orderId: orderData.order_id || 'pending',
          orderItems: cartItems.map(item => ({
            title: item.service.title,
            quantity: item.quantity,
            price: item.service.price
          })),
          totalAmount: orderData.total_amount,
          orderDate: new Date().toISOString()
        }
      });

      if (error) {
        console.error('Error sending order confirmation email:', error);
        // Don't throw error here as payment was successful
      } else {
        console.log('Order confirmation email sent successfully');
      }
    } catch (error) {
      console.error('Error in sendOrderConfirmationEmail:', error);
      // Don't throw error here as payment was successful
    }
  };

  const onSubmit = async (values: CheckoutFormValues) => {
    if (!user || cart.length === 0) return;

    setIsProcessing(true);
    try {
      console.log('Processing payment with values:', values);
      
      const orderData = {
        user_id: user.id,
        total_amount: totalPrice,
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
        phone_number: values.phone_number,
        address: values.address,
        city: values.city,
        state: values.state,
        zip_code: values.zip_code
      };

      const cartItems = cart.map(item => ({
        service: item.service,
        quantity: item.quantity
      }));

      console.log('Calling create-payment function with:', { orderData, cartItems });

      // Call Stripe payment function
      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: {
          orderData,
          cartItems
        }
      });

      if (error) {
        console.error('Payment function error:', error);
        throw new Error(error.message || 'Payment processing failed');
      }

      console.log('Payment session created:', data);

      // Update profile with new address info if needed
      try {
        await supabase
          .from('profiles')
          .upsert({
            id: user.id,
            first_name: values.first_name,
            last_name: values.last_name,
            phone_number: values.phone_number,
            address: values.address,
            city: values.city,
            state: values.state,
            zip_code: values.zip_code
          });
      } catch (profileError) {
        console.error('Error updating profile:', profileError);
        // Don't throw error here as payment session was successful
      }

      // Send order confirmation email
      await sendOrderConfirmationEmail({
        ...orderData,
        order_id: data.order_id || 'pending'
      }, cartItems);

      // Clear cart before redirect
      await clearCart();

      // Redirect to payment URL or success page
      if (data.url) {
        if (data.message && data.message.includes('TEST MODE')) {
          toast.success('Test mode: Order created successfully!');
          // For test mode, redirect to success page directly
          window.location.href = data.url;
        } else {
          toast.success('Redirecting to payment...');
          window.location.href = data.url;
        }
      } else {
        throw new Error('No payment URL received');
      }

    } catch (error: any) {
      console.error('Checkout error:', error);
      toast.error(error.message || 'Failed to process your order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!user) {
    return null;
  }

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Helmet>
        <title>Checkout | OnAssist</title>
      </Helmet>
      
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between items-center py-2 border-b">
                      <div className="flex-1">
                        <h4 className="font-medium">{item.service.title}</h4>
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-semibold">${(item.service.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                  <div className="flex justify-between items-center pt-4 border-t font-bold text-lg">
                    <span>Total:</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Billing Information */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Billing Information</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="first_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="First name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="last_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="Last name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email *</FormLabel>
                          <FormControl>
                            <Input placeholder="Email address" type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone_number"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number *</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="e.g., +91 99999 99999" 
                              {...field} 
                              type="tel"
                            />
                          </FormControl>
                          <FormMessage />
                          <p className="text-xs text-muted-foreground">
                            Include your country code (e.g., +91, +1, +44)
                          </p>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address *</FormLabel>
                          <FormControl>
                            <Input placeholder="Street address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City *</FormLabel>
                            <FormControl>
                              <Input placeholder="City" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>State *</FormLabel>
                            <FormControl>
                              <Input placeholder="State" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="zip_code"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>ZIP Code *</FormLabel>
                            <FormControl>
                              <Input placeholder="ZIP" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                      <div className="flex items-center gap-2 mb-2">
                        <CreditCard className="h-5 w-5 text-blue-600" />
                        <h3 className="font-semibold text-blue-800">Secure Payment with Stripe</h3>
                      </div>
                      <p className="text-sm text-blue-700">
                        Your payment will be processed securely by Stripe. You'll be redirected to complete your payment.
                      </p>
                      <p className="text-xs text-blue-600 mt-1">
                        Test Mode: Use card 4242 4242 4242 4242 with any future date and CVC
                      </p>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full mt-6 bg-blue-600 hover:bg-blue-700" 
                      disabled={isProcessing}
                      size="lg"
                    >
                      {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      {isProcessing ? 'Processing...' : `Pay $${totalPrice.toFixed(2)} with Stripe`}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CheckoutPage;
