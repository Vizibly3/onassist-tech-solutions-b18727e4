
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
import { Clock, Star, Shield, CheckCircle, ArrowLeft, Wrench, Monitor, Home, Smartphone, Wifi, Settings, Zap, Users, Award, Phone, MapPin } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { getLocationBreadcrumb } from '@/data/locations';

const LocationServiceDetailPage = () => {
  const { country, state, city, serviceSlug } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { data: service, isLoading, error } = useServiceBySlug(serviceSlug || '');

  // Get location data
  const locationData = getLocationBreadcrumb(country || '', state || '', city || '');

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

  if (error || !service || !locationData.city || !locationData.state || !locationData.country) {
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

  const serviceType = getServiceType(service.title);
  const ServiceIcon = getServiceIcon(serviceType);
  const features = getServiceFeatures(serviceType);
  const layoutVariant = getLayoutVariant(serviceType, service.title);

  const gradientClasses = {
    home: 'from-green-600 via-emerald-600 to-teal-700',
    computer: 'from-blue-600 via-indigo-600 to-purple-700',
    mobile: 'from-purple-600 via-pink-600 to-red-700',
    av: 'from-red-600 via-orange-600 to-yellow-700',
    network: 'from-cyan-600 via-blue-600 to-indigo-700',
    general: 'from-onassist-primary via-blue-600 to-onassist-dark'
  };

  const bgPatterns = {
    modern: 'bg-gradient-to-br from-gray-50 via-white to-gray-100',
    classic: 'bg-gradient-to-r from-blue-50 to-indigo-50',
    premium: 'bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50',
    minimal: 'bg-white'
  };

  // Generate location-specific title and content
  const locationTitle = `Best ${service.title} in ${locationData.city.name}, ${locationData.state.abbreviation}`;
  const locationDescription = `Professional ${service.title} services in ${locationData.city.name}, ${locationData.state.name}. Expert technicians serving the ${locationData.city.name} area with guaranteed satisfaction.`;

  return (
    <Layout>
      <Helmet>
        <title>{locationTitle} | {siteConfig.name}</title>
        <meta name="description" content={locationDescription} />
        <meta name="keywords" content={`${service.title}, ${locationData.city.name}, ${locationData.state.name}, ${locationData.state.abbreviation}, tech support`} />
      </Helmet>

      <div className={`min-h-screen ${bgPatterns[layoutVariant as keyof typeof bgPatterns]}`}>
        {/* Location Breadcrumb */}
        <div className="bg-gray-50 border-b">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{locationData.country.name}</span>
              <span>/</span>
              <span>{locationData.state.name} ({locationData.state.abbreviation})</span>
              <span>/</span>
              <span className="font-medium text-onassist-primary">{locationData.city.name}</span>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className={`py-16 bg-gradient-to-r ${gradientClasses[serviceType as keyof typeof gradientClasses]} text-white relative overflow-hidden`}>
          {/* Background Pattern */}
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
                  <ServiceIcon className="w-8 h-8" />
                  <h1 className="text-4xl md:text-5xl font-bold">{locationTitle}</h1>
                  {service.popular && (
                    <Badge className="bg-yellow-500 text-yellow-900 border-0">
                      <Star className="w-3 h-3 mr-1 fill-current" />
                      Popular
                    </Badge>
                  )}
                </div>
                <p className="text-xl opacity-90 mb-6">{locationDescription}</p>
                
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
                  alt={locationTitle}
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
                    <div className={`p-2 rounded-lg ${serviceType === 'home' ? 'bg-green-100 text-green-600' : serviceType === 'computer' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'}`}>
                      <ServiceIcon className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold">Service Overview in {locationData.city.name}</h2>
                  </div>
                  
                  <div className="prose prose-lg max-w-none">
                    <p className="text-gray-700 leading-relaxed mb-6">
                      We provide professional {service.title} services throughout {locationData.city.name}, {locationData.state.name}. 
                      Our certified technicians are familiar with the local area and understand the specific needs of {locationData.city.name} residents and businesses.
                    </p>
                    
                    <h3 className="text-xl font-semibold mb-4">What&apos;s Included in {locationData.city.name}:</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      {features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Location-specific content */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200 mb-6">
                      <h3 className="text-xl font-semibold mb-4 text-blue-800 flex items-center gap-2">
                        <MapPin className="w-6 h-6" />
                        Serving {locationData.city.name}, {locationData.state.abbreviation}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center">
                          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                            <MapPin className="w-8 h-8 text-blue-600" />
                          </div>
                          <h4 className="font-semibold mb-2">Local Expertise</h4>
                          <p className="text-sm text-gray-600">Deep knowledge of {locationData.city.name} area</p>
                        </div>
                        <div className="text-center">
                          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                            <Zap className="w-8 h-8 text-blue-600" />
                          </div>
                          <h4 className="font-semibold mb-2">Fast Response</h4>
                          <p className="text-sm text-gray-600">Quick service throughout {locationData.state.abbreviation}</p>
                        </div>
                        <div className="text-center">
                          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                            <Users className="w-8 h-8 text-blue-600" />
                          </div>
                          <h4 className="font-semibold mb-2">Community Focused</h4>
                          <p className="text-sm text-gray-600">Trusted by {locationData.city.name} residents</p>
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
                  
                  <Button 
                    onClick={handleAddToCart}
                    className="w-full bg-gradient-to-r from-onassist-primary to-onassist-dark hover:from-onassist-dark hover:to-onassist-primary text-lg py-6 mb-4 shadow-lg"
                    size="lg"
                  >
                    Book in {locationData.city.name}
                  </Button>
                  
                  <div className="text-center space-y-3">
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                      <Shield className="w-4 h-4 text-green-500" />
                      <span>Serving {locationData.city.name} area</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Local {locationData.state.abbreviation} technicians</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                      <Award className="w-4 h-4 text-green-500" />
                      <span>Satisfaction guaranteed</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Card */}
              <Card className="shadow-xl border-0 bg-gradient-to-br from-onassist-primary to-onassist-dark text-white">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Phone className="w-5 h-5" />
                    Need Help in {locationData.city.name}?
                  </h3>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start bg-white/10 border-white/20 text-white hover:bg-white hover:text-onassist-primary">
                      Contact Local Support
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-white/10 border-white/20 text-white hover:bg-white hover:text-onassist-primary">
                      Schedule in {locationData.state.abbreviation}
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-white/10 border-white/20 text-white hover:bg-white hover:text-onassist-primary">
                      Local FAQ
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

export default LocationServiceDetailPage;
