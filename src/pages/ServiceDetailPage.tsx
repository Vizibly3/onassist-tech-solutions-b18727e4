
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useCart } from '@/contexts/CartContext';
import { useServices } from '@/hooks/useServices';
import { Helmet } from 'react-helmet-async';
import { siteConfig } from '@/config/site';
import { Clock, Star, Shield, CheckCircle, ArrowLeft } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const ServiceDetailPage = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { data: services, isLoading, error } = useServices();

  const service = services?.find(s => s.id === serviceId);

  const handleAddToCart = () => {
    if (service) {
      addToCart(service);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
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

  return (
    <Layout>
      <Helmet>
        <title>{service.title} | {siteConfig.name}</title>
        <meta name="description" content={service.description} />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-onassist-primary to-onassist-dark text-white py-12">
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
                  <h1 className="text-4xl md:text-5xl font-bold">{service.title}</h1>
                  {service.popular && (
                    <Badge className="bg-onassist-accent text-white border-0">
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
                  className="w-full h-80 object-cover rounded-xl shadow-2xl"
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
              <Card className="shadow-lg border-0">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-6">Service Overview</h2>
                  <div className="prose prose-lg max-w-none">
                    <p className="text-gray-700 leading-relaxed mb-6">
                      {service.description}
                    </p>
                    
                    <h3 className="text-xl font-semibold mb-4">What's Included:</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                        <span>Professional installation</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                        <span>Complete setup and configuration</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                        <span>Testing and optimization</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                        <span>Basic training and support</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-semibold mb-4">Why Choose Our Service:</h3>
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center">
                          <Shield className="w-8 h-8 text-onassist-primary mx-auto mb-2" />
                          <h4 className="font-semibold mb-1">Certified Experts</h4>
                          <p className="text-sm text-gray-600">Our technicians are fully certified and experienced</p>
                        </div>
                        <div className="text-center">
                          <Clock className="w-8 h-8 text-onassist-primary mx-auto mb-2" />
                          <h4 className="font-semibold mb-1">Quick Service</h4>
                          <p className="text-sm text-gray-600">Fast and efficient service completion</p>
                        </div>
                        <div className="text-center">
                          <Star className="w-8 h-8 text-onassist-primary mx-auto mb-2" />
                          <h4 className="font-semibold mb-1">Quality Guarantee</h4>
                          <p className="text-sm text-gray-600">100% satisfaction guarantee on all services</p>
                        </div>
                      </div>
                    </div>
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
