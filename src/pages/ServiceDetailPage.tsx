
import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import NeedHelpBox from '@/components/services/NeedHelpBox';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Helmet } from 'react-helmet-async';
import { siteConfig } from '@/config/site';
import { useServiceBySlug, useCategoryBySlug } from '@/hooks/useServices';
import { useCart } from '@/contexts/CartContext';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, Clock, Star, CheckCircle, Phone, Globe, Home, ShoppingCart, Users, Award, Zap, Shield } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useToast } from '@/hooks/use-toast';

const ServiceDetailPage = () => {
  const { serviceSlug } = useParams();
  const navigate = useNavigate();
  const { data: service, isLoading, error } = useServiceBySlug(serviceSlug || '');
  const { addToCart } = useCart();
  const { toast } = useToast();

  // Get category data for breadcrumb
  const { data: category } = useCategoryBySlug(
    service ? service.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') : ''
  );

  const handleGoBack = () => {
    navigate('/services');
  };

  const handleAddToCart = () => {
    if (service) {
      addToCart(service);
      toast({
        title: "Added to cart",
        description: `${service.title} has been added to your cart.`,
      });
    }
  };

  if (error) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Service not found</h1>
            <p className="text-gray-600 mb-6">The service you're looking for doesn't exist.</p>
            <Button onClick={handleGoBack} variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Services
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  if (isLoading || !service) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <Skeleton className="h-8 w-96 mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Skeleton className="h-96 w-full mb-8" />
              <Skeleton className="h-32 w-full" />
            </div>
            <div>
              <Skeleton className="h-64 w-full" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Helmet>
        <title>{service.title} | {siteConfig.name}</title>
        <meta name="description" content={service.description} />
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
                  {service.title}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Button
          onClick={handleGoBack}
          variant="ghost"
          className="mb-6 hover:bg-gray-100"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Services
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Service Header */}
            <div className="relative">
              <img
                src={service.image_url}
                alt={service.title}
                className="w-full h-96 object-cover rounded-2xl shadow-lg"
              />
              {service.popular && (
                <Badge className="absolute top-4 right-4 bg-yellow-500 text-yellow-900 border-0 px-4 py-2 text-base">
                  <Star className="w-4 h-4 mr-1 fill-current" />
                  Popular Service
                </Badge>
              )}
            </div>

            {/* Service Info */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">{service.title}</h1>
              <p className="text-xl text-gray-600 leading-relaxed mb-6">{service.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
                  <div className="text-3xl font-bold text-blue-600 mb-2">${service.price}</div>
                  <div className="text-blue-700 font-medium">Starting Price</div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl">
                  <div className="flex items-center gap-2 text-green-600 mb-2">
                    <Clock className="w-6 h-6" />
                    <span className="text-2xl font-bold">{service.duration}</span>
                  </div>
                  <div className="text-green-700 font-medium">Service Duration</div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl">
                  <div className="flex items-center gap-2 text-purple-600 mb-2">
                    <Award className="w-6 h-6" />
                    <span className="text-2xl font-bold">Expert</span>
                  </div>
                  <div className="text-purple-700 font-medium">Certified Tech</div>
                </div>
              </div>
            </div>

            {/* Service Features */}
            <Card className="shadow-xl border-0">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-6">What's Included</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    'Expert diagnosis and troubleshooting',
                    'Professional installation and setup',
                    'Configuration and optimization',
                    'Quality testing and verification',
                    '30-day service guarantee',
                    'Follow-up support included'
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Why Choose Us */}
            <Card className="shadow-xl border-0 bg-gradient-to-br from-onassist-primary to-blue-600 text-white">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-6">Why Choose Our Service?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-white/20 p-3 rounded-xl">
                      <Users className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Expert Technicians</h3>
                      <p className="text-white/90 text-sm">Certified professionals with years of experience</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-white/20 p-3 rounded-xl">
                      <Zap className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Fast Service</h3>
                      <p className="text-white/90 text-sm">Same-day service available for urgent needs</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-white/20 p-3 rounded-xl">
                      <Shield className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Guaranteed Work</h3>
                      <p className="text-white/90 text-sm">100% satisfaction guarantee on all services</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-white/20 p-3 rounded-xl">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">24/7 Support</h3>
                      <p className="text-white/90 text-sm">Round-the-clock customer support available</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <NeedHelpBox serviceTitle={service.title} />
            
            {/* Booking Card */}
            <Card className="shadow-xl border-0">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-4">Book This Service</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Service Price:</span>
                    <span className="text-2xl font-bold text-onassist-primary">${service.price}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium">{service.duration}</span>
                  </div>
                  
                  <div className="pt-4 space-y-3">
                    <Button 
                      onClick={handleAddToCart}
                      className="w-full bg-onassist-primary hover:bg-onassist-dark text-white font-semibold py-3"
                    >
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      Add to Cart
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full border-onassist-primary text-onassist-primary hover:bg-onassist-primary hover:text-white font-semibold py-3"
                      onClick={() => window.open(`tel:${siteConfig.contactPhone}`, '_self')}
                    >
                      <Phone className="w-5 h-5 mr-2" />
                      Call to Book
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ServiceDetailPage;
