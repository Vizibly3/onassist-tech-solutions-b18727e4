
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
  Shield
} from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { slugify } from '@/utils/slugify';

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
      <div className="bg-gray-50 border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-onassist-primary">Home</Link>
            <span>/</span>
            <span>{countryData.name}</span>
            <span>/</span>
            <span className="font-medium text-onassist-primary">{stateData.name}</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-onassist-primary via-blue-600 to-onassist-dark text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Tech Support Services in {stateData.name}
            </h1>
            <p className="text-xl opacity-90 mb-8 leading-relaxed">
              Professional technology support throughout {stateData.name} ({stateData.abbreviation}). 
              Our certified technicians provide reliable computer repair, smart home setup, and IT support services across all cities in {stateData.name}.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-onassist-primary hover:bg-gray-100">
                <Phone className="w-5 h-5 mr-2" />
                Call {siteConfig.contactPhone}
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-onassist-primary">
                <MapPin className="w-5 h-5 mr-2" />
                Find Local Service
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Local Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Local Tech Support Services in {stateData.name}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We provide comprehensive technology support services to homes and businesses throughout {stateData.name}. 
              Our local technicians understand the unique needs of {stateData.abbreviation} residents.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Monitor className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Computer Repair</h3>
                <p className="text-gray-600 text-sm">
                  Expert computer and laptop repair services throughout {stateData.name}
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Home className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Smart Home Setup</h3>
                <p className="text-gray-600 text-sm">
                  Professional smart home installation and automation in {stateData.abbreviation}
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Wifi className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Network Support</h3>
                <p className="text-gray-600 text-sm">
                  WiFi setup and network troubleshooting for {stateData.name} homes and offices
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What People in State Say */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What {stateData.name} People Say
            </h2>
            <p className="text-gray-600">
              Trusted by residents across {stateData.name}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stateTestimonials.map((testimonial, index) => (
              <Card key={index} className="shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.location}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Most Popular Services */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Most Popular Services in {stateData.name}
            </h2>
            <p className="text-gray-600">
              Top-rated tech support services for {stateData.abbreviation} residents
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularCategories.map((category) => {
              const CategoryIcon = getServiceIcon(category.title);
              return (
                <Card key={category.id} className="shadow-lg hover:shadow-xl transition-shadow group">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-onassist-primary/10 p-2 rounded-lg">
                        <CategoryIcon className="w-6 h-6 text-onassist-primary" />
                      </div>
                      <h3 className="font-semibold text-lg">{category.title}</h3>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {category.description}
                    </p>
                    
                    <div className="space-y-2 mb-4">
                      {category.services.slice(0, 3).map((service) => (
                        <Link
                          key={service.id}
                          to={`/${country}/${state}/service/${service.slug}`}
                          className="block text-sm text-gray-700 hover:text-onassist-primary transition-colors"
                        >
                          • {service.title}
                        </Link>
                      ))}
                    </div>
                    
                    <Link
                      to={`/services/${category.slug}`}
                      className="inline-flex items-center gap-2 text-onassist-primary font-medium text-sm group-hover:gap-3 transition-all"
                    >
                      View All Services
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center mt-8">
            <Button asChild variant="outline" size="lg">
              <Link to="/services">
                View All Service Categories
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Meet State Specialists */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Meet Some {stateData.name} Specialists
            </h2>
            <p className="text-gray-600">
              Expert technicians serving communities across {stateData.abbreviation}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stateSpecialists.map((specialist, index) => (
              <Card key={index} className="shadow-lg text-center">
                <CardContent className="p-6">
                  <img
                    src={specialist.image}
                    alt={specialist.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="font-semibold text-lg mb-1">{specialist.name}</h3>
                  <p className="text-onassist-primary font-medium mb-1">{specialist.specialty}</p>
                  <p className="text-gray-600 text-sm mb-2">{specialist.experience}</p>
                  <div className="flex items-center justify-center gap-1 text-sm text-gray-500">
                    <MapPin className="w-4 h-4" />
                    <span>{specialist.location}</span>
                  </div>
                  <div className="flex items-center justify-center gap-1 mt-3">
                    <Award className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm font-medium">Certified Professional</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Cities in State */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Cities We Serve in {stateData.name}
            </h2>
            <p className="text-gray-600">
              Professional tech support services across {stateData.abbreviation}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {stateData.cities.map((city) => (
              <Card key={city.slug} className="shadow-md hover:shadow-lg transition-shadow group">
                <CardContent className="p-4">
                  <Link
                    to={`/${country}/${state}/${city.slug}`}
                    className="block text-center"
                  >
                    <div className="bg-onassist-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-onassist-primary/20 transition-colors">
                      <MapPin className="w-6 h-6 text-onassist-primary" />
                    </div>
                    <h3 className="font-medium text-gray-900 group-hover:text-onassist-primary transition-colors">
                      {city.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      Tech Support
                    </p>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-onassist-primary to-onassist-dark text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Tech Support in {stateData.name}?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers across {stateData.abbreviation} who trust us with their technology needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-onassist-primary hover:bg-gray-100">
              <Phone className="w-5 h-5 mr-2" />
              Call Now: {siteConfig.contactPhone}
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-onassist-primary">
              <Clock className="w-5 h-5 mr-2" />
              Schedule Service
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default StateServicePage;
