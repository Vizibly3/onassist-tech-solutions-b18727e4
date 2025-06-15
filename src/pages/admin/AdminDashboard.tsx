
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, ShoppingCart, Package, BarChart3, Settings, FileText, Globe } from 'lucide-react';

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

  const adminCards = [
    {
      title: 'Analytics',
      description: 'View site analytics and performance metrics',
      icon: BarChart3,
      href: '/admin/analytics',
      color: 'bg-blue-500'
    },
    {
      title: 'Users',
      description: 'Manage user accounts and permissions',
      icon: Users,
      href: '/admin/users',
      color: 'bg-green-500'
    },
    {
      title: 'Orders',
      description: 'View and manage customer orders',
      icon: ShoppingCart,
      href: '/admin/orders',
      color: 'bg-yellow-500'
    },
    {
      title: 'Services',
      description: 'Manage services and categories',
      icon: Package,
      href: '/admin/services',
      color: 'bg-purple-500'
    },
    {
      title: 'Categories',
      description: 'Manage service categories',
      icon: FileText,
      href: '/admin/categories',
      color: 'bg-indigo-500'
    },
    {
      title: 'Site Settings',
      description: 'Configure site-wide settings',
      icon: Settings,
      href: '/admin/site-settings',
      color: 'bg-gray-500'
    },
    {
      title: 'Sitemap Generator',
      description: 'Generate and download sitemap for SEO',
      icon: Globe,
      href: '/admin/sitemap',
      color: 'bg-orange-500'
    },
    {
      title: 'Contact Inquiries',
      description: 'View and respond to customer inquiries',
      icon: FileText,
      href: '/admin/contacts',
      color: 'bg-red-500'
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your OnAssist platform</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminCards.map((card) => (
            <Card key={card.href} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{card.title}</CardTitle>
                  <div className={`p-2 rounded-lg ${card.color}`}>
                    <card.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{card.description}</p>
                <Button asChild className="w-full">
                  <a href={card.href}>Access {card.title}</a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
