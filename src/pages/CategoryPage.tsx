
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import ServiceCard from '@/components/services/ServiceCard';
import { Button } from '@/components/ui/button';
import { Helmet } from 'react-helmet-async';
import { siteConfig } from '@/config/site';
import { useServicesByCategory } from '@/hooks/useServices';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, Phone, MessageCircle } from 'lucide-react';

const CategoryPage = () => {
  const { categorySlug } = useParams();
  const { data: services, isLoading, error } = useServicesByCategory(categorySlug || '');

  if (error) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Category not found</h1>
            <p className="text-gray-600 mb-6">The category you're looking for doesn't exist.</p>
            <Link to="/services">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Services
              </Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <Skeleton className="h-8 w-64 mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-80 rounded-lg" />
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  const categoryTitle = categorySlug?.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ') || 'Services';

  return (
    <Layout>
      <Helmet>
        <title>{categoryTitle} | {siteConfig.name}</title>
        <meta name="description" content={`Professional ${categoryTitle.toLowerCase()} services. Expert technicians providing reliable solutions.`} />
      </Helmet>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-onassist-primary to-blue-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">{categoryTitle}</h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Professional {categoryTitle.toLowerCase()} services by certified technicians
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-onassist-primary hover:bg-gray-100 text-lg px-8 py-6"
                onClick={() => window.open(`tel:${siteConfig.contactPhone}`, '_self')}
              >
                <Phone className="w-5 h-5 mr-2" />
                Call Now
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-onassist-primary text-lg px-8 py-6"
                onClick={() => window.open('/contact', '_self')}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Get Quote
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="mb-8">
          <Link to="/services">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to All Services
            </Button>
          </Link>
          
          <h2 className="text-3xl font-bold mb-4">Available Services</h2>
          <p className="text-gray-600">Choose from our range of professional {categoryTitle.toLowerCase()} services</p>
        </div>

        {services && services.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold mb-4">No services found</h3>
            <p className="text-gray-600 mb-8">There are currently no services in this category.</p>
            <Link to="/services">
              <Button>Browse All Services</Button>
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CategoryPage;
