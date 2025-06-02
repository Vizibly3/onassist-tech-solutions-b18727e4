
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
import { getLocationBreadcrumb } from '@/data/locations';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const StateServiceDetailPage = () => {
  const { country, state, serviceSlug } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { data: service, isLoading, error } = useServiceBySlug(serviceSlug || '');
  const [zipCode, setZipCode] = useState('');

  // Get location data
  const locationData = getLocationBreadcrumb(country || '', state || '', '');

  const handleAddToCart = () => {
    if (service && zipCode.trim()) {
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
    } else if (lowerTitle.includes('network') || lowerTitle.includes('wifi') || lowerTitle.includes('internet')) {
      return 'network';
    }
    return 'general';
  };

  const getServiceIcon = (type: string) => {
    switch (type) {
      case 'home': return Home;
      case 'computer': return Monitor;
      case 'mobile': return Smartphone;
      case 'av': return Monitor;
      case 'network': return Wifi;
      default: return Wrench;
    }
  };

  const getServiceFeatures = (type: string) => {
    switch (type) {
      case 'home':
        return [
          'Professional smart home consultation',
          'Device integration and connectivity',
          'Advanced security configuration',
          'Comprehensive user training',
          'Remote monitoring setup',
          '30-day premium support included'
        ];
      case 'computer':
        return [
          'Advanced hardware diagnosis',
          'Software installation and optimization',
          'Performance tuning and upgrades',
          'Data backup and recovery solutions',
          'Virus removal and security setup',
          '90-day warranty on all repairs'
        ];
      case 'mobile':
        return [
          'Expert screen repair and replacement',
          'Software troubleshooting and updates',
          'Data transfer and cloud backup',
          'App setup and optimization',
          'Privacy and security configuration',
          'Same-day service available'
        ];
      case 'av':
        return [
          'Professional AV installation',
          'High-end calibration and tuning',
          'Custom cable management',
          'Remote control programming',
          'Complete user training',
          'Extended warranty options'
        ];
      case 'network':
        return [
          'Network design and setup',
          'WiFi optimization and coverage',
          'Security configuration',
          'Performance monitoring',
          'Troubleshooting and maintenance',
          'Business-grade solutions'
        ];
      default:
        return [
          'Professional consultation',
          'Complete setup and configuration',
          'Testing and optimization',
          'Training and support',
          'Quality guarantee',
          'Follow-up support'
        ];
    }
  };

  const getLayoutVariant = (type: string, title: string) => {
    const titleHash = title.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
    const variants = ['modern', 'classic', 'premium', 'minimal'];
    return variants[titleHash % variants.length];
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

  if (error || !service || !locationData.state || !locationData.country) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Service not found</h1>
            <p className="text-gray-600 mb-6">The service or location you're looking for doesn't exist.</p>
            <Button onClick={handleGoBack} variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const stateData = locationData.state;
  const countryData = locationData.country;

  return (
    <Layout>
      <Helmet>
        <title>Best {service.title} in {stateData.name} | {siteConfig.name}</title>
        <meta name="description" content={`Professional ${service.title} services throughout ${stateData.name}. Expert technicians serving all cities in ${stateData.name} with guaranteed satisfaction.`} />
        <meta name="keywords" content={`${service.title}, ${stateData.name}, ${stateData.abbreviation}, tech support`} />
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
              Back to Services
            </Button>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Monitor className="w-8 h-8" />
                  <h1 className="text-4xl md:text-5xl font-bold">
                    {service.title} in {stateData.name}
                  </h1>
                  {service.popular && (
                    <Badge className="bg-yellow-500 text-yellow-900 border-0">
                      <Star className="w-3 h-3 mr-1 fill-current" />
                      Popular
                    </Badge>
                  )}
                </div>
                <p className="text-xl opacity-90 mb-6">
                  Professional {service.title} services throughout {stateData.name}. Expert technicians serving all cities in {stateData.name}.
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
                    <h2 className="text-2xl font-bold">Service Overview in {stateData.name}</h2>
                  </div>
                  
                  <div className="prose prose-lg max-w-none">
                    <p className="text-gray-700 leading-relaxed mb-6">
                      {service.description}
                    </p>
                    
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200 mb-6">
                      <h3 className="text-xl font-semibold mb-4 text-blue-800 flex items-center gap-2">
                        <Building className="w-6 h-6" />
                        Serving All of {stateData.name}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center">
                          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                            <MapPin className="w-8 h-8 text-blue-600" />
                          </div>
                          <h4 className="font-semibold mb-2">Statewide Coverage</h4>
                          <p className="text-sm text-gray-600">Available in all {stateData.name} cities</p>
                        </div>
                        <div className="text-center">
                          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                            <Zap className="w-8 h-8 text-blue-600" />
                          </div>
                          <h4 className="font-semibold mb-2">Fast Response</h4>
                          <p className="text-sm text-gray-600">Quick service throughout {stateData.abbreviation}</p>
                        </div>
                        <div className="text-center">
                          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                            <Users className="w-8 h-8 text-blue-600" />
                          </div>
                          <h4 className="font-semibold mb-2">Local Experts</h4>
                          <p className="text-sm text-gray-600">Certified technicians in {stateData.name}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Booking Sidebar with Zip Code */}
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
                  
                  {/* Zip Code Input */}
                  <div className="space-y-4 mb-6">
                    <Label htmlFor="zipCode" className="text-sm font-medium flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Enter Your Zip Code
                    </Label>
                    <Input
                      id="zipCode"
                      type="text"
                      placeholder="e.g., 12345"
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                      className="text-center text-lg"
                    />
                    <p className="text-xs text-gray-500 text-center">
                      We need your zip code to connect you with the nearest technician in {stateData.name}
                    </p>
                  </div>
                  
                  <Button 
                    onClick={handleAddToCart}
                    disabled={!zipCode.trim()}
                    className="w-full bg-gradient-to-r from-onassist-primary to-onassist-dark hover:from-onassist-dark hover:to-onassist-primary text-lg py-6 mb-4 shadow-lg disabled:opacity-50"
                    size="lg"
                  >
                    Book Service in {stateData.abbreviation}
                  </Button>
                  
                  <div className="text-center space-y-3">
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                      <Shield className="w-4 h-4 text-green-500" />
                      <span>Serving all {stateData.name}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Local {stateData.abbreviation} technicians</span>
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

export default StateServiceDetailPage;
