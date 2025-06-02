
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
  Search
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

const StateServicePage = () => {
  const { country, state } = useParams();
  const { data: categories } = useServiceCategories();
  const { data: categoriesWithServices } = useCategoriesWithServices();

  // Get location data
  const locationData = getLocationBreadcrumb(country || '', state || '', '');
  
  if (!locationData.state || !locationData.country) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">State not found</h1>
            <p className="text-gray-600 mb-6">The state you're looking for doesn't exist.</p>
            <Button asChild variant="outline">
              <Link to="/">Go Home</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const stateData = locationData.state;
  const countryData = locationData.country;

  // Get popular services (first 6 categories)
  const popularCategories = categoriesWithServices?.slice(0, 6) || [];

  // Sample testimonials specific to state
  const stateTestimonials = [
    {
      name: `Sarah M.`,
      location: `${stateData.name}`,
      rating: 5,
      text: `Outstanding tech support across ${stateData.name}. Professional, reliable, and always on time.`
    },
    {
      name: `David L.`,
      location: `${stateData.name}`,
      rating: 5,
      text: `Best service in ${stateData.name}! They've helped us multiple times with our business IT needs.`
    },
    {
      name: `Lisa K.`,
      location: `${stateData.name}`,
      rating: 5,
      text: `Incredible smart home setup throughout ${stateData.name}. Highly recommend their services!`
    }
  ];

  // Sample specialists for state with relevant images
  const stateSpecialists = [
    {
      name: `Alex Rodriguez`,
      specialty: 'Senior Tech Specialist',
      experience: '8+ years',
      location: `${stateData.name}`,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    },
    {
      name: `Jennifer Chen`,
      specialty: 'Smart Home Expert',
      experience: '6+ years',
      location: `${stateData.name}`,
      image: 'https://images.unsplash.com/photo-1494790108755-2616b812b6aa?w=150&h=150&fit=crop&crop=face'
    },
    {
      name: `Michael Johnson`,
      specialty: 'Network Specialist',
      experience: '7+ years',
      location: `${stateData.name}`,
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
        <title>Best Tech Support Services in {stateData.name} | {siteConfig.name}</title>
        <meta name="description" content={`Professional tech support services throughout ${stateData.name}. Expert technicians providing computer repair, smart home setup, and IT support in all cities across ${stateData.name}.`} />
        <meta name="keywords" content={`tech support ${stateData.name}, computer repair ${stateData.abbreviation}, IT services ${stateData.name}`} />
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
                  <Link to={`/${country}`} className="text-gray-600 hover:text-onassist-primary transition-colors">
                    {countryData.name}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="font-medium text-onassist-primary">
                  {stateData.name}
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
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mb-8">
              <Navigation className="w-5 h-5" />
              <span className="font-medium">Serving All of {stateData.name}</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                Tech Support in
              </span>
              <br />
              <span className="text-yellow-300">{stateData.name}</span>
            </h1>
            
            <p className="text-xl md:text-2xl opacity-90 mb-10 leading-relaxed max-w-3xl mx-auto">
              Professional technology support throughout <strong>{stateData.name}</strong>. 
              Our certified technicians serve all cities in {stateData.name} with guaranteed satisfaction.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-3xl font-bold mb-2">Statewide</div>
                <div className="text-sm opacity-80">Coverage in {stateData.name}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-3xl font-bold mb-2">Same Day</div>
                <div className="text-sm opacity-80">Service Available</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-3xl font-bold mb-2">100%</div>
                <div className="text-sm opacity-80">Satisfaction Rate</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-onassist-primary hover:bg-gray-100 font-semibold px-8 py-4 rounded-full shadow-xl"
                onClick={() => window.open(`tel:${siteConfig.contactPhone}`, '_self')}
              >
                <Phone className="w-5 h-5 mr-2" />
                Call {siteConfig.contactPhone}
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-onassist-primary font-semibold px-8 py-4 rounded-full backdrop-blur-sm">
                <Search className="w-5 h-5 mr-2" />
                <span className="text-blue-600">Find Local Service</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Cities We Serve - Unique Design */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-onassist-primary/10 text-onassist-primary rounded-full px-6 py-2 mb-4">
              <MapPin className="w-5 h-5" />
              <span className="font-medium">Local Presence</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Cities We Serve in <span className="text-onassist-primary">{stateData.name}</span>
            </h2>
            <p className="text-xl text-gray-600">
              Professional tech support available in all major cities across {stateData.name}
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {stateData.cities.map((city, index) => (
                <Link
                  key={city.name}
                  to={`/${country}/${state}/${city.slug}`}
                  className="group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 border border-gray-200 hover:border-onassist-primary/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-onassist-primary to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <Building className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-1 group-hover:text-onassist-primary transition-colors">
                        {city.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {stateData.abbreviation}
                      </p>
                    </div>
                    <div className="text-onassist-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <p className="text-gray-600 mb-6">
                Don't see your city? We serve all areas in {stateData.name}!
              </p>
              <Button size="lg" className="bg-gradient-to-r from-onassist-primary to-blue-600 hover:from-blue-600 hover:to-onassist-primary text-white font-semibold px-8 py-4 rounded-full shadow-lg">
                <Phone className="w-5 h-5 mr-2" />
                Call for Your Area
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Services */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 rounded-full px-6 py-2 mb-4">
              <Zap className="w-5 h-5" />
              <span className="font-medium">Most Popular</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Top Services in <span className="text-onassist-primary">{stateData.name}</span>
            </h2>
            <p className="text-xl text-gray-600">
              Most requested tech solutions across {stateData.name}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularCategories.map((category) => {
              const CategoryIcon = getServiceIcon(category.title);
              return (
                <Card key={category.id} className="group shadow-xl hover:shadow-2xl transition-all duration-500 border-0 bg-white hover:-translate-y-1">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="bg-gradient-to-br from-onassist-primary to-blue-600 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
                        <CategoryIcon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="font-bold text-xl">{category.title}</h3>
                    </div>
                    
                    <p className="text-gray-600 mb-6">
                      {category.description}
                    </p>
                    
                    <div className="space-y-3 mb-6">
                      {category.services.slice(0, 3).map((service) => (
                        <Link
                          key={service.id}
                          to={`/${country}/${state}/service/${service.slug}`}
                          className="block text-gray-700 hover:text-onassist-primary transition-colors p-2 rounded hover:bg-gray-50"
                        >
                          • {service.title}
                        </Link>
                      ))}
                    </div>
                    
                    <Link
                      to={`/services/${category.slug}`}
                      className="inline-flex items-center gap-2 text-onassist-primary font-semibold group-hover:gap-3 transition-all"
                    >
                      View All Services
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Meet State Specialists */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 rounded-full px-6 py-2 mb-4">
              <Award className="w-5 h-5" />
              <span className="font-medium">Expert Team</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Meet {stateData.name} Specialists
            </h2>
            <p className="text-xl text-gray-600">
              Certified experts serving customers across {stateData.name}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stateSpecialists.map((specialist, index) => (
              <Card key={index} className="shadow-xl text-center border-0 bg-gradient-to-b from-white to-gray-50 hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className="relative mb-6">
                    <img
                      src={specialist.image}
                      alt={specialist.name}
                      className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-white shadow-lg"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-2">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <h3 className="font-bold text-xl mb-2">{specialist.name}</h3>
                  <p className="text-onassist-primary font-semibold mb-2">{specialist.specialty}</p>
                  <p className="text-gray-600 mb-4">{specialist.experience}</p>
                  <div className="flex items-center justify-center gap-2 text-gray-500 mb-4">
                    <MapPin className="w-4 h-4" />
                    <span>{specialist.location}</span>
                  </div>
                  <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-700 rounded-full px-4 py-2">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-medium">5.0 Rating</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-700 rounded-full px-6 py-2 mb-4">
              <Heart className="w-5 h-5" />
              <span className="font-medium">Customer Stories</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              What <span className="text-onassist-primary">{stateData.name}</span> Says About Us
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stateTestimonials.map((testimonial, index) => (
              <Card key={index} className="shadow-xl border-0 bg-gradient-to-br from-gray-50 to-white hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 italic text-lg leading-relaxed">"{testimonial.text}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-onassist-primary to-blue-600 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-lg">{testimonial.name}</div>
                      <div className="text-gray-600">{testimonial.location}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-onassist-primary via-blue-600 to-purple-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        <div className="relative container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready for Tech Support in <span className="text-yellow-300">{stateData.name}</span>?
            </h2>
            <p className="text-xl md:text-2xl opacity-90 mb-10 leading-relaxed">
              Get professional technology support anywhere in {stateData.name}. 
              Our certified technicians are ready to help you today.
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

export default StateServicePage;
