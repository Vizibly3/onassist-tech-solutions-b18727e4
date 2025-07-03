import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCart } from '@/contexts/CartContext';
import { useServiceBySlug } from '@/hooks/useServices';
import { Helmet } from 'react-helmet-async';
import { siteConfig } from '@/config/site';
import {
  Clock,
  Star,
  Shield,
  CheckCircle,
  ArrowLeft,
  Wrench,
  Monitor,
  Home,
  Smartphone,
  Bolt,
  Wifi,
  Zap,
  Users,
  Award,
  Phone,
  MapPin,
  Navigation,
  Building,
  Cloud,
  Sun,
  CloudRain,
  Wind,
  Thermometer,
  Droplets,
  EyeIcon,
  Gauge,
  TrendingUp,
  Calendar,
  MessageCircle,
  ThumbsUp,
  Camera,
  VideoIcon,
  HeadphonesIcon,
  Laptop,
  HardDrive,
  Router,
  Settings,
  FileText,
  BrainCircuit,
  ChevronRight,
  Target,
  Globe,
} from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const ServiceDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { data: service, isLoading, error } = useServiceBySlug(slug || '');
  const [zipCode, setZipCode] = useState('');

  const handleAddToCart = () => {
    if (service && zipCode.trim()) {
      addToCart(service);
    }
  };

  const handleGoBack = () => {
    navigate('/services');
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
            <p className="text-gray-600 mb-6">
              The service you're looking for doesn't exist.
            </p>
            <Button onClick={handleGoBack} variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Services
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

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
        {/* Breadcrumb */}
        <div className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-40">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex items-center space-x-2 text-sm">
              <a href="/" className="text-gray-600 hover:text-onassist-primary transition-colors">
                <Home className="w-4 h-4" />
              </a>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <a href="/services" className="text-gray-600 hover:text-onassist-primary transition-colors">
                Services
              </a>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="text-onassist-primary font-medium">{service.title}</span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <div className="py-12 bg-gradient-to-r from-onassist-primary via-blue-600 to-purple-700 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            ></div>
          </div>

          {/* Floating Elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-32 h-32 bg-purple-300/20 rounded-full blur-2xl animate-pulse delay-1000"></div>

          <div className="container mx-auto px-4 relative">
            <Button
              onClick={handleGoBack}
              variant="ghost"
              className="text-white hover:bg-white/20 mb-8 backdrop-blur-md border border-white/20 transition-all duration-300 hover:scale-105"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Services
            </Button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
                    <Monitor className="w-10 h-10" />
                  </div>
                  <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                    {service.title}
                  </h1>
                  {service.popular && (
                    <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 px-4 py-2 animate-pulse">
                      <Star className="w-4 h-4 mr-1 fill-current" />
                      Popular
                    </Badge>
                  )}
                </div>
                <p className="text-xl opacity-95 mb-8 leading-relaxed">
                  {service.description}
                </p>

                <div className="flex items-center gap-8 text-lg">
                  <div className="flex items-center gap-3 bg-white/20 px-4 py-3 rounded-xl backdrop-blur-md">
                    <Clock className="w-6 h-6" />
                    <span className="font-semibold">{service.duration}</span>
                  </div>
                  <div className="text-4xl font-bold bg-gradient-to-r from-yellow-300 to-yellow-100 bg-clip-text text-transparent">
                    ${service.price}
                  </div>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
                <img
                  src={service.image_url}
                  alt={service.title}
                  className="relative w-full h-96 object-cover rounded-2xl shadow-2xl transform group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Service Details */}
            <div className="lg:col-span-2 space-y-8">
              <Card className="shadow-2xl border-0 overflow-hidden bg-white">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                      <Monitor className="w-8 h-8" />
                    </div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                      Service Overview
                    </h2>
                  </div>

                  <div className="prose prose-lg max-w-none">
                    <p className="text-gray-700 leading-relaxed mb-8 text-lg">
                      {service.description}
                    </p>

                    <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-8 rounded-2xl border border-blue-200/50 mb-8 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
                      <h3 className="text-2xl font-bold mb-6 text-blue-800 flex items-center gap-3">
                        <Building className="w-8 h-8" />
                        Why Choose Our Service?
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center group">
                          <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                            <Users className="w-10 h-10 text-white" />
                          </div>
                          <h4 className="font-bold mb-3 text-lg">Expert Technicians</h4>
                          <p className="text-gray-600">
                            Certified professionals with years of experience in tech support
                          </p>
                        </div>
                        <div className="text-center group">
                          <div className="bg-gradient-to-br from-purple-500 to-purple-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                            <Zap className="w-10 h-10 text-white" />
                          </div>
                          <h4 className="font-bold mb-3 text-lg">Fast Response</h4>
                          <p className="text-gray-600">
                            Quick turnaround times to get your technology working again
                          </p>
                        </div>
                        <div className="text-center group">
                          <div className="bg-gradient-to-br from-green-500 to-green-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                            <Award className="w-10 h-10 text-white" />
                          </div>
                          <h4 className="font-bold mb-3 text-lg">Guaranteed Quality</h4>
                          <p className="text-gray-600">
                            100% satisfaction guarantee with warranty on all services
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Service Features */}
              <Card className="shadow-2xl border-0 overflow-hidden bg-gradient-to-br from-white to-blue-50">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                      <Settings className="w-8 h-8" />
                    </div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                      What's Included
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      { icon: BrainCircuit, title: 'Expert Diagnosis', desc: 'Comprehensive system analysis' },
                      { icon: Wrench, title: 'Professional Repair', desc: 'Quality parts and workmanship' },
                      { icon: Shield, title: 'Service Warranty', desc: '90-day guarantee on all work' },
                      { icon: FileText, title: 'Detailed Report', desc: 'Complete service documentation' },
                      { icon: Phone, title: 'Follow-up Support', desc: 'Post-service assistance' },
                      { icon: CheckCircle, title: 'Quality Assurance', desc: 'Thorough testing and validation' },
                    ].map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100"
                      >
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <feature.icon className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm">{feature.title}</h4>
                          <p className="text-xs text-gray-600">{feature.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Booking Sidebar */}
            <div className="space-y-6">
              <Card className="shadow-2xl border-0 sticky top-32 bg-white overflow-hidden">
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <div className="text-5xl font-bold bg-gradient-to-r from-onassist-primary to-blue-600 bg-clip-text text-transparent mb-3">
                      ${service.price}
                    </div>
                    <div className="flex items-center justify-center gap-2 text-gray-600 bg-gray-50 rounded-lg px-4 py-2">
                      <Clock className="w-5 h-5" />
                      <span className="font-medium">{service.duration}</span>
                    </div>
                  </div>

                  <Separator className="my-8" />

                  <div className="space-y-6 mb-8">
                    <div>
                      <Label htmlFor="zipCode" className="text-lg font-semibold mb-3 block">
                        Enter Your ZIP Code
                      </Label>
                      <Input
                        id="zipCode"
                        type="text"
                        placeholder="e.g., 10001"
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                        className="text-lg py-6 border-2 border-gray-200 focus:border-onassist-primary rounded-xl"
                      />
                      <p className="text-sm text-gray-600 mt-2">
                        We'll send a technician to your location
                      </p>
                    </div>
                  </div>

                  <Button
                    onClick={handleAddToCart}
                    disabled={!zipCode.trim()}
                    className="w-full bg-gradient-to-r from-onassist-primary to-onassist-dark hover:from-onassist-dark hover:to-onassist-primary text-xl py-8 mb-6 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    size="lg"
                  >
                    <Calendar className="w-6 h-6 mr-3" />
                    Book Service Now
                  </Button>

                  <div className="space-y-4">
                    <div className="flex items-center justify-center gap-3 text-gray-700 bg-green-50 p-3 rounded-lg border border-green-200">
                      <Shield className="w-5 h-5 text-green-600" />
                      <span className="font-medium">Same-day service available</span>
                    </div>
                    <div className="flex items-center justify-center gap-3 text-gray-700 bg-blue-50 p-3 rounded-lg border border-blue-200">
                      <CheckCircle className="w-5 h-5 text-blue-600" />
                      <span className="font-medium">No hidden fees</span>
                    </div>
                    <div className="flex items-center justify-center gap-3 text-gray-700 bg-purple-50 p-3 rounded-lg border border-purple-200">
                      <Award className="w-5 h-5 text-purple-600" />
                      <span className="font-medium">Satisfaction guaranteed</span>
                    </div>
                  </div>

                  <Separator className="my-8" />

                  <div className="text-center space-y-4">
                    <h3 className="font-semibold text-lg flex items-center justify-center gap-2">
                      <Phone className="w-5 h-5 text-onassist-primary" />
                      Need Help?
                    </h3>
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <p className="text-sm text-gray-600 mb-2">Call our support team</p>
                      <p className="font-bold text-lg text-onassist-primary">1-800-TECH-NOW</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats Card */}
              <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-gray-50">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    Service Stats
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                      <div className="text-2xl font-bold text-blue-600">98%</div>
                      <div className="text-xs text-gray-600">Success Rate</div>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                      <div className="text-2xl font-bold text-green-600">24/7</div>
                      <div className="text-xs text-gray-600">Availability</div>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                      <div className="text-2xl font-bold text-purple-600">1000+</div>
                      <div className="text-xs text-gray-600">Happy Clients</div>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                      <div className="text-2xl font-bold text-orange-600">2hrs</div>
                      <div className="text-xs text-gray-600">Avg Response</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Customer Reviews Section */}
        <div className="py-16 bg-gradient-to-r from-gray-50 to-blue-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                What Our Customers Say
              </h2>
              <p className="text-xl text-gray-600">Real reviews from satisfied customers</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: 'Sarah M.',
                  rating: 5,
                  review: 'Excellent service! The technician arrived on time and fixed my computer quickly. Very professional and knowledgeable.',
                  service: service.title,
                },
                {
                  name: 'Mike R.',
                  rating: 5,
                  review: 'Great experience with their team. They resolved our network issues efficiently and provided helpful tips for future maintenance.',
                  service: service.title,
                },
                {
                  name: 'Jennifer L.',
                  rating: 5,
                  review: 'Highly recommend! Fair pricing, excellent communication, and they really know their stuff. Will definitely use again.',
                  service: service.title,
                },
              ].map((review, index) => (
                <Card key={index} className="shadow-xl border-0 bg-white hover:shadow-2xl transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-4 italic">"{review.review}"</p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                        {review.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold">{review.name}</div>
                        <div className="text-sm text-gray-600">{review.service}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-600">Common questions about our {service.title} service</p>
            </div>

            <div className="max-w-4xl mx-auto space-y-6">
              {[
                {
                  question: 'How quickly can you respond to service requests?',
                  answer: 'We typically respond within 2-4 hours for same-day service requests. Emergency services may be available with faster response times.',
                },
                {
                  question: 'Do you offer any warranty on your services?',
                  answer: 'Yes, all our services come with a 90-day warranty. If you experience any issues related to our work, we\'ll return to fix it at no additional cost.',
                },
                {
                  question: 'What areas do you serve?',
                  answer: 'We provide services nationwide. Simply enter your ZIP code when booking to confirm availability in your area.',
                },
                {
                  question: 'What payment methods do you accept?',
                  answer: 'We accept all major credit cards, cash, and digital payment methods. Payment is due upon completion of service unless other arrangements are made.',
                },
              ].map((faq, index) => (
                <Card key={index} className="shadow-lg border-0 hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <MessageCircle className="w-5 h-5 text-onassist-primary" />
                      {faq.question}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-16 bg-gradient-to-r from-onassist-primary via-blue-600 to-purple-700 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            ></div>
          </div>

          <div className="container mx-auto px-4 text-center relative">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust us with their tech needs. 
              Book your service today and experience the difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={handleAddToCart}
                disabled={!zipCode.trim()}
                size="lg"
                className="bg-white text-onassist-primary hover:bg-gray-100 text-lg px-8 py-6 rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 disabled:opacity-50"
              >
                <Calendar className="w-6 h-6 mr-3" />
                Book {service.title} Now
              </Button>
              <div className="flex items-center gap-2 text-lg">
                <Phone className="w-5 h-5" />
                <span>or call 1-800-TECH-NOW</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ServiceDetailPage;
