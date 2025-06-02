
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Helmet } from 'react-helmet-async';
import { siteConfig } from '@/config/site';
import { useServiceCategories, useCategoriesWithServices } from '@/hooks/useServices';
import { getLocationBreadcrumb } from '@/data/locations';
import { 
  MapPin, 
  Star, 
  Users, 
  Award, 
  Phone, 
  Clock, 
  CheckCircle,
  ArrowRight,
  Home,
  Monitor,
  Smartphone,
  Wifi,
  Wrench,
  Shield,
  Zap,
  Building,
  Heart,
  Navigation,
  Globe,
  Truck,
  HeadphonesIcon,
  Flag,
  Target
} from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import ServiceCard from '@/components/services/ServiceCard';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const CountryPage = () => {
  const { country } = useParams();
  const { data: categories } = useServiceCategories();
  const { data: categoriesWithServices } = useCategoriesWithServices();

  // Get location data
  const locationData = getLocationBreadcrumb(country || '', '', '');
  
  if (!locationData.country) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Country not found</h1>
            <p className="text-gray-600 mb-6">The country you're looking for doesn't exist.</p>
            <Button asChild variant="outline">
              <Link to="/">Go Home</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const countryData = locationData.country;

  // Get all services
  const allServices = categoriesWithServices?.flatMap(cat => 
    cat.services.slice(0, 3).map(service => ({
      ...service,
      linkPath: `/service/${service.slug}`
    }))
  ).slice(0, 8) || [];

  // Sample testimonials for country
  const countryTestimonials = [
    {
      name: `Michael R.`,
      location: `${countryData.name}`,
      rating: 5,
      text: `Exceptional tech support nationwide. Professional service and expert technicians across ${countryData.name}.`
    },
    {
      name: `Sarah Johnson`,
      location: `${countryData.name}`,
      rating: 5,
      text: `Outstanding customer service! They've been our go-to tech support provider across multiple states.`
    },
    {
      name: `David Wilson`,
      location: `${countryData.name}`,
      rating: 5,
      text: `Reliable, professional, and always available. Best tech support service in ${countryData.name}!`
    }
  ];

  // Sample country specialists
  const countrySpecialists = [
    {
      name: `Emily Rodriguez`,
      specialty: 'National Operations Director',
      experience: '12+ years',
      location: `${countryData.name}`,
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face'
    },
    {
      name: `James Anderson`,
      specialty: 'Senior Tech Lead',
      experience: '10+ years',
      location: `${countryData.name}`,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    },
    {
      name: `Maria Garcia`,
      specialty: 'Customer Success Manager',
      experience: '8+ years',
      location: `${countryData.name}`,
      image: 'https://images.unsplash.com/photo-1494790108755-2616b812b6aa?w=150&h=150&fit=crop&crop=face'
    },
    {
      name: `Robert Kim`,
      specialty: 'Smart Home Solutions Expert',
      experience: '9+ years',
      location: `${countryData.name}`,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    }
  ];

  const getServiceIcon = (categoryTitle: string) => {
    const title = categoryTitle.toLowerCase();
    if (title.includes('home') || title.includes('smart')) return Home;
    if (title.includes('computer') || title.includes('laptop')) return Monitor;
    if (title.includes('phone') || title.includes('mobile')) return Smartphone;
    if (title.includes('network') || title.includes('wifi')) return Wifi;
    return Wrench;
  };

  return (
    <Layout>
      <Helmet>
        <title>Professional Tech Support Services in {countryData.name} | {siteConfig.name}</title>
        <meta name="description" content={`Leading tech support services across ${countryData.name}. Expert technicians providing computer repair, smart home setup, and IT support in all states. Nationwide coverage with local expertise.`} />
        <meta name="keywords" content={`tech support ${countryData.name}, computer repair nationwide, IT services ${countryData.name}, smart home setup`} />
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
                <BreadcrumbPage className="font-medium text-onassist-primary">
                  {countryData.name}
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
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Ccircle cx='30' cy='30' r='8'/%3E%3Ccircle cx='10' cy='10' r='4'/%3E%3Ccircle cx='50' cy='50' r='6'/%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-white/5 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-20 h-20 bg-white/10 rounded-full animate-pulse delay-500"></div>
        
        <div className="relative container mx-auto px-4 py-24">
          <div className="max-w-6xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-8 py-3 mb-8">
              <Flag className="w-6 h-6" />
              <span className="font-medium text-lg">Nationwide Coverage</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                Tech Support
              </span>
              <br />
              <span className="text-yellow-300">Across {countryData.name}</span>
            </h1>
            
            <p className="text-2xl md:text-3xl opacity-90 mb-12 leading-relaxed max-w-4xl mx-auto">
              Professional technology support nationwide. Our certified technicians provide expert service 
              in every state across <strong>{countryData.name}</strong> with guaranteed satisfaction.
            </p>
            
            {/* National Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8">
                <div className="text-4xl font-bold mb-3">50+</div>
                <div className="text-lg opacity-80">States Served</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8">
                <div className="text-4xl font-bold mb-3">24/7</div>
                <div className="text-lg opacity-80">Support Available</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8">
                <div className="text-4xl font-bold mb-3">100K+</div>
                <div className="text-lg opacity-80">Happy Customers</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8">
                <div className="text-4xl font-bold mb-3">99.9%</div>
                <div className="text-lg opacity-80">Satisfaction Rate</div>
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-onassist-primary hover:bg-gray-100 font-bold px-10 py-6 rounded-full shadow-2xl text-xl"
                onClick={() => window.open(`tel:${siteConfig.contactPhone}`, '_self')}
              >
                <Phone className="w-6 h-6 mr-3" />
                Call {siteConfig.contactPhone}
              </Button>
              <Button size="lg" variant="outline" className="border-3 border-white text-white hover:bg-white hover:text-onassist-primary font-bold px-10 py-6 rounded-full backdrop-blur-sm text-xl">
                <Globe className="w-6 h-6 mr-3" />
                Find Your State
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us Nationwide */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-onassist-primary/10 text-onassist-primary rounded-full px-8 py-3 mb-6">
              <Target className="w-6 h-6" />
              <span className="font-medium text-lg">Why Choose Us</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              Leading Tech Support in <span className="text-onassist-primary">{countryData.name}</span>
            </h2>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto">
              Trusted by customers nationwide for reliable, professional technology solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <Card className="group shadow-2xl hover:shadow-3xl transition-all duration-500 border-0 bg-gradient-to-br from-blue-50 to-white hover:-translate-y-3">
              <CardContent className="p-10 text-center">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300">
                  <Globe className="w-12 h-12 text-white" />
                </div>
                <h3 className="font-bold text-2xl mb-4">Nationwide Coverage</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Professional tech support available in all 50 states across {countryData.name}
                </p>
              </CardContent>
            </Card>

            <Card className="group shadow-2xl hover:shadow-3xl transition-all duration-500 border-0 bg-gradient-to-br from-green-50 to-white hover:-translate-y-3">
              <CardContent className="p-10 text-center">
                <div className="bg-gradient-to-br from-green-500 to-green-600 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300">
                  <Award className="w-12 h-12 text-white" />
                </div>
                <h3 className="font-bold text-2xl mb-4">Certified Experts</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  All technicians are certified professionals with years of experience
                </p>
              </CardContent>
            </Card>

            <Card className="group shadow-2xl hover:shadow-3xl transition-all duration-500 border-0 bg-gradient-to-br from-purple-50 to-white hover:-translate-y-3">
              <CardContent className="p-10 text-center">
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300">
                  <HeadphonesIcon className="w-12 h-12 text-white" />
                </div>
                <h3 className="font-bold text-2xl mb-4">24/7 Support</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Round-the-clock customer support and emergency tech assistance
                </p>
              </CardContent>
            </Card>

            <Card className="group shadow-2xl hover:shadow-3xl transition-all duration-500 border-0 bg-gradient-to-br from-orange-50 to-white hover:-translate-y-3">
              <CardContent className="p-10 text-center">
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300">
                  <Truck className="w-12 h-12 text-white" />
                </div>
                <h3 className="font-bold text-2xl mb-4">Same-Day Service</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Fast response times with same-day service available nationwide
                </p>
              </CardContent>
            </Card>

            <Card className="group shadow-2xl hover:shadow-3xl transition-all duration-500 border-0 bg-gradient-to-br from-teal-50 to-white hover:-translate-y-3">
              <CardContent className="p-10 text-center">
                <div className="bg-gradient-to-br from-teal-500 to-teal-600 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-12 h-12 text-white" />
                </div>
                <h3 className="font-bold text-2xl mb-4">Satisfaction Guaranteed</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  100% satisfaction guarantee on all services with comprehensive warranty
                </p>
              </CardContent>
            </Card>

            <Card className="group shadow-2xl hover:shadow-3xl transition-all duration-500 border-0 bg-gradient-to-br from-pink-50 to-white hover:-translate-y-3">
              <CardContent className="p-10 text-center">
                <div className="bg-gradient-to-br from-pink-500 to-pink-600 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-12 h-12 text-white" />
                </div>
                <h3 className="font-bold text-2xl mb-4">Latest Technology</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Cutting-edge tools and techniques for all modern tech solutions
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* States We Serve */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 rounded-full px-8 py-3 mb-6">
              <MapPin className="w-6 h-6" />
              <span className="font-medium text-lg">Nationwide Presence</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              States We Serve in <span className="text-onassist-primary">{countryData.name}</span>
            </h2>
            <p className="text-2xl text-gray-600">
              Professional tech support available in all major states
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl shadow-2xl p-12">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
              {countryData.states.map((state, index) => (
                <Link
                  key={state.name}
                  to={`/${country}/${state.slug}`}
                  className="group relative overflow-hidden rounded-2xl bg-white border-2 border-gray-200 hover:border-onassist-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
                >
                  <div className="p-8 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-onassist-primary to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Building className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-bold text-xl mb-3 group-hover:text-onassist-primary transition-colors">
                      {state.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">
                      {state.abbreviation}
                    </p>
                    <div className="text-xs text-gray-400">
                      {state.cities.length} Cities
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-onassist-primary/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Popular Services Nationwide */}
      <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-onassist-primary/10 text-onassist-primary rounded-full px-8 py-3 mb-6">
              <Zap className="w-6 h-6" />
              <span className="font-medium text-lg">Most Popular</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              Top Services Across <span className="text-onassist-primary">{countryData.name}</span>
            </h2>
            <p className="text-2xl text-gray-600">
              Most requested tech solutions nationwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {allServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                linkPath={service.linkPath}
              />
            ))}
          </div>

          <div className="text-center mt-16">
            <Button asChild size="lg" className="bg-gradient-to-r from-onassist-primary to-blue-600 hover:from-blue-600 hover:to-onassist-primary text-white font-bold px-12 py-6 rounded-full shadow-2xl text-xl">
              <Link to="/services">
                View All Services
                <ArrowRight className="w-6 h-6 ml-3" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Meet Our National Team */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 rounded-full px-8 py-3 mb-6">
              <Award className="w-6 h-6" />
              <span className="font-medium text-lg">Expert Leadership</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              Meet Our National Team
            </h2>
            <p className="text-2xl text-gray-600">
              Industry experts leading tech support across {countryData.name}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {countrySpecialists.map((specialist, index) => (
              <Card key={index} className="shadow-xl text-center border-0 bg-gradient-to-b from-white to-gray-50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-8">
                  <div className="relative mb-6">
                    <img
                      src={specialist.image}
                      alt={specialist.name}
                      className="w-28 h-28 rounded-full mx-auto object-cover border-4 border-white shadow-lg"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-2">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <h3 className="font-bold text-xl mb-2">{specialist.name}</h3>
                  <p className="text-onassist-primary font-semibold mb-2">{specialist.specialty}</p>
                  <p className="text-gray-600 mb-4">{specialist.experience}</p>
                  <div className="flex items-center justify-center gap-2 text-gray-500 mb-4">
                    <Globe className="w-4 h-4" />
                    <span>{specialist.location}</span>
                  </div>
                  <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-700 rounded-full px-4 py-2">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-medium">Industry Leader</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-700 rounded-full px-8 py-3 mb-6">
              <Heart className="w-6 h-6" />
              <span className="font-medium text-lg">Customer Stories</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              What <span className="text-onassist-primary">{countryData.name}</span> Says About Us
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {countryTestimonials.map((testimonial, index) => (
              <Card key={index} className="shadow-2xl border-0 bg-white hover:shadow-3xl transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-10">
                  <div className="flex items-center mb-8">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-7 h-7 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-8 italic text-xl leading-relaxed">"{testimonial.text}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-onassist-primary to-blue-600 rounded-full flex items-center justify-center">
                      <Users className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-xl">{testimonial.name}</div>
                      <div className="text-gray-600 text-lg">{testimonial.location}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-onassist-primary via-blue-600 to-purple-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Ccircle cx='30' cy='30' r='8'/%3E%3Ccircle cx='10' cy='10' r='4'/%3E%3Ccircle cx='50' cy='50' r='6'/%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        <div className="relative container mx-auto px-4 text-center">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              Ready for Professional Tech Support?
            </h2>
            <p className="text-2xl md:text-3xl opacity-90 mb-12 leading-relaxed">
              Get expert technology solutions anywhere in <span className="text-yellow-300">{countryData.name}</span>. 
              Our certified technicians are standing by to help you 24/7.
            </p>
            
            {/* Enhanced Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8">
                <div className="text-4xl font-bold mb-3">15 Min</div>
                <div className="text-lg opacity-80">Response Time</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8">
                <div className="text-4xl font-bold mb-3">5-Star</div>
                <div className="text-lg opacity-80">Average Rating</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8">
                <div className="text-4xl font-bold mb-3">Nationwide</div>
                <div className="text-lg opacity-80">Coverage</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8">
                <div className="text-4xl font-bold mb-3">Guaranteed</div>
                <div className="text-lg opacity-80">Satisfaction</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-8 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-onassist-primary hover:bg-gray-100 font-bold px-12 py-6 rounded-full shadow-2xl text-xl"
                onClick={() => window.open(`tel:${siteConfig.contactPhone}`, '_self')}
              >
                <Phone className="w-6 h-6 mr-3" />
                Call Now: {siteConfig.contactPhone}
              </Button>
              <Button size="lg" variant="outline" className="border-3 border-white text-white hover:bg-white hover:text-onassist-primary font-bold px-12 py-6 rounded-full backdrop-blur-sm text-xl">
                <Clock className="w-6 h-6 mr-3" />
                Schedule Service Online
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CountryPage;
