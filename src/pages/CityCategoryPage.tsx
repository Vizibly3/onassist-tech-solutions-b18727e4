
import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import ServiceCard from '@/components/services/ServiceCard';
import { Button } from "@/components/ui/button";
import { Helmet } from 'react-helmet-async';
import { siteConfig } from '@/config/site';
import { useServicesByCategory, useCategoryBySlug } from '@/hooks/useServices';
import { getLocationBreadcrumb } from '@/data/locations';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, Home, Building, MapPin } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const CityCategoryPage = () => {
  const { country, state, city, categorySlug } = useParams();
  const navigate = useNavigate();
  const { data: category } = useCategoryBySlug(categorySlug || '');
  const { data: services, isLoading, error } = useServicesByCategory(categorySlug || '');

  // Get location data
  const locationData = getLocationBreadcrumb(country || '', state || '', city || '');

  const handleGoBack = () => {
    navigate(`/${country}/${state}/${city}`);
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
              Back to {city}
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  if (!category || !locationData.city || !locationData.state || !locationData.country) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Category not found</h1>
            <p className="text-gray-600 mb-6">The category you're looking for doesn't exist.</p>
            <Button onClick={handleGoBack} variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to {city}
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const cityData = locationData.city;
  const stateData = locationData.state;
  const countryData = locationData.country;

  return (
    <Layout>
      <Helmet>
        <title>{category.title} Services in {cityData.name}, {stateData.abbreviation} | {siteConfig.name}</title>
        <meta name="description" content={`${category.description} Available in ${cityData.name}, ${stateData.name}.`} />
      </Helmet>

      {/* Breadcrumb */}
      <div className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/" className="flex items-center gap-2 text-gray-600 hover:text-onassist-primary transition-colors">
                    <Home className="w-4 h-4" />
                    Home
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to={`/${country}`} className="text-gray-600 hover:text-onassist-primary transition-colors">
                    {countryData.name}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to={`/${country}/${state}`} className="text-gray-600 hover:text-onassist-primary transition-colors">
                    {stateData.name}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to={`/${country}/${state}/${city}`} className="text-gray-600 hover:text-onassist-primary transition-colors">
                    {cityData.name}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="font-medium text-onassist-primary">
                  {category.title}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-onassist-primary to-onassist-dark text-white py-16">
        <div className="container mx-auto px-4">
          <Button
            onClick={handleGoBack}
            variant="ghost"
            className="text-white hover:bg-white/10 mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to {cityData.name}
          </Button>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mb-4">
                <MapPin className="w-5 h-5" />
                <span className="font-medium">{cityData.name}, {stateData.abbreviation}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {category.title} in {cityData.name}
              </h1>
              <p className="text-xl opacity-90 mb-6">
                {category.description} Available in {cityData.name}, {stateData.name}.
              </p>
              <div className="text-lg">
                {isLoading ? (
                  <Skeleton className="h-6 w-32" />
                ) : (
                  <span>{services?.length || 0} services available in {cityData.name}</span>
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
                <div key={service.id}>
                  <ServiceCard 
                    service={service} 
                    linkPath={`/${country}/${state}/${city}/service/${service.slug}`}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-2xl font-semibold mb-4">No services available</h3>
              <p className="text-gray-600 mb-6">
                We're working on adding {category.title} services to {cityData.name}. Please check back soon!
              </p>
              <Button onClick={handleGoBack} variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to {cityData.name}
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CityCategoryPage;
