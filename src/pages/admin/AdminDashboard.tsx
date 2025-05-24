
import React from 'react';
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
  Plus
} from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const { user, isAdmin, isLoading } = useAuth();

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
              <Link to="/admin/categories/new">
                <Button className="w-full justify-start">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Category
                </Button>
              </Link>
              <Link to="/admin/services/new">
                <Button variant="outline" className="w-full justify-start">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Service
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Recent activity will be displayed here. This feature is coming soon.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
