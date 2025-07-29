
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Helmet } from 'react-helmet-async';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';

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

const MyOrdersPage = () => {
  const { user } = useAuth();

  const { data: orders, isLoading } = useQuery({
    queryKey: ['orders', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
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

      if (error) throw error;
      return data as Order[];
    },
    enabled: !!user,
  });

  if (!user) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-gray-600">Please log in to view your orders.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Helmet>
        <title>My Orders | Smart Doorstep</title>
        <meta name="description" content="View your order history and track your tech support services" />
      </Helmet>
      
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-8">My Orders</h1>
        
        {isLoading ? (
          <div className="space-y-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-48 w-full rounded-lg" />
            ))}
          </div>
        ) : orders && orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">Order #{order.id.slice(0, 8)}</CardTitle>
                      <p className="text-gray-600">
                        Placed on {format(new Date(order.created_at), 'MMM dd, yyyy')}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">${order.total_amount.toFixed(2)}</p>
                      <div className="space-x-2">
                        <Badge variant={order.status === 'completed' ? 'default' : 'secondary'}>
                          {order.status}
                        </Badge>
                        <Badge variant={order.payment_status === 'paid' ? 'default' : 'destructive'}>
                          {order.payment_status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <h4 className="font-semibold">Services:</h4>
                    {order.order_items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b last:border-0">
                        <div>
                          <p className="font-medium">{item.service_title}</p>
                          <p className="text-gray-600">Quantity: {item.quantity}</p>
                        </div>
                        <p className="font-semibold">${(item.service_price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-xl font-semibold mb-4">No orders yet</h2>
            <p className="text-gray-600 mb-8">You haven't placed any orders. Start browsing our services!</p>
            <a href="/services" className="bg-onassist-primary text-white px-6 py-3 rounded-lg hover:bg-onassist-dark transition-colors">
              Browse Services
            </a>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MyOrdersPage;
