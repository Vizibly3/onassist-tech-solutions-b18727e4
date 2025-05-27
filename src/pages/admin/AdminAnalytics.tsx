
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Calendar, Users, ShoppingCart, DollarSign, Activity } from 'lucide-react';

interface AnalyticsData {
  totalUsers: number;
  totalOrders: number;
  totalRevenue: number;
  totalServices: number;
  recentActivities: Activity[];
  ordersByStatus: Array<{ name: string; value: number }>;
  monthlyRevenue: Array<{ month: string; revenue: number; orders: number }>;
}

interface Activity {
  id: string;
  type: 'order' | 'user' | 'service';
  description: string;
  timestamp: string;
}

const AdminAnalytics = () => {
  const { user, isAdmin, isLoading } = useAuth();
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    totalServices: 0,
    recentActivities: [],
    ordersByStatus: [],
    monthlyRevenue: []
  });
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
    
    // Set up real-time subscriptions
    const ordersChannel = supabase
      .channel('orders-channel')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, () => {
        fetchAnalytics();
      })
      .subscribe();

    const usersChannel = supabase
      .channel('users-channel')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'profiles' }, () => {
        fetchAnalytics();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(ordersChannel);
      supabase.removeChannel(usersChannel);
    };
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);

      // Fetch total users
      const { count: usersCount } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      // Fetch orders data
      const { data: ordersData } = await supabase
        .from('orders')
        .select('total_amount, status, created_at, first_name, last_name');

      // Fetch total services
      const { count: servicesCount } = await supabase
        .from('services')
        .select('*', { count: 'exact', head: true });

      // Fetch recent users for activity
      const { data: recentUsers } = await supabase
        .from('profiles')
        .select('id, first_name, last_name, created_at')
        .order('created_at', { ascending: false })
        .limit(5);

      // Calculate analytics
      const totalRevenue = ordersData?.reduce((sum, order) => sum + Number(order.total_amount), 0) || 0;
      
      const ordersByStatus = [
        { name: 'Pending', value: ordersData?.filter(o => o.status === 'pending').length || 0 },
        { name: 'Confirmed', value: ordersData?.filter(o => o.status === 'confirmed').length || 0 },
        { name: 'In Progress', value: ordersData?.filter(o => o.status === 'in_progress').length || 0 },
        { name: 'Completed', value: ordersData?.filter(o => o.status === 'completed').length || 0 },
        { name: 'Cancelled', value: ordersData?.filter(o => o.status === 'cancelled').length || 0 }
      ];

      // Calculate monthly revenue from actual data
      const monthlyData: { [key: string]: { revenue: number; orders: number } } = {};
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      
      // Initialize last 6 months
      const currentDate = new Date();
      for (let i = 5; i >= 0; i--) {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
        const monthKey = months[date.getMonth()];
        monthlyData[monthKey] = { revenue: 0, orders: 0 };
      }

      // Aggregate data by month
      ordersData?.forEach(order => {
        const orderDate = new Date(order.created_at);
        const monthKey = months[orderDate.getMonth()];
        if (monthlyData[monthKey]) {
          monthlyData[monthKey].revenue += Number(order.total_amount);
          monthlyData[monthKey].orders += 1;
        }
      });

      const monthlyRevenue = Object.entries(monthlyData).map(([month, data]) => ({
        month,
        revenue: Math.round(data.revenue),
        orders: data.orders
      }));

      // Generate real-time recent activities
      const recentActivities: Activity[] = [];

      // Add recent orders
      const recentOrders = ordersData?.slice(0, 5) || [];
      recentOrders.forEach(order => {
        recentActivities.push({
          id: `order-${Math.random()}`,
          type: 'order',
          description: `New order from ${order.first_name} ${order.last_name} - $${order.total_amount}`,
          timestamp: order.created_at
        });
      });

      // Add recent users
      recentUsers?.forEach(user => {
        recentActivities.push({
          id: `user-${user.id}`,
          type: 'user',
          description: `New user registered: ${user.first_name || 'Unknown'} ${user.last_name || 'User'}`,
          timestamp: user.created_at
        });
      });

      // Sort activities by timestamp
      recentActivities.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

      setAnalytics({
        totalUsers: usersCount || 0,
        totalOrders: ordersData?.length || 0,
        totalRevenue,
        totalServices: servicesCount || 0,
        recentActivities: recentActivities.slice(0, 8),
        ordersByStatus,
        monthlyRevenue
      });

    } catch (error: any) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'order':
        return <ShoppingCart className="h-4 w-4" />;
      case 'user':
        return <Users className="h-4 w-4" />;
      case 'service':
        return <Activity className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - time.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600">Real-time business performance metrics</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-onassist-primary"></div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100">Total Users</p>
                      <p className="text-3xl font-bold">{analytics.totalUsers}</p>
                    </div>
                    <Users className="h-10 w-10 text-blue-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100">Total Orders</p>
                      <p className="text-3xl font-bold">{analytics.totalOrders}</p>
                    </div>
                    <ShoppingCart className="h-10 w-10 text-green-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-yellow-100">Total Revenue</p>
                      <p className="text-3xl font-bold">${analytics.totalRevenue.toFixed(2)}</p>
                    </div>
                    <DollarSign className="h-10 w-10 text-yellow-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100">Total Services</p>
                      <p className="text-3xl font-bold">{analytics.totalServices}</p>
                    </div>
                    <Activity className="h-10 w-10 text-purple-200" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Monthly Revenue Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Revenue & Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={analytics.monthlyRevenue}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip 
                        formatter={(value, name) => [
                          name === 'revenue' ? `$${value}` : value,
                          name === 'revenue' ? 'Revenue' : 'Orders'
                        ]}
                      />
                      <Bar yAxisId="left" dataKey="revenue" fill="#8884d8" name="revenue" />
                      <Bar yAxisId="right" dataKey="orders" fill="#82ca9d" name="orders" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Orders by Status Pie Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Orders by Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={analytics.ordersByStatus.filter(item => item.value > 0)}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {analytics.ordersByStatus.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Recent Activity (Real-time)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {analytics.recentActivities.length > 0 ? (
                    analytics.recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-start space-x-4 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                        <div className={`flex-shrink-0 p-2 rounded-full ${
                          activity.type === 'order' ? 'bg-green-100 text-green-600' :
                          activity.type === 'user' ? 'bg-blue-100 text-blue-600' :
                          'bg-purple-100 text-purple-600'
                        }`}>
                          {getActivityIcon(activity.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                          <p className="text-xs text-gray-500">
                            {formatTimeAgo(activity.timestamp)}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-600 text-center py-8">
                      No recent activity found.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AdminAnalytics;
