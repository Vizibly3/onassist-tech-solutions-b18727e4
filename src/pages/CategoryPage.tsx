
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useServiceCategories, useServicesByCategory } from '@/hooks/useServices';
import CategorySection from '@/components/services/CategorySection';
import { Button } from '@/components/ui/button';
import { Helmet } from 'react-helmet-async';
import { siteConfig } from '@/config/site';
import { ChevronLeft } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const CategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { data: categories, isLoading: categoriesLoading } = useServiceCategories();
  const { data: services, isLoading: servicesLoading } = useServicesByCategory(categoryId || '');
  
  const category = categories?.find(cat => cat.id === categoryId);
  const isLoading = categoriesLoading || servicesLoading;
  
  // Create a safe title that's always a string
  const pageTitle = category?.title ? `${category.title} Services` : 'Services';
  const pageDescription = category?.description || 'Browse our professional tech support services';
  
  if (!isLoading && !category) {
    return (
      <Layout>
        <Helmet>
          <title>Category not found | {siteConfig.name}</title>
          <meta name="description" content="The service category you're looking for doesn't exist." />
        </Helmet>
        <div className="min-h-[50vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Category not found</h1>
            <p className="text-gray-600 mb-6">The service category you're looking for doesn't exist.</p>
            <Button asChild>
              <Link to="/services">View All Services</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <Helmet>
        <title>{pageTitle} | {siteConfig.name}</title>
        <meta name="description" content={pageDescription} />
      </Helmet>
      
      <div className="bg-gradient-to-r from-onassist-primary to-onassist-dark text-white py-16">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <Button 
              asChild
              variant="outline" 
              size="sm"
              className="border-white/40 text-white hover:bg-white/10"
            >
              <Link to="/services" className="flex items-center gap-1">
                <ChevronLeft className="h-4 w-4" />
                All Services
              </Link>
            </Button>
          </div>
          
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-12 w-64 bg-white/20" />
              <Skeleton className="h-6 w-96 bg-white/20" />
            </div>
          ) : (
            <>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{category?.title || 'Services'}</h1>
              <p className="text-xl max-w-3xl opacity-90">
                {category?.description || 'Browse our professional tech support services'}
              </p>
            </>
          )}
        </div>
      </div>
      
      {isLoading ? (
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-96 rounded-xl" />
            ))}
          </div>
        </div>
      ) : category && services ? (
        <CategorySection category={{ ...category, services }} showAll />
      ) : null}
    </Layout>
  );
};

export default CategoryPage;
