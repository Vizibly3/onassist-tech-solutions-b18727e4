
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import ServiceCard from '@/components/services/ServiceCard';
import { Button } from '@/components/ui/button';
import { Helmet } from 'react-helmet-async';
import { siteConfig } from '@/config/site';
import { useServicesByCategory, useCategoryBySlug } from '@/hooks/useServices';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, Phone, MessageCircle, CheckCircle, Star, Award, Users, Zap, Shield } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const CategoryPage = () => {
  const { categorySlug } = useParams();
  const { data: services, isLoading, error } = useServicesByCategory(categorySlug || '');
  const { data: category } = useCategoryBySlug(categorySlug || '');

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

      {/* Enhanced Hero Section */}
      <div className="relative bg-gradient-to-br from-onassist-primary via-blue-600 to-purple-700 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            {category?.image_url && (
              <div className="mb-8">
                <img 
                  src={category.image_url} 
                  alt={categoryTitle}
                  className="w-32 h-32 mx-auto rounded-full object-cover border-4 border-white/30 shadow-2xl"
                />
              </div>
            )}
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              {categoryTitle}
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto leading-relaxed">
              {category?.description || `Professional ${categoryTitle.toLowerCase()} services by certified technicians with years of experience`}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                size="lg" 
                className="bg-white text-onassist-primary hover:bg-gray-100 text-lg px-8 py-6 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1"
                onClick={() => window.open(`tel:${siteConfig.contactPhone}`, '_self')}
              >
                <Phone className="w-5 h-5 mr-2" />
                Call Now - Get Instant Help
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white text-white hover:bg-white hover:text-onassist-primary text-lg px-8 py-6 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1"
                onClick={() => window.open('/contact', '_self')}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Get Free Quote
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { icon: Users, label: "50+ Experts", value: "Certified" },
                { icon: Star, label: "4.9/5 Rating", value: "Customer Satisfaction" },
                { icon: Award, label: "Licensed", value: "Insured & Bonded" },
                { icon: Zap, label: "Same Day", value: "Service Available" }
              ].map((item, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <item.icon className="w-8 h-8 mx-auto mb-2 text-white" />
                  <div className="text-sm font-semibold">{item.label}</div>
                  <div className="text-xs opacity-80">{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Our Category Services */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-4xl font-bold mb-6">Why Choose Our {categoryTitle} Services?</h2>
            <p className="text-xl text-gray-600">We're the trusted choice for thousands of customers across the nation</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Guaranteed Work",
                description: "All our services come with a 30-day guarantee and full insurance coverage"
              },
              {
                icon: Users,
                title: "Expert Technicians",
                description: "Certified professionals with extensive training and years of experience"
              },
              {
                icon: Zap,
                title: "Fast & Reliable",
                description: "Same-day service available with transparent pricing and no hidden fees"
              }
            ].map((benefit, index) => (
              <Card key={index} className="text-center hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="bg-gradient-to-br from-onassist-primary to-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <benefit.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="mb-8">
          <Link to="/services">
            <Button variant="ghost" className="mb-6 hover:bg-gray-100">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to All Services
            </Button>
          </Link>
          
          <h2 className="text-4xl font-bold mb-4">Available {categoryTitle} Services</h2>
          <p className="text-xl text-gray-600">Choose from our comprehensive range of professional services</p>
        </div>

        {services && services.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {services.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>

            {/* Service Features */}
            <div className="bg-gradient-to-r from-onassist-primary to-blue-600 rounded-3xl p-12 text-white text-center">
              <h3 className="text-3xl font-bold mb-6">What's Included in Every Service</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  "Professional Diagnosis",
                  "Expert Installation", 
                  "Quality Testing",
                  "30-Day Guarantee"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 bg-white/10 rounded-xl p-4">
                    <CheckCircle className="w-6 h-6 text-green-300 flex-shrink-0" />
                    <span className="font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-2xl font-semibold mb-4">No services found</h3>
            <p className="text-gray-600 mb-8 text-lg">There are currently no services in this category.</p>
            <Link to="/services">
              <Button size="lg">Browse All Services</Button>
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CategoryPage;
