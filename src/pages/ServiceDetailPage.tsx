
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
import { Clock, Star, Shield, CheckCircle, ArrowLeft, Wrench, Monitor, Home, Smartphone, Wifi, Settings, Zap, Users, Award, Phone } from 'lucide-react';
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
    // Different layouts based on service type and characteristics
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

  return (
    <Layout>
      <Helmet>
        <title>{service.title} | {siteConfig.name}</title>
        <meta name="description" content={service.description} />
      </Helmet>

      <div className={`min-h-screen ${bgPatterns[layoutVariant as keyof typeof bgPatterns]}`}>
        {/* Hero Section - Dynamic layout based on variant */}
        <div className={`py-16 bg-gradient-to-r ${gradientClasses[serviceType as keyof typeof gradientClasses]} text-white relative overflow-hidden`}>
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
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
            
            {layoutVariant === 'modern' ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm">
                      <ServiceIcon className="w-8 h-8" />
                    </div>
                    <div>
                      <h1 className="text-4xl md:text-5xl font-bold leading-tight">{service.title}</h1>
                      {service.popular && (
                        <Badge className="bg-yellow-500 text-yellow-900 border-0 mt-2">
                          <Star className="w-3 h-3 mr-1 fill-current" />
                          Most Popular
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-xl opacity-90 leading-relaxed">{service.description}</p>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                      <Clock className="w-6 h-6 mb-2" />
                      <div className="text-sm opacity-80">Duration</div>
                      <div className="text-lg font-semibold">{service.duration}</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                      <Zap className="w-6 h-6 mb-2" />
                      <div className="text-sm opacity-80">Price</div>
                      <div className="text-2xl font-bold">${service.price}</div>
                    </div>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="absolute inset-0 bg-white/20 rounded-3xl transform rotate-6"></div>
                  <img 
                    src={service.image_url} 
                    alt={service.title}
                    className="relative w-full h-80 object-cover rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            ) : layoutVariant === 'premium' ? (
              <div className="text-center max-w-4xl mx-auto space-y-8">
                <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-full px-8 py-4">
                  <ServiceIcon className="w-8 h-8" />
                  <span className="text-lg font-medium">Premium Service</span>
                </div>
                
                <h1 className="text-5xl md:text-6xl font-bold">{service.title}</h1>
                {service.popular && (
                  <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 px-6 py-2 text-lg">
                    <Award className="w-4 h-4 mr-2" />
                    Award Winning Service
                  </Badge>
                )}
                
                <p className="text-xl opacity-90 max-w-2xl mx-auto leading-relaxed">{service.description}</p>
                
                <div className="flex justify-center gap-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold">${service.price}</div>
                    <div className="opacity-80">Starting Price</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold">{service.duration}</div>
                    <div className="opacity-80">Completion Time</div>
                  </div>
                </div>
                
                <img 
                  src={service.image_url} 
                  alt={service.title}
                  className="w-full max-w-2xl mx-auto h-80 object-cover rounded-2xl shadow-2xl"
                />
              </div>
            ) : (
              // Classic and minimal layouts
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
            )}
          </div>
        </div>

        {/* Main Content - Dynamic layout */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Service Details */}
            <div className="lg:col-span-2 space-y-8">
              <Card className={`shadow-xl border-0 overflow-hidden ${layoutVariant === 'premium' ? 'bg-gradient-to-br from-white to-purple-50' : 'bg-white'}`}>
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`p-2 rounded-lg ${serviceType === 'home' ? 'bg-green-100 text-green-600' : serviceType === 'computer' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'}`}>
                      <ServiceIcon className="w-6 h-6" />
                    </div>
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

                    {/* Dynamic content sections based on service type */}
                    {serviceType === 'home' && (
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
                        <h3 className="text-xl font-semibold mb-4 text-green-800 flex items-center gap-2">
                          <Home className="w-6 h-6" />
                          Smart Home Expertise
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="text-center">
                            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                              <Home className="w-8 h-8 text-green-600" />
                            </div>
                            <h4 className="font-semibold mb-2">Home Integration</h4>
                            <p className="text-sm text-gray-600">Seamless device connectivity and automation</p>
                          </div>
                          <div className="text-center">
                            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                              <Shield className="w-8 h-8 text-green-600" />
                            </div>
                            <h4 className="font-semibold mb-2">Security Setup</h4>
                            <p className="text-sm text-gray-600">Advanced security and privacy protection</p>
                          </div>
                          <div className="text-center">
                            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                              <Users className="w-8 h-8 text-green-600" />
                            </div>
                            <h4 className="font-semibold mb-2">Expert Support</h4>
                            <p className="text-sm text-gray-600">24/7 monitoring and assistance</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {serviceType === 'computer' && (
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                        <h3 className="text-xl font-semibold mb-4 text-blue-800 flex items-center gap-2">
                          <Monitor className="w-6 h-6" />
                          Computer Repair Specialists
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="text-center">
                            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                              <Settings className="w-8 h-8 text-blue-600" />
                            </div>
                            <h4 className="font-semibold mb-2">Hardware Experts</h4>
                            <p className="text-sm text-gray-600">Certified repair technicians</p>
                          </div>
                          <div className="text-center">
                            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                              <Shield className="w-8 h-8 text-blue-600" />
                            </div>
                            <h4 className="font-semibold mb-2">Data Security</h4>
                            <p className="text-sm text-gray-600">Safe data handling and recovery</p>
                          </div>
                          <div className="text-center">
                            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                              <Award className="w-8 h-8 text-blue-600" />
                            </div>
                            <h4 className="font-semibold mb-2">Quality Guarantee</h4>
                            <p className="text-sm text-gray-600">90-day warranty on all repairs</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {(serviceType === 'network' || serviceType === 'general' || serviceType === 'av' || serviceType === 'mobile') && (
                      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
                        <h3 className="text-xl font-semibold mb-4 text-purple-800 flex items-center gap-2">
                          <ServiceIcon className="w-6 h-6" />
                          Professional Service Excellence
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="text-center">
                            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                              <Wrench className="w-8 h-8 text-purple-600" />
                            </div>
                            <h4 className="font-semibold mb-2">Expert Technicians</h4>
                            <p className="text-sm text-gray-600">Certified and experienced professionals</p>
                          </div>
                          <div className="text-center">
                            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                              <Zap className="w-8 h-8 text-purple-600" />
                            </div>
                            <h4 className="font-semibold mb-2">Fast Service</h4>
                            <p className="text-sm text-gray-600">Quick and efficient completion</p>
                          </div>
                          <div className="text-center">
                            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                              <Star className="w-8 h-8 text-purple-600" />
                            </div>
                            <h4 className="font-semibold mb-2">Satisfaction Guaranteed</h4>
                            <p className="text-sm text-gray-600">100% customer satisfaction promise</p>
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
              <Card className={`shadow-xl border-0 sticky top-24 ${layoutVariant === 'premium' ? 'bg-gradient-to-br from-white to-yellow-50' : 'bg-white'}`}>
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
                    Book This Service
                  </Button>
                  
                  <div className="text-center space-y-3">
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                      <Shield className="w-4 h-4 text-green-500" />
                      <span>Secure booking & payment</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Free consultation included</span>
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
                    Need Help?
                  </h3>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start bg-white/10 border-white/20 text-white hover:bg-white hover:text-onassist-primary">
                      Contact Support
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-white/10 border-white/20 text-white hover:bg-white hover:text-onassist-primary">
                      Schedule Consultation
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-white/10 border-white/20 text-white hover:bg-white hover:text-onassist-primary">
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
