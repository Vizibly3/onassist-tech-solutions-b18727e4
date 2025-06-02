
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
  Navigation
} from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { slugify } from '@/utils/slugify';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const CityServicePage = () => {
  const { country, state, city } = useParams();
  const { data: categories } = useServiceCategories();
  const { data: categoriesWithServices } = useCategoriesWithServices();

  // Get location data
  const locationData = getLocationBreadcrumb(country || '', state || '', city || '');
  
  if (!locationData.city || !locationData.state || !locationData.country) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">City not found</h1>
            <p className="text-gray-600 mb-6">The city you're looking for doesn't exist.</p>
            <Button asChild variant="outline">
              <Link to="/">Go Home</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const cityData = locationData.city;
  const stateData = locationData.state;
  const countryData = locationData.country;

  // Get popular services (first 5 categories)
  const popularCategories = categoriesWithServices?.slice(0, 5) || [];

  // Sample testimonials specific to city
  const cityTestimonials = [
    {
      name: `Alex R.`,
      location: `${cityData.name}, ${stateData.abbreviation}`,
      rating: 5,
      text: `Amazing tech support service in ${cityData.name}. They fixed my laptop the same day and explained everything clearly.`
    },
    {
      name: `Maria L.`,
      location: `${cityData.name}, ${stateData.abbreviation}`,
      rating: 5,
      text: `Best smart home setup in ${cityData.name}! Professional team that made everything work perfectly together.`
    },
    {
      name: `James K.`,
      location: `${cityData.name}, ${stateData.abbreviation}`,
      rating: 5,
      text: `Excellent service in ${cityData.name}. Quick response, fair pricing, and very knowledgeable technicians.`
    }
  ];

  // Sample specialists for city
  const citySpecialists = [
    {
      name: `Michael ${cityData.name.charAt(0)}.`,
      specialty: 'Senior Tech Specialist',
      experience: '7+ years',
      location: `${cityData.name}, ${stateData.abbreviation}`,
      image: '/placeholder.svg'
    },
    {
      name: `Jennifer ${cityData.name.charAt(0)}.`,
      specialty: 'Smart Home Expert',
      experience: '5+ years',
      location: `${cityData.name}, ${stateData.abbreviation}`,
      image: '/placeholder.svg'
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
        <title>Best Tech Support Services in {cityData.name}, {stateData.abbreviation} | {siteConfig.name}</title>
        <meta name="description" content={`Professional tech support services in ${cityData.name}, ${stateData.name}. Expert technicians providing computer repair, smart home setup, and IT support with same-day service.`} />
        <meta name="keywords" content={`tech support ${cityData.name}, computer repair ${cityData.name} ${stateData.abbreviation}, IT services ${cityData.name}`} />
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
                <BreadcrumbLink asChild>
                  <Link to={`/${country}/${state}`} className="text-gray-600 hover:text-onassist-primary transition-colors">
                    {stateData.name}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="font-medium text-onassist-primary">
                  {cityData.name}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Hero Section - Modern Design */}
      <div className="relative bg-gradient-to-br from-onassist-primary via-blue-600 to-purple-700 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-24 h-24 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-white/5 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-white/10 rounded-full animate-pulse delay-500"></div>
        
        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-5xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mb-8">
              <Navigation className="w-5 h-5" />
              <span className="font-medium">Now Serving {cityData.name}</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                Tech Support in
              </span>
              <br />
              <span className="text-yellow-300">{cityData.name}</span>
            </h1>
            
            <p className="text-xl md:text-2xl opacity-90 mb-10 leading-relaxed max-w-3xl mx-auto">
              Professional technology support in <strong>{cityData.name}, {stateData.name}</strong>. 
              Our local technicians provide same-day service for all your tech needs.
            </p>
            
            {/* Local Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-3xl font-bold mb-2">Local</div>
                <div className="text-sm opacity-80">Technicians in {cityData.name}</div>
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
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-onassist-primary hover:bg-gray-100 font-semibold px-8 py-4 rounded-full shadow-xl">
                <Phone className="w-5 h-5 mr-2" />
                Call {siteConfig.contactPhone}
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-onassist-primary font-semibold px-8 py-4 rounded-full backdrop-blur-sm">
                <Clock className="w-5 h-5 mr-2" />
                Schedule Service Today
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Local Services Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-onassist-primary/10 text-onassist-primary rounded-full px-6 py-2 mb-4">
              <Building className="w-5 h-5" />
              <span className="font-medium">Local Service</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Tech Support Services in <span className="text-onassist-primary">{cityData.name}</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide comprehensive technology support services to homes and businesses in {cityData.name}, {stateData.name}. 
              Our local technicians are just minutes away from your location.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group shadow-xl hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-blue-50 to-white hover:-translate-y-2">
              <CardContent className="p-8 text-center">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Monitor className="w-10 h-10 text-white" />
                </div>
                <h3 className="font-bold text-xl mb-3">Computer Repair</h3>
                <p className="text-gray-600">
                  Expert computer and laptop repair services in {cityData.name}
                </p>
              </CardContent>
            </Card>

            <Card className="group shadow-xl hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-green-50 to-white hover:-translate-y-2">
              <CardContent className="p-8 text-center">
                <div className="bg-gradient-to-br from-green-500 to-green-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Home className="w-10 h-10 text-white" />
                </div>
                <h3 className="font-bold text-xl mb-3">Smart Home Setup</h3>
                <p className="text-gray-600">
                  Professional smart home installation in {cityData.name}, {stateData.abbreviation}
                </p>
              </CardContent>
            </Card>

            <Card className="group shadow-xl hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-purple-50 to-white hover:-translate-y-2">
              <CardContent className="p-8 text-center">
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Wifi className="w-10 h-10 text-white" />
                </div>
                <h3 className="font-bold text-xl mb-3">Network Support</h3>
                <p className="text-gray-600">
                  WiFi setup and network troubleshooting in {cityData.name}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What People in City Say */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-700 rounded-full px-6 py-2 mb-4">
              <Heart className="w-5 h-5" />
              <span className="font-medium">Happy Customers</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              What <span className="text-onassist-primary">{cityData.name}</span> Customers Say
            </h2>
            <p className="text-xl text-gray-600">
              Trusted by residents and businesses in {cityData.name}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cityTestimonials.map((testimonial, index) => (
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

      {/* Most Popular Services */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-onassist-primary/10 text-onassist-primary rounded-full px-6 py-2 mb-4">
              <Zap className="w-5 h-5" />
              <span className="font-medium">Most Requested</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Popular Services in <span className="text-onassist-primary">{cityData.name}</span>
            </h2>
            <p className="text-xl text-gray-600">
              Top tech solutions for {cityData.name}, {stateData.abbreviation} residents
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
                    
                    <p className="text-gray-600 mb-6 line-clamp-2">
                      {category.description}
                    </p>
                    
                    <div className="space-y-3 mb-6">
                      {category.services.slice(0, 3).map((service) => (
                        <Link
                          key={service.id}
                          to={`/${country}/${state}/${city}/service/${service.slug}`}
                          className="block text-gray-700 hover:text-onassist-primary transition-colors p-2 rounded hover:bg-gray-50"
                        >
                          • {service.title}
                        </Link>
                      ))}
                    </div>
                    
                    <Link
                      to={`/${country}/${state}/${city}/service/${category.slug}`}
                      className="inline-flex items-center gap-2 text-onassist-primary font-semibold group-hover:gap-3 transition-all"
                    >
                      View All {category.title} Services
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg" className="border-2 border-onassist-primary text-onassist-primary hover:bg-onassist-primary hover:text-white font-semibold px-8 py-4 rounded-full">
              <Link to={`/${country}/${state}/${city}/services`}>
                View All Services in {cityData.name}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Meet City Specialists */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 rounded-full px-6 py-2 mb-4">
              <Award className="w-5 h-5" />
              <span className="font-medium">Local Experts</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Meet {cityData.name} Tech Specialists
            </h2>
            <p className="text-xl text-gray-600">
              Local experts ready to assist you in {cityData.name}, {stateData.abbreviation}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {citySpecialists.map((specialist, index) => (
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
                    <Award className="w-4 h-4" />
                    <span className="text-sm font-medium">Local Tech Expert</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-onassist-primary via-blue-600 to-purple-700 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        <div className="relative container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Need Tech Support in <span className="text-yellow-300">{cityData.name}</span>?
            </h2>
            <p className="text-xl md:text-2xl opacity-90 mb-10 leading-relaxed">
              Our local technicians are ready to help you with any technology issue in {cityData.name}, {stateData.abbreviation}.
            </p>
            
            {/* Enhanced Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-3xl font-bold mb-2">30 Min</div>
                <div className="text-sm opacity-80">Response Time</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-3xl font-bold mb-2">5-Star</div>
                <div className="text-sm opacity-80">Service Rating</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-3xl font-bold mb-2">Local</div>
                <div className="text-sm opacity-80">{cityData.name} Experts</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="bg-white text-onassist-primary hover:bg-gray-100 font-bold px-10 py-5 rounded-full shadow-2xl text-lg">
                <Phone className="w-6 h-6 mr-3" />
                Call Now: {siteConfig.contactPhone}
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-onassist-primary font-bold px-10 py-5 rounded-full backdrop-blur-sm text-lg">
                <Clock className="w-6 h-6 mr-3" />
                Book Online
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CityServicePage;
