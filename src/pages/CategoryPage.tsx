
import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import ServiceCard from '@/components/services/ServiceCard';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Helmet } from 'react-helmet-async';
import { siteConfig } from '@/config/site';
import { useServicesByCategory, useCategoryBySlug } from '@/hooks/useServices';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, Star, Users, Award, CheckCircle, Zap, Shield, Phone, Clock, Globe, Target, Home, Monitor, Smartphone, Wifi, Wrench } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const CategoryPage = () => {
  const { categorySlug } = useParams();
  const navigate = useNavigate();
  const { data: category } = useCategoryBySlug(categorySlug || '');
  const { data: services, isLoading, error } = useServicesByCategory(categorySlug || '');

  const handleGoBack = () => {
    navigate('/services');
  };

  const getServiceIcon = (categoryTitle: string) => {
    const title = categoryTitle.toLowerCase();
    if (title.includes('home') || title.includes('smart')) return Home;
    if (title.includes('computer') || title.includes('laptop')) return Monitor;
    if (title.includes('phone') || title.includes('mobile')) return Smartphone;
    if (title.includes('network') || title.includes('wifi')) return Wifi;
    return Wrench;
  };

  const getCategoryFeatures = (categoryTitle: string) => {
    const title = categoryTitle.toLowerCase();
    if (title.includes('home') || title.includes('smart')) {
      return [
        'Smart Home Integration',
        'Voice Assistant Setup',
        'Security System Installation',
        'Remote Monitoring',
        'Energy Management'
      ];
    } else if (title.includes('computer') || title.includes('laptop')) {
      return [
        'Hardware Diagnosis & Repair',
        'Software Installation',
        'Performance Optimization',
        'Data Recovery',
        'Virus Removal'
      ];
    } else if (title.includes('phone') || title.includes('mobile')) {
      return [
        'Screen Repair & Replacement',
        'Software Troubleshooting',
        'Data Transfer',
        'App Configuration',
        'Privacy Settings'
      ];
    } else if (title.includes('network') || title.includes('wifi')) {
      return [
        'Network Setup & Configuration',
        'WiFi Optimization',
        'Security Implementation',
        'Performance Monitoring',
        'Troubleshooting'
      ];
    }
    return [
      'Professional Consultation',
      'Expert Installation',
      'Configuration & Setup',
      'Testing & Optimization',
      'Ongoing Support'
    ];
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

  const CategoryIcon = getServiceIcon(category.title);
  const features = getCategoryFeatures(category.title);

  return (
    <Layout>
      <Helmet>
        <title>{category.title} Services | {siteConfig.name}</title>
        <meta name="description" content={category.description} />
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
                  <Link to="/services" className="text-gray-600 hover:text-onassist-primary transition-colors">
                    Services
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
      <div className="relative bg-gradient-to-br from-onassist-primary via-blue-600 to-purple-700 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: "url('data:image/svg+xml;utf8,<svg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"><g fill=\"%23ffffff\" fill-opacity=\"0.2\"><circle cx=\"30\" cy=\"30\" r=\"8\"/><circle cx=\"10\" cy=\"10\" r=\"4\"/><circle cx=\"50\" cy=\"50\" r=\"6\"/></g></svg>')"
          }}></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-white/5 rounded-full animate-pulse delay-1000"></div>
        
        <div className="relative container mx-auto px-4 py-20">
          <Button
            onClick={handleGoBack}
            variant="ghost"
            className="text-white hover:bg-white/20 mb-8 backdrop-blur-sm rounded-full px-6 py-3"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to All Services
          </Button>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
                <CategoryIcon className="w-6 h-6" />
                <span className="font-medium text-lg">Expert Services</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">{category.title}</h1>
              <p className="text-2xl opacity-90 mb-8 leading-relaxed">{category.description}</p>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <div className="text-3xl font-bold mb-2">
                    {isLoading ? (
                      <Skeleton className="h-8 w-16" />
                    ) : (
                      `${services?.length || 0}+`
                    )}
                  </div>
                  <div className="text-lg opacity-80">Services Available</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <div className="text-3xl font-bold mb-2">24/7</div>
                  <div className="text-lg opacity-80">Expert Support</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  className="bg-white text-onassist-primary hover:bg-gray-100 font-bold px-8 py-4 rounded-full shadow-xl"
                  onClick={() => window.open(`tel:${siteConfig.contactPhone}`, '_self')}
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-onassist-primary font-bold px-8 py-4 rounded-full backdrop-blur-sm">
                  <Globe className="w-5 h-5 mr-2" />
                  Get Quote
                </Button>
              </div>
            </div>
            
            {category.image_url && (
              <div className="relative">
                <div className="absolute inset-0 bg-white/20 rounded-3xl transform rotate-6"></div>
                <img 
                  src={category.image_url} 
                  alt={category.title}
                  className="relative w-full h-96 object-cover rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 rounded-full px-6 py-2 mb-4">
              <Target className="w-5 h-5" />
              <span className="font-medium">What We Offer</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {category.title} <span className="text-onassist-primary">Expertise</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive solutions with professional service and guaranteed satisfaction
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <Card key={index} className="shadow-xl hover:shadow-2xl transition-all duration-300 border-0 bg-white hover:-translate-y-2">
                <CardContent className="p-8 text-center">
                  <div className="bg-gradient-to-br from-onassist-primary to-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-xl mb-4">{feature}</h3>
                  <p className="text-gray-600">Professional service with guaranteed results</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Stats Section */}
          <div className="bg-gradient-to-r from-onassist-primary to-blue-600 rounded-3xl p-12 text-white text-center">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="text-4xl font-bold mb-2">5000+</div>
                <div className="text-lg opacity-90">Satisfied Customers</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">99.9%</div>
                <div className="text-lg opacity-90">Success Rate</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">24/7</div>
                <div className="text-lg opacity-90">Support Available</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">Same Day</div>
                <div className="text-lg opacity-90">Service Available</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 rounded-full px-6 py-2 mb-4">
              <Zap className="w-5 h-5" />
              <span className="font-medium">Available Services</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Our <span className="text-onassist-primary">{category.title}</span> Services
            </h2>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-96 rounded-xl" />
              ))}
            </div>
          ) : services && services.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <div key={service.id} className="transform hover:scale-105 transition-transform duration-300">
                  <ServiceCard service={service} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                <CategoryIcon className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">No services available</h3>
              <p className="text-gray-600 mb-6">
                We're working on adding services to this category. Please check back soon!
              </p>
              <Button onClick={handleGoBack} variant="outline" className="rounded-full px-8 py-3">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to All Services
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-onassist-dark to-blue-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: "url('data:image/svg+xml;utf8,<svg width=\"40\" height=\"40\" viewBox=\"0 0 40 40\" xmlns=\"http://www.w3.org/2000/svg\"><g fill=\"%23ffffff\" fill-opacity=\"0.3\"><path d=\"M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z\"/></g></svg>')"
          }}></div>
        </div>
        
        <div className="relative container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready for Expert <span className="text-yellow-300">{category.title}</span> Service?
            </h2>
            <p className="text-xl md:text-2xl opacity-90 mb-10 leading-relaxed">
              Get professional {category.title.toLowerCase()} support from certified technicians. 
              Same-day service available with 100% satisfaction guarantee.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-onassist-primary hover:bg-gray-100 font-bold px-10 py-5 rounded-full shadow-2xl text-lg"
                onClick={() => window.open(`tel:${siteConfig.contactPhone}`, '_self')}
              >
                <Phone className="w-6 h-6 mr-3" />
                Call Now: {siteConfig.contactPhone}
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-onassist-primary font-bold px-10 py-5 rounded-full backdrop-blur-sm text-lg">
                <Clock className="w-6 h-6 mr-3" />
                Schedule Service
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CategoryPage;
