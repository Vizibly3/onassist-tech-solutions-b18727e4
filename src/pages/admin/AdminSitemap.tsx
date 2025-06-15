
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import SitemapGenerator from '@/components/admin/SitemapGenerator';

const AdminSitemap = () => {
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

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Sitemap Management</h1>
          <p className="text-gray-600">Generate and manage your website sitemap for better SEO</p>
        </div>
        
        <SitemapGenerator />
      </div>
    </Layout>
  );
};

export default AdminSitemap;
