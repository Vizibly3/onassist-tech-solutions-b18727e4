
import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { CheckCircle, Loader2, XCircle } from 'lucide-react';
import { toast } from 'sonner';

const PaymentSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [verificationStatus, setVerificationStatus] = useState<'loading' | 'success' | 'failed'>('loading');
  const [orderDetails, setOrderDetails] = useState<any>(null);

  useEffect(() => {
    if (sessionId) {
      verifyPayment();
    } else {
      setVerificationStatus('failed');
    }
  }, [sessionId]);

  const verifyPayment = async () => {
    try {
      console.log('Verifying payment for session:', sessionId);
      
      const { data, error } = await supabase.functions.invoke('verify-payment', {
        body: { sessionId }
      });

      if (error) {
        console.error('Payment verification error:', error);
        throw new Error(error.message);
      }

      console.log('Payment verification result:', data);

      if (data.paymentStatus === 'paid') {
        setVerificationStatus('success');
        
        // Fetch order details
        const { data: orderData, error: orderError } = await supabase
          .from('orders')
          .select(`
            *,
            order_items (
              *
            )
          `)
          .eq('payment_id', sessionId)
          .single();

        if (!orderError && orderData) {
          setOrderDetails(orderData);
        }

        toast.success('Payment successful! Your order has been confirmed.');
      } else {
        setVerificationStatus('failed');
        toast.error('Payment was not completed successfully.');
      }
    } catch (error: any) {
      console.error('Error verifying payment:', error);
      setVerificationStatus('failed');
      toast.error('Unable to verify payment status.');
    }
  };

  if (verificationStatus === 'loading') {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-blue-600" />
            <h1 className="text-2xl font-bold mb-2">Verifying Your Payment</h1>
            <p className="text-gray-600">Please wait while we confirm your payment...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Helmet>
        <title>{verificationStatus === 'success' ? 'Payment Successful' : 'Payment Failed'} | OnAssist</title>
      </Helmet>
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          {verificationStatus === 'success' ? (
            <Card className="border-green-200 bg-green-50">
              <CardHeader className="text-center">
                <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                <CardTitle className="text-2xl text-green-800">Payment Successful!</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <p className="text-green-700">
                  Thank you for your payment! Your order has been confirmed and we will contact you soon to schedule your services.
                </p>
                
                {orderDetails && (
                  <div className="bg-white rounded-lg p-4 mt-6">
                    <h3 className="font-semibold mb-3">Order Details</h3>
                    <div className="text-left space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Order ID:</span>
                        <span className="font-mono">{orderDetails.id.slice(0, 8)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Amount:</span>
                        <span className="font-semibold">${orderDetails.total_amount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Payment Status:</span>
                        <span className="text-green-600 font-semibold">Paid</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Services:</span>
                        <span>{orderDetails.order_items?.length || 0} item(s)</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-4 justify-center mt-6">
                  <Button asChild>
                    <Link to="/my-orders">View My Orders</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/services">Continue Shopping</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-red-200 bg-red-50">
              <CardHeader className="text-center">
                <XCircle className="h-16 w-16 text-red-600 mx-auto mb-4" />
                <CardTitle className="text-2xl text-red-800">Payment Failed</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <p className="text-red-700">
                  We were unable to process your payment. Please try again or contact our support team for assistance.
                </p>
                
                <div className="flex gap-4 justify-center mt-6">
                  <Button asChild>
                    <Link to="/cart">Return to Cart</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/contact">Contact Support</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default PaymentSuccessPage;
