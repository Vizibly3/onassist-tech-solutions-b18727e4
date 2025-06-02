
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Helmet } from 'react-helmet-async';
import { siteConfig } from '@/config/site';
import { useServiceCategories, useCategoriesWithServices } from '@/hooks/useServices';
import { getLocationBreadcrumb, usStates } from '@/data/locations';
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
  Heart
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

  // Get popular services (first 5 categories)
  const popularCategories = categoriesWithServices?.slice(0, 5) || [];

  // Sample testimonials specific to state
  const stateTestimonials = [
    {
      name: `John D.`,
      location: `${stateData.name}`,
      rating: 5,
      text: `Excellent tech support service in ${stateData.name}. Professional and reliable team that solved my computer issues quickly.`
    },
    {
      name: `Sarah M.`,
      location: `${stateData.name}`,
      rating: 5,
      text: `Best IT support I've found in ${stateData.name}. They were able to set up my smart home system perfectly.`
    },
    {
      name: `Mike R.`,
      location: `${stateData.name}`,
      rating: 5,
      text: `Outstanding service throughout ${stateData.name}. Quick response time and very knowledgeable technicians.`
    }
  ];

  // Sample specialists
  const stateSpecialists = [
    {
      name: `David ${stateData.abbreviation}`,
      specialty: 'Computer Repair Specialist',
      experience: '8+ years',
      location: `${stateData.name}`,
      image: '/placeholder.svg'
    },
    {
      name: `Lisa ${stateData.abbreviation}`,
      specialty: 'Smart Home Expert',
      experience: '6+ years',
      location: `${stateData.name}`,
      image: '/placeholder.svg'
    },
    {
      name: `Carlos ${stateData.abbreviation}`,
      specialty: 'Network Specialist',
      experience: '10+ years',
      location: `${stateData.name}`,
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
        <title>Best Tech Support Services in {stateData.name} | {siteConfig.name}</title>
        <meta name="description" content={`Professional tech support services throughout ${stateData.name}. Expert technicians serving all cities in ${stateData.abbreviation} with guaranteed satisfaction.`} />
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

      {/* Hero Section - Modern Design */}
      <div className="relative bg-gradient-to-br from-onassist-primary via-blue-600 to-indigo-800 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M30 30c0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12 12-5.373 12-12z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-white/5 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-white/10 rounded-full animate-pulse delay-500"></div>
        
        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-5xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mb-8">
              <MapPin className="w-5 h-5" />
              <span className="font-medium">Serving {stateData.name}</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                Tech Support Services
              </span>
              <br />
              <span className="text-yellow-300">in {stateData.name}</span>
            </h1>
            
            <p className="text-xl md:text-2xl opacity-90 mb-10 leading-relaxed max-w-3xl mx-auto">
              Professional technology support throughout <strong>{stateData.name} ({stateData.abbreviation})</strong>. 
              Our certified technicians provide reliable solutions across all cities in {stateData.name}.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-3xl font-bold mb-2">500+</div>
                <div className="text-sm opacity-80">Happy Customers in {stateData.abbreviation}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-3xl font-bold mb-2">24/7</div>
                <div className="text-sm opacity-80">Support Available</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-3xl font-bold mb-2">98%</div>
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
                <MapPin className="w-5 h-5 mr-2" />
                Find Local Service
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Local Services Section - Modern Card Design */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-onassist-primary/10 text-onassist-primary rounded-full px-6 py-2 mb-4">
              <Building className="w-5 h-5" />
              <span className="font-medium">Local Expertise</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Local Tech Support Services in <span className="text-onassist-primary">{stateData.name}</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide comprehensive technology support services to homes and businesses throughout {stateData.name}. 
              Our local technicians understand the unique needs of {stateData.abbreviation} residents.
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
                  Expert computer and laptop repair services throughout {stateData.name}
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
                  Professional smart home installation and automation in {stateData.abbreviation}
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
                  WiFi setup and network troubleshooting for {stateData.name} homes and offices
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What People in State Say - Enhanced Design */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-700 rounded-full px-6 py-2 mb-4">
              <Heart className="w-5 h-5" />
              <span className="font-medium">Customer Love</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              What <span className="text-onassist-primary">{stateData.name}</span> People Say
            </h2>
            <p className="text-xl text-gray-600">
              Trusted by residents across {stateData.name}
            </p>
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

      {/* Most Popular Services - Enhanced */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-onassist-primary/10 text-onassist-primary rounded-full px-6 py-2 mb-4">
              <Zap className="w-5 h-5" />
              <span className="font-medium">Most Popular</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Top Services in <span className="text-onassist-primary">{stateData.name}</span>
            </h2>
            <p className="text-xl text-gray-600">
              Top-rated tech support services for {stateData.abbreviation} residents
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

          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg" className="border-2 border-onassist-primary text-onassist-primary hover:bg-onassist-primary hover:text-white font-semibold px-8 py-4 rounded-full">
              <Link to="/services">
                View All Service Categories
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Meet State Specialists - Enhanced */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 rounded-full px-6 py-2 mb-4">
              <Award className="w-5 h-5" />
              <span className="font-medium">Expert Team</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Meet Some <span className="text-onassist-primary">{stateData.name}</span> Specialists
            </h2>
            <p className="text-xl text-gray-600">
              Expert technicians serving communities across {stateData.abbreviation}
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
                    <Award className="w-4 h-4" />
                    <span className="text-sm font-medium">Certified Professional</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Cities in State - Modern Grid */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 rounded-full px-6 py-2 mb-4">
              <MapPin className="w-5 h-5" />
              <span className="font-medium">Service Areas</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Cities We Serve in <span className="text-onassist-primary">{stateData.name}</span>
            </h2>
            <p className="text-xl text-gray-600">
              Professional tech support services across {stateData.abbreviation}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {stateData.cities.map((city) => (
              <Card key={city.slug} className="group shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-white hover:-translate-y-1">
                <CardContent className="p-6">
                  <Link
                    to={`/${country}/${state}/${city.slug}`}
                    className="block text-center"
                  >
                    <div className="bg-gradient-to-br from-onassist-primary to-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <MapPin className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900 group-hover:text-onassist-primary transition-colors mb-2">
                      {city.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Tech Support Available
                    </p>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Enhanced */}
      <section className="py-20 bg-gradient-to-br from-onassist-primary via-blue-600 to-indigo-800 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M30 30c0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12 12-5.373 12-12z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        <div className="relative container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Get Tech Support in <span className="text-yellow-300">{stateData.name}</span>?
            </h2>
            <p className="text-xl md:text-2xl opacity-90 mb-10 leading-relaxed">
              Join thousands of satisfied customers across <strong>{stateData.abbreviation}</strong> who trust us with their technology needs.
            </p>
            
            {/* Enhanced Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-3xl font-bold mb-2">Same Day</div>
                <div className="text-sm opacity-80">Service Available</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-3xl font-bold mb-2">100%</div>
                <div className="text-sm opacity-80">Satisfaction Guarantee</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-3xl font-bold mb-2">Licensed</div>
                <div className="text-sm opacity-80">& Insured Technicians</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="bg-white text-onassist-primary hover:bg-gray-100 font-bold px-10 py-5 rounded-full shadow-2xl text-lg">
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
