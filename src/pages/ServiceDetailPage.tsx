
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useCart } from '@/contexts/CartContext';
import { useServiceBySlug } from '@/hooks/useServices';
import { Helmet } from 'react-helmet-async';
import { siteConfig } from '@/config/site';
import { Clock, Star, Shield, CheckCircle, ArrowLeft, Wrench, Monitor, Home, Smartphone } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const ServiceDetailPage = () => {
  const { serviceSlug } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { data: service, isLoading, error } = useServiceBySlug(serviceSlug || '');

  const handleAddToCart = () => {
    if (service) {
      addToCart(service);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  // Dynamic service type detection based on title keywords
  const getServiceType = (title: string) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('home') || lowerTitle.includes('smart') || lowerTitle.includes('automation')) {
      return 'home';
    } else if (lowerTitle.includes('computer') || lowerTitle.includes('laptop') || lowerTitle.includes('pc')) {
      return 'computer';
    } else if (lowerTitle.includes('phone') || lowerTitle.includes('mobile') || lowerTitle.includes('iphone')) {
      return 'mobile';
    } else if (lowerTitle.includes('audio') || lowerTitle.includes('video') || lowerTitle.includes('tv')) {
      return 'av';
    }
    return 'general';
  };

  const getServiceIcon = (type: string) => {
    switch (type) {
      case 'home': return Home;
      case 'computer': return Monitor;
      case 'mobile': return Smartphone;
      case 'av': return Monitor;
      default: return Wrench;
    }
  };

  const getServiceFeatures = (type: string) => {
    switch (type) {
      case 'home':
        return [
          'Professional installation and setup',
          'Device integration and connectivity',
          'Security configuration',
          'User training and documentation',
          'Remote monitoring setup',
          '30-day support included'
        ];
      case 'computer':
        return [
          'Hardware diagnosis and repair',
          'Software installation and updates',
          'Performance optimization',
          'Data backup and recovery',
          'Virus removal and protection',
          '90-day warranty on repairs'
        ];
      case 'mobile':
        return [
          'Screen repair and replacement',
          'Software troubleshooting',
          'Data transfer and backup',
          'App setup and configuration',
          'Privacy and security setup',
          'Quick turnaround time'
        ];
      case 'av':
        return [
          'Professional installation',
          'Calibration and optimization',
          'Cable management',
          'Remote setup and programming',
          'User training included',
          'Extended warranty options'
        ];
      default:
        return [
          'Professional consultation',
          'Complete setup and configuration',
          'Testing and optimization',
          'Basic training and support',
          'Quality guarantee',
          'Follow-up support'
        ];
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-8 w-32 mb-6" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Skeleton className="h-96 rounded-xl" />
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !service) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Service not found</h1>
            <p className="text-gray-600 mb-6">The service you're looking for doesn't exist.</p>
            <Button onClick={handleGoBack} variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const serviceType = getServiceType(service.title);
  const ServiceIcon = getServiceIcon(serviceType);
  const features = getServiceFeatures(serviceType);

  return (
    <Layout>
      <Helmet>
        <title>{service.title} | {siteConfig.name}</title>
        <meta name="description" content={service.description} />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Hero Section - Dynamic gradient based on service type */}
        <div className={`py-12 ${
          serviceType === 'home' ? 'bg-gradient-to-r from-green-600 to-emerald-700' :
          serviceType === 'computer' ? 'bg-gradient-to-r from-blue-600 to-indigo-700' :
          serviceType === 'mobile' ? 'bg-gradient-to-r from-purple-600 to-pink-700' :
          serviceType === 'av' ? 'bg-gradient-to-r from-red-600 to-orange-700' :
          'bg-gradient-to-r from-onassist-primary to-onassist-dark'
        } text-white`}>
          <div className="container mx-auto px-4">
            <Button
              onClick={handleGoBack}
              variant="ghost"
              className="text-white hover:bg-white/10 mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Services
            </Button>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <ServiceIcon className="w-8 h-8" />
                  <h1 className="text-4xl md:text-5xl font-bold">{service.title}</h1>
                  {service.popular && (
                    <Badge className="bg-yellow-500 text-yellow-900 border-0">
                      <Star className="w-3 h-3 mr-1 fill-current" />
                      Popular
                    </Badge>
                  )}
                </div>
                <p className="text-xl opacity-90 mb-6">{service.description}</p>
                
                <div className="flex items-center gap-6 text-lg">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    <span>{service.duration}</span>
                  </div>
                  <div className="text-3xl font-bold">
                    ${service.price}
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <img 
                  src={service.image_url} 
                  alt={service.title}
                  className="w-full h-80 object-cover rounded-xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Service Details */}
            <div className="lg:col-span-2 space-y-8">
              <Card className="shadow-lg border-0 overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <ServiceIcon className="w-6 h-6 text-onassist-primary" />
                    <h2 className="text-2xl font-bold">Service Overview</h2>
                  </div>
                  
                  <div className="prose prose-lg max-w-none">
                    <p className="text-gray-700 leading-relaxed mb-6">
                      {service.description}
                    </p>
                    
                    <h3 className="text-xl font-semibold mb-4">What's Included:</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      {features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Dynamic content based on service type */}
                    {serviceType === 'home' && (
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg">
                        <h3 className="text-xl font-semibold mb-4 text-green-800">Smart Home Expertise</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="text-center">
                            <Home className="w-8 h-8 text-green-600 mx-auto mb-2" />
                            <h4 className="font-semibold mb-1">Home Integration</h4>
                            <p className="text-sm text-gray-600">Seamless device connectivity</p>
                          </div>
                          <div className="text-center">
                            <Shield className="w-8 h-8 text-green-600 mx-auto mb-2" />
                            <h4 className="font-semibold mb-1">Security Setup</h4>
                            <p className="text-sm text-gray-600">Advanced security configuration</p>
                          </div>
                          <div className="text-center">
                            <Clock className="w-8 h-8 text-green-600 mx-auto mb-2" />
                            <h4 className="font-semibold mb-1">24/7 Monitoring</h4>
                            <p className="text-sm text-gray-600">Continuous system monitoring</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {serviceType === 'computer' && (
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-800">Computer Repair Specialists</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="text-center">
                            <Monitor className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                            <h4 className="font-semibold mb-1">Hardware Experts</h4>
                            <p className="text-sm text-gray-600">Certified repair technicians</p>
                          </div>
                          <div className="text-center">
                            <Shield className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                            <h4 className="font-semibold mb-1">Data Security</h4>
                            <p className="text-sm text-gray-600">Safe data handling and recovery</p>
                          </div>
                          <div className="text-center">
                            <Star className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                            <h4 className="font-semibold mb-1">Quality Guarantee</h4>
                            <p className="text-sm text-gray-600">90-day warranty on all repairs</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {(serviceType === 'general' || serviceType === 'av' || serviceType === 'mobile') && (
                      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
                        <h3 className="text-xl font-semibold mb-4 text-purple-800">Professional Service</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="text-center">
                            <Wrench className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                            <h4 className="font-semibold mb-1">Expert Technicians</h4>
                            <p className="text-sm text-gray-600">Certified and experienced</p>
                          </div>
                          <div className="text-center">
                            <Clock className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                            <h4 className="font-semibold mb-1">Quick Service</h4>
                            <p className="text-sm text-gray-600">Fast and efficient completion</p>
                          </div>
                          <div className="text-center">
                            <Star className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                            <h4 className="font-semibold mb-1">Quality Guarantee</h4>
                            <p className="text-sm text-gray-600">100% satisfaction guaranteed</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Booking Sidebar */}
            <div className="space-y-6">
              <Card className="shadow-lg border-0 sticky top-24">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-onassist-primary mb-2">
                      ${service.price}
                    </div>
                    <div className="flex items-center justify-center gap-2 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{service.duration}</span>
                    </div>
                  </div>
                  
                  <Separator className="my-6" />
                  
                  <Button 
                    onClick={handleAddToCart}
                    className="w-full bg-onassist-primary hover:bg-onassist-dark text-lg py-6 mb-4"
                    size="lg"
                  >
                    Book This Service
                  </Button>
                  
                  <div className="text-center space-y-2">
                    <p className="text-sm text-gray-600">
                      <Shield className="w-4 h-4 inline mr-1" />
                      Secure booking & payment
                    </p>
                    <p className="text-sm text-gray-600">
                      Free consultation included
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Additional Info */}
              <Card className="shadow-lg border-0">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Need Help?</h3>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      Contact Support
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Schedule Consultation
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      View FAQ
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ServiceDetailPage;
