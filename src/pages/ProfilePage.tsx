import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Helmet } from 'react-helmet-async';
import { siteConfig } from '@/config/site';
import { Loader2, User, ShoppingBag, Calendar, Package, AlertCircle } from 'lucide-react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';

const profileFormSchema = z.object({
  first_name: z.string().min(1, { message: "First name is required" }),
  last_name: z.string().min(1, { message: "Last name is required" }),
  phone_number: z.string()
    .regex(/^\+\d{1,4}\s\d{5,15}$/, { 
      message: "Please enter a valid phone number (e.g., +91 99999 99999)" 
    })
    .optional()
    .or(z.literal('')),
  address: z.string().optional().or(z.literal('')),
  city: z.string().optional().or(z.literal('')),
  state: z.string().optional().or(z.literal('')),
  zip_code: z.string().optional().or(z.literal(''))
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

interface Order {
  id: string;
  total_amount: number;
  status: string;
  payment_status: string;
  created_at: string;
  order_items: {
    quantity: number;
    service_title: string;
    service_price: number;
  }[];
}

const ProfilePage = () => {
  const { user, profile, refreshProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      phone_number: '',
      address: '',
      city: '',
      state: '',
      zip_code: ''
    },
  });

  // Fixed orders query with better error handling
  const { data: orders, isLoading: ordersLoading, error: ordersError, refetch: refetchOrders } = useQuery({
    queryKey: ['user_orders', user?.id],
    queryFn: async () => {
      if (!user?.id) {
        return [];
      }
      
      console.log('Fetching orders for user:', user.id);
      
      try {
        const { data, error } = await supabase
          .from('orders')
          .select(`
            id,
            total_amount,
            status,
            payment_status,
            created_at,
            order_items (
              quantity,
              service_title,
              service_price
            )
          `)
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Supabase error:', error);
          throw new Error(`Failed to fetch orders: ${error.message}`);
        }
        
        console.log('Orders fetched successfully:', data);
        return data as Order[] || [];
      } catch (error) {
        console.error('Error in orders query:', error);
        throw error;
      }
    },
    enabled: !!user?.id,
    retry: 2,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (user) {
      fetchOrCreateProfile();
    }
  }, [user]);

  useEffect(() => {
    if (profile) {
      form.reset({
        first_name: profile.first_name || '',
        last_name: profile.last_name || '',
        phone_number: profile.phone_number || '',
        address: profile.address || '',
        city: profile.city || '',
        state: profile.state || '',
        zip_code: profile.zip_code || ''
      });
      setIsLoading(false);
    }
  }, [profile, form]);

  const fetchOrCreateProfile = async () => {
    if (!user) return;
    
    try {
      console.log('Fetching profile for user:', user.id);
      
      const { data: existingProfile, error: fetchError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (fetchError && fetchError.code === 'PGRST116') {
        console.log('Profile not found, creating new profile...');
        
        const newProfile = {
          id: user.id,
          first_name: user.user_metadata?.first_name || '',
          last_name: user.user_metadata?.last_name || '',
          phone_number: user.user_metadata?.phone || user.phone || '',
          address: '',
          city: '',
          state: '',
          zip_code: ''
        };

        const { data: createdProfile, error: createError } = await supabase
          .from('profiles')
          .upsert(newProfile)
          .select()
          .single();

        if (createError) {
          console.error('Error creating profile:', createError);
          throw createError;
        }

        console.log('Profile created successfully:', createdProfile);
        
        form.reset({
          first_name: createdProfile.first_name || '',
          last_name: createdProfile.last_name || '',
          phone_number: createdProfile.phone_number || '',
          address: createdProfile.address || '',
          city: createdProfile.city || '',
          state: createdProfile.state || '',
          zip_code: createdProfile.zip_code || ''
        });
        
      } else if (fetchError) {
        console.error('Error fetching profile:', fetchError);
        throw fetchError;
      } else {
        console.log('Profile found:', existingProfile);
        
        form.reset({
          first_name: existingProfile.first_name || '',
          last_name: existingProfile.last_name || '',
          phone_number: existingProfile.phone_number || '',
          address: existingProfile.address || '',
          city: existingProfile.city || '',
          state: existingProfile.state || '',
          zip_code: existingProfile.zip_code || ''
        });
      }
    } catch (error) {
      console.error('Error in fetchOrCreateProfile:', error);
      toast.error('Failed to load profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (values: ProfileFormValues) => {
    if (!user) return;

    setIsSaving(true);
    try {
      console.log('Saving profile with values:', values);
      
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          ...values,
          updated_at: new Date().toISOString()
        });

      if (error) {
        console.error('Error updating profile:', error);
        throw error;
      }

      console.log('Profile updated successfully');
      toast.success('Profile updated successfully!');
      
      await refreshProfile();
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  if (!user) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-gray-600">Please log in to view your profile.</p>
        </div>
      </Layout>
    );
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
        <title>Profile | {siteConfig.name}</title>
        <meta name="description" content="Manage your profile information and view order history" />
      </Helmet>
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">My Account</h1>
          
          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Profile Information
              </TabsTrigger>
              <TabsTrigger value="orders" className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4" />
                My Orders
                {orders && orders.length > 0 && (
                  <Badge variant="secondary" className="ml-1">
                    {orders.length}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="first_name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>First Name *</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter your first name" {...field} />
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
                                <Input placeholder="Enter your last name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="phone_number"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="e.g., +91 99999 99999" 
                                {...field} 
                                type="tel"
                              />
                            </FormControl>
                            <FormMessage />
                            <p className="text-xs text-muted-foreground mt-1">
                              Format: +[Country Code] [Phone Number] (e.g., +91 99999 99999)
                            </p>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your street address" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <FormField
                          control={form.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>City</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter your city" {...field} />
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
                              <FormLabel>State</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter your state" {...field} />
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
                              <FormLabel>ZIP Code</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter your ZIP code" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <Button type="submit" disabled={isSaving} className="w-full">
                        {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Save Profile
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="orders">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="w-5 h-5" />
                    Order History
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => refetchOrders()}
                      className="ml-auto"
                    >
                      Refresh
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {ordersLoading ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="h-8 w-8 animate-spin" />
                    </div>
                  ) : ordersError ? (
                    <div className="text-center py-8">
                      <AlertCircle className="w-16 h-16 text-red-300 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2 text-red-600">Error loading orders</h3>
                      <p className="text-gray-600 mb-4">
                        {ordersError instanceof Error ? ordersError.message : 'There was an issue loading your orders. Please try again.'}
                      </p>
                      <Button onClick={() => refetchOrders()} variant="outline">
                        Retry
                      </Button>
                    </div>
                  ) : orders && orders.length > 0 ? (
                    <div className="space-y-6">
                      {orders.map((order) => (
                        <Card key={order.id} className="shadow-md">
                          <CardContent className="p-6">
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <h3 className="font-semibold text-lg">Order #{order.id.slice(0, 8)}</h3>
                                <div className="flex items-center gap-2 text-gray-600 mt-1">
                                  <Calendar className="w-4 h-4" />
                                  <span>Placed on {format(new Date(order.created_at), 'MMM dd, yyyy')}</span>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-2xl font-bold text-onassist-primary">${order.total_amount.toFixed(2)}</p>
                                <div className="space-x-2 mt-2">
                                  <Badge variant={order.status === 'completed' ? 'default' : 'secondary'}>
                                    {order.status}
                                  </Badge>
                                  <Badge variant={order.payment_status === 'paid' ? 'default' : 'destructive'}>
                                    {order.payment_status}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                            
                            <div className="border-t pt-4">
                              <h4 className="font-semibold mb-3">Services Ordered:</h4>
                              <div className="space-y-2">
                                {order.order_items && order.order_items.length > 0 ? (
                                  order.order_items.map((item, index) => (
                                    <div key={index} className="flex justify-between items-center py-2 px-4 bg-gray-50 rounded-lg">
                                      <div>
                                        <p className="font-medium">{item.service_title}</p>
                                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                                      </div>
                                      <p className="font-semibold text-onassist-primary">${(item.service_price * item.quantity).toFixed(2)}</p>
                                    </div>
                                  ))
                                ) : (
                                  <p className="text-gray-500 text-sm">No items found for this order</p>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16">
                      <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2">No orders yet</h3>
                      <p className="text-gray-600 mb-6">You haven't placed any orders. Start browsing our services!</p>
                      <Button asChild>
                        <a href="/services">Browse Services</a>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
