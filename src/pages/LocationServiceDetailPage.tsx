
import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from '@/contexts/CartContext';
import { useServiceBySlug } from '@/hooks/useServices';
import { Helmet } from 'react-helmet-async';
import { siteConfig } from '@/config/site';
import { Clock, Star, Shield, CheckCircle, ArrowLeft, Wrench, Monitor, Home, Smartphone, Wifi, Zap, Users, Award, Phone, MapPin, Navigation, Building } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { usStates } from '@/data/locations';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const LocationServiceDetailPage = () => {
  const { country, state, city, serviceSlug } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { data: service, isLoading, error } = useServiceBySlug(serviceSlug || '');
  const [zipCode, setZipCode] = useState('');

  console.log('LocationServiceDetailPage params:', { country, state, city, serviceSlug });

  // Get location data
  const stateData = usStates.find(s => s.slug === state);
  const cityData = stateData?.cities.find(c => c.slug === city);

  console.log('Location data:', { stateData, cityData });

  const handleAddToCart = () => {
    if (service && zipCode.trim()) {
      addToCart(service);
    }
  };

  const handleGoBack = () => {
    navigate(`/${country}/${state}/${city}`);
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

  if (error || !service || !cityData || !stateData) {
    console.error('Service or location not found:', { service, cityData, stateData, error });
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Service not found</h1>
            <p className="text-gray-600 mb-6">The service or location you're looking for doesn't exist.</p>
            <p className="text-sm text-gray-500 mb-6">
              Looking for: {country}/{state}/{city}/{serviceSlug}
            </p>
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
        <title>Best {service.title} in {cityData.name}, {stateData.abbreviation} | {siteConfig.name}</title>
        <meta name="description" content={`Professional ${service.title} services in ${cityData.name}, ${stateData.name}. Expert local technicians providing ${service.title} with same-day service and guaranteed satisfaction.`} />
        <meta name="keywords" content={`${service.title}, ${cityData.name}, ${stateData.abbreviation}, tech support`} />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
        {/* Breadcrumb */}
        <div className="bg-gray-50 border-b">
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
                      United States
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
                    {service.title}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>

        {/* Hero Section */}
        <div className="py-16 bg-gradient-to-r from-onassist-primary via-blue-600 to-purple-700 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}></div>
          </div>
          
          <div className="container mx-auto px-4 relative">
            <Button
              onClick={handleGoBack}
              variant="ghost"
              className="text-white hover:bg-white/20 mb-8 backdrop-blur-sm"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to {cityData.name}
            </Button>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Monitor className="w-8 h-8" />
                  <h1 className="text-4xl md:text-5xl font-bold">
                    {service.title} in {cityData.name}
                  </h1>
                  {service.popular && (
                    <Badge className="bg-yellow-500 text-yellow-900 border-0">
                      <Star className="w-3 h-3 mr-1 fill-current" />
                      Popular
                    </Badge>
                  )}
                </div>
                <p className="text-xl opacity-90 mb-6">
                  Professional {service.title} services in {cityData.name}, {stateData.name}. Expert local technicians providing same-day service.
                </p>
                
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
              <Card className="shadow-xl border-0 overflow-hidden bg-white">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
                      <Monitor className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold">Service Overview in {cityData.name}</h2>
                  </div>
                  
                  <div className="prose prose-lg max-w-none">
                    <p className="text-gray-700 leading-relaxed mb-6">
                      {service.description}
                    </p>
                    
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200 mb-6">
                      <h3 className="text-xl font-semibold mb-4 text-blue-800 flex items-center gap-2">
                        <Building className="w-6 h-6" />
                        Local Service in {cityData.name}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center">
                          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                            <MapPin className="w-8 h-8 text-blue-600" />
                          </div>
                          <h4 className="font-semibold mb-2">Local Experts</h4>
                          <p className="text-sm text-gray-600">Technicians in {cityData.name}</p>
                        </div>
                        <div className="text-center">
                          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                            <Zap className="w-8 h-8 text-blue-600" />
                          </div>
                          <h4 className="font-semibold mb-2">Same Day Service</h4>
                          <p className="text-sm text-gray-600">Available in {cityData.name}</p>
                        </div>
                        <div className="text-center">
                          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                            <Users className="w-8 h-8 text-blue-600" />
                          </div>
                          <h4 className="font-semibold mb-2">Trusted Service</h4>
                          <p className="text-sm text-gray-600">5-star rated in {stateData.abbreviation}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Booking Sidebar */}
            <div className="space-y-6">
              <Card className="shadow-xl border-0 sticky top-24 bg-white">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold text-onassist-primary mb-2">
                      ${service.price}
                    </div>
                    <div className="flex items-center justify-center gap-2 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{service.duration}</span>
                    </div>
                  </div>
                  
                  <Separator className="my-6" />
                  
                  {/* Local Service Info */}
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <MapPin className="w-4 h-4 text-onassist-primary" />
                      <span>Service Location</span>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <div className="font-semibold">{cityData.name}, {stateData.abbreviation}</div>
                      <div className="text-sm text-gray-600">Local technician will come to you</div>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={handleAddToCart}
                    className="w-full bg-gradient-to-r from-onassist-primary to-onassist-dark hover:from-onassist-dark hover:to-onassist-primary text-lg py-6 mb-4 shadow-lg"
                    size="lg"
                  >
                    Book Service in {cityData.name}
                  </Button>
                  
                  <div className="text-center space-y-3">
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                      <Shield className="w-4 h-4 text-green-500" />
                      <span>Local {cityData.name} service</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Same-day availability</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                      <Award className="w-4 h-4 text-green-500" />
                      <span>Satisfaction guaranteed</span>
                    </div>
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

export default LocationServiceDetailPage;
