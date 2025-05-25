
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Package, 
  ShoppingBag, 
  Settings,
  BarChart3,
  Plus,
  Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

interface RecentActivity {
  id: string;
  type: 'order' | 'user' | 'service' | 'category';
  description: string;
  timestamp: string;
}

const AdminDashboard = () => {
  const { user, isAdmin, isLoading } = useAuth();
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [activityLoading, setActivityLoading] = useState(true);

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
    fetchRecentActivity();
  }, []);

  const fetchRecentActivity = async () => {
    try {
      setActivityLoading(true);
      const activities: RecentActivity[] = [];

      // Fetch recent orders
      const { data: orders } = await supabase
        .from('orders')
        .select('id, first_name, last_name, created_at')
        .order('created_at', { ascending: false })
        .limit(5);

      if (orders) {
        orders.forEach(order => {
          activities.push({
            id: order.id,
            type: 'order',
            description: `New order from ${order.first_name} ${order.last_name}`,
            timestamp: order.created_at
          });
        });
      }

      // Fetch recent users
      const { data: users } = await supabase
        .from('profiles')
        .select('id, first_name, last_name, created_at')
        .order('created_at', { ascending: false })
        .limit(3);

      if (users) {
        users.forEach(user => {
          activities.push({
            id: user.id,
            type: 'user',
            description: `New user registered: ${user.first_name || 'Unknown'} ${user.last_name || 'User'}`,
            timestamp: user.created_at
          });
        });
      }

      // Fetch recent services
      const { data: services } = await supabase
        .from('services')
        .select('id, title, created_at')
        .order('created_at', { ascending: false })
        .limit(3);

      if (services) {
        services.forEach(service => {
          activities.push({
            id: service.id,
            type: 'service',
            description: `New service added: ${service.title}`,
            timestamp: service.created_at
          });
        });
      }

      // Sort all activities by timestamp
      activities.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      setRecentActivity(activities.slice(0, 10));
    } catch (error) {
      console.error('Error fetching recent activity:', error);
    } finally {
      setActivityLoading(false);
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'order': return <ShoppingBag className="h-4 w-4 text-green-600" />;
      case 'user': return <Users className="h-4 w-4 text-blue-600" />;
      case 'service': return <Settings className="h-4 w-4 text-purple-600" />;
      case 'category': return <Package className="h-4 w-4 text-orange-600" />;
      default: return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInHours = Math.floor((now.getTime() - time.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  const dashboardCards = [
    {
      title: 'Service Categories',
      description: 'Manage service categories',
      icon: Package,
      link: '/admin/categories',
      color: 'bg-blue-500'
    },
    {
      title: 'Services',
      description: 'Manage individual services',
      icon: Settings,
      link: '/admin/services',
      color: 'bg-green-500'
    },
    {
      title: 'Users',
      description: 'Manage user accounts',
      icon: Users,
      link: '/admin/users',
      color: 'bg-purple-500'
    },
    {
      title: 'Orders',
      description: 'View and manage orders',
      icon: ShoppingBag,
      link: '/admin/orders',
      color: 'bg-orange-500'
    },
    {
      title: 'Analytics',
      description: 'View reports and analytics',
      icon: BarChart3,
      link: '/admin/analytics',
      color: 'bg-red-500'
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome back! Manage your OnAssist platform from here.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {dashboardCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {card.title}
                  </CardTitle>
                  <div className={`${card.color} p-2 rounded-md`}>
                    <Icon className="h-4 w-4 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">{card.description}</p>
                  <Link to={card.link}>
                    <Button variant="outline" size="sm" className="w-full">
                      Manage
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link to="/admin/add-category">
                <Button className="w-full justify-start">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Category
                </Button>
              </Link>
              <Link to="/admin/add-service">
                <Button variant="outline" className="w-full justify-start">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Service
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              {activityLoading ? (
                <div className="flex justify-center py-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-onassist-primary"></div>
                </div>
              ) : recentActivity.length > 0 ? (
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50">
                      <div className="mt-0.5">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900 truncate">{activity.description}</p>
                        <p className="text-xs text-gray-500">{formatTimeAgo(activity.timestamp)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-600 text-center py-4">
                  No recent activity found.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
