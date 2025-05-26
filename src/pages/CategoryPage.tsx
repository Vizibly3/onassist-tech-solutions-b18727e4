
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import ServiceCard from '@/components/services/ServiceCard';
import { Button } from "@/components/ui/button";
import { Helmet } from 'react-helmet-async';
import { siteConfig } from '@/config/site';
import { useServicesByCategory, useCategoryBySlug } from '@/hooks/useServices';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft } from 'lucide-react';

const CategoryPage = () => {
  const { categorySlug } = useParams();
  const navigate = useNavigate();
  const { data: category } = useCategoryBySlug(categorySlug || '');
  const { data: services, isLoading, error } = useServicesByCategory(categorySlug || '');

  const handleGoBack = () => {
    navigate('/services');
  };

  if (error) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Error loading services</h1>
            <p className="text-gray-600 mb-6">Please try again later.</p>
            <Button onClick={handleGoBack} variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Services
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  if (!category) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Category not found</h1>
            <p className="text-gray-600 mb-6">The category you're looking for doesn't exist.</p>
            <Button onClick={handleGoBack} variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Services
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Helmet>
        <title>{category.title} Services | {siteConfig.name}</title>
        <meta name="description" content={category.description} />
      </Helmet>
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-onassist-primary to-onassist-dark text-white py-16">
        <div className="container mx-auto px-4">
          <Button
            onClick={handleGoBack}
            variant="ghost"
            className="text-white hover:bg-white/10 mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to All Services
          </Button>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{category.title}</h1>
              <p className="text-xl opacity-90 mb-6">{category.description}</p>
              <div className="text-lg">
                {isLoading ? (
                  <Skeleton className="h-6 w-32" />
                ) : (
                  <span>{services?.length || 0} services available</span>
                )}
              </div>
            </div>
            
            {category.image_url && (
              <div className="relative">
                <img 
                  src={category.image_url} 
                  alt={category.title}
                  className="w-full h-80 object-cover rounded-xl shadow-2xl"
                />
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Services Grid */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-96 rounded-xl" />
              ))}
            </div>
          ) : services && services.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-2xl font-semibold mb-4">No services available</h3>
              <p className="text-gray-600 mb-6">
                We're working on adding services to this category. Please check back soon!
              </p>
              <Button onClick={handleGoBack} variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to All Services
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryPage;
