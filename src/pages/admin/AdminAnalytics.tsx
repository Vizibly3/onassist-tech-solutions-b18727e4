
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { DollarSign, Users, ShoppingBag, TrendingUp } from 'lucide-react';

interface AnalyticsData {
  totalRevenue: number;
  totalOrders: number;
  totalUsers: number;
  totalServices: number;
  monthlyRevenue: Array<{ month: string; revenue: number }>;
  topServices: Array<{ name: string; orders: number }>;
  orderStatus: Array<{ status: string; count: number; color: string }>;
}

const AdminAnalytics = () => {
  const { user, isAdmin, isLoading } = useAuth();
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 flex justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-onassist-primary"></div>
        </div>
      </Layout>
    );
  }

  if (!user || !isAdmin) {
    return <Navigate to="/auth/login" replace />;
  }

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);

      // Fetch total revenue and orders
      const { data: orders, error: ordersError } = await supabase
        .from('orders')
        .select('total_amount, status, created_at');

      if (ordersError) throw ordersError;

      // Fetch total users
      const { data: users, error: usersError } = await supabase
        .from('profiles')
        .select('id');

      if (usersError) throw usersError;

      // Fetch total services
      const { data: services, error: servicesError } = await supabase
        .from('services')
        .select('id');

      if (servicesError) throw servicesError;

      // Fetch order items for top services
      const { data: orderItems, error: itemsError } = await supabase
        .from('order_items')
        .select('service_title, quantity');

      if (itemsError) throw itemsError;

      // Calculate analytics
      const totalRevenue = orders?.reduce((sum, order) => sum + order.total_amount, 0) || 0;
      const totalOrders = orders?.length || 0;
      const totalUsers = users?.length || 0;
      const totalServices = services?.length || 0;

      // Monthly revenue (last 6 months)
      const monthlyRevenue = getMonthlyRevenue(orders || []);

      // Top services
      const topServices = getTopServices(orderItems || []);

      // Order status distribution
      const orderStatus = getOrderStatusDistribution(orders || []);

      setAnalytics({
        totalRevenue,
        totalOrders,
        totalUsers,
        totalServices,
        monthlyRevenue,
        topServices,
        orderStatus
      });
    } catch (error: any) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const getMonthlyRevenue = (orders: any[]) => {
    const monthlyData = new Map();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    orders.forEach(order => {
      const date = new Date(order.created_at);
      const monthKey = `${months[date.getMonth()]} ${date.getFullYear()}`;
      monthlyData.set(monthKey, (monthlyData.get(monthKey) || 0) + order.total_amount);
    });

    return Array.from(monthlyData.entries()).map(([month, revenue]) => ({
      month,
      revenue
    })).slice(-6);
  };

  const getTopServices = (orderItems: any[]) => {
    const serviceCount = new Map();
    
    orderItems.forEach(item => {
      const count = serviceCount.get(item.service_title) || 0;
      serviceCount.set(item.service_title, count + item.quantity);
    });

    return Array.from(serviceCount.entries())
      .map(([name, orders]) => ({ name, orders }))
      .sort((a, b) => b.orders - a.orders)
      .slice(0, 5);
  };

  const getOrderStatusDistribution = (orders: any[]) => {
    const statusCount = new Map();
    const colors = {
      pending: '#fbbf24',
      confirmed: '#3b82f6',
      in_progress: '#8b5cf6',
      completed: '#10b981',
      cancelled: '#ef4444'
    };

    orders.forEach(order => {
      const count = statusCount.get(order.status) || 0;
      statusCount.set(order.status, count + 1);
    });

    return Array.from(statusCount.entries()).map(([status, count]) => ({
      status: status.replace('_', ' ').toUpperCase(),
      count,
      color: colors[status as keyof typeof colors] || '#6b7280'
    }));
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 flex justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-onassist-primary"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600">Business insights and performance metrics</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${analytics?.totalRevenue.toFixed(2)}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics?.totalOrders}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics?.totalUsers}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Services</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics?.totalServices}</div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Revenue */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={analytics?.monthlyRevenue}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                  <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Order Status Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Order Status Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={analytics?.orderStatus}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="count"
                    label={({ status, count }) => `${status}: ${count}`}
                  >
                    {analytics?.orderStatus.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Top Services */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Top Services</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analytics?.topServices}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="orders" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default AdminAnalytics;
