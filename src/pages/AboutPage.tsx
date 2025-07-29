
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useDynamicSiteConfig } from '@/hooks/useDynamicSiteConfig';
import { 
  Users, 
  Award, 
  Shield, 
  Clock, 
  Phone, 
  Mail, 
  MapPin,
  CheckCircle,
  Star,
  Target,
  Heart,
  Zap
} from 'lucide-react';

const AboutPage = () => {
  const { config } = useDynamicSiteConfig();

  return (
    <Layout>
      <Helmet>
        <title>About Us | {config.name}</title>
        <meta name="description" content={`Learn about ${config.name} - your trusted partner for professional tech support services. Meet our team and discover our mission.`} />
      </Helmet>
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-onassist-primary via-blue-600 to-purple-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: "url('data:image/svg+xml;utf8,<svg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"><g fill=\"%23ffffff\" fill-opacity=\"0.3\"><circle cx=\"30\" cy=\"30\" r=\"8\"/><circle cx=\"10\" cy=\"10\" r=\"4\"/><circle cx=\"50\" cy=\"50\" r=\"6\"/></g></svg>')"
          }}></div>
        </div>

        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-white/20 text-white mb-6 px-6 py-2 backdrop-blur-sm">
              <Users className="w-4 h-4 mr-2" />
              About {config.name}
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Your Trusted <span className="text-yellow-300">Tech Partner</span>
            </h1>
            <p className="text-2xl opacity-90 mb-8 leading-relaxed">
              We're passionate about making technology work for you. Our mission is to provide exceptional tech support that keeps you connected and productive.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="bg-white text-onassist-primary hover:bg-gray-100 font-bold px-8 py-4 rounded-full shadow-2xl">
                <Phone className="w-5 h-5 mr-2" />
                Get Support Now
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-onassist-primary font-bold px-8 py-4 rounded-full backdrop-blur-sm">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: config.happy_customers_stat || "10K+", label: "Happy Customers" },
              { number: config.response_time_stat || "15 Min", label: "Response Time" },
              { number: config.rating_stat || "4.9/5", label: "Customer Rating" },
              { number: config.satisfaction_stat || "100%", label: "Satisfaction Rate" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-onassist-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6">
                  Our <span className="text-onassist-primary">Story</span>
                </h2>
                <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                  Founded with a simple mission: to make technology accessible and stress-free for everyone. {config.name} was born from the frustration of dealing with complex tech issues without proper support.
                </p>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Today, we're proud to be a leading provider of tech support services, helping thousands of customers solve their technology challenges with speed, expertise, and care.
                </p>
                
                <div className="space-y-4">
                  {[
                    "Expert technicians available 24/7",
                    "Personalized support for every customer",
                    "Transparent pricing with no hidden fees",
                    "100% satisfaction guarantee"
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="bg-gradient-to-br from-onassist-primary to-blue-600 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-gradient-to-br from-onassist-primary to-blue-600 rounded-2xl p-8 text-white">
                  <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                  <p className="text-lg opacity-90 mb-6">
                    To empower individuals and businesses by providing exceptional technology support that's accessible, reliable, and affordable.
                  </p>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <Target className="w-8 h-8 mx-auto mb-2" />
                      <div className="text-sm">Excellence</div>
                    </div>
                    <div>
                      <Heart className="w-8 h-8 mx-auto mb-2" />
                      <div className="text-sm">Care</div>
                    </div>
                    <div>
                      <Zap className="w-8 h-8 mx-auto mb-2" />
                      <div className="text-sm">Innovation</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              Meet Our <span className="text-onassist-primary">Team</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our certified experts are passionate about technology and dedicated to providing you with the best support experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "John Smith",
                role: "Chief Technology Officer",
                experience: "15+ years",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
                specialties: ["Network Security", "Cloud Solutions", "System Architecture"]
              },
              {
                name: "Sarah Chen",
                role: "Lead Support Engineer",
                experience: "12+ years",
                image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
                specialties: ["Hardware Repair", "Software Troubleshooting", "Data Recovery"]
              },
              {
                name: "Mike Rodriguez",
                role: "Senior Technician",
                experience: "10+ years",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
                specialties: ["Mobile Devices", "Smart Home Setup", "Network Configuration"]
              },
              {
                name: "Emily Johnson",
                role: "Customer Success Manager",
                experience: "8+ years",
                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
                specialties: ["Customer Relations", "Training", "Quality Assurance"]
              },
              {
                name: "David Kim",
                role: "Security Specialist",
                experience: "14+ years",
                image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face",
                specialties: ["Cybersecurity", "Virus Removal", "Privacy Protection"]
              },
              {
                name: "Lisa Martinez",
                role: "Business Solutions Expert",
                experience: "11+ years",
                image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
                specialties: ["Business IT", "Server Management", "Remote Support"]
              }
            ].map((member, index) => (
              <Card key={index} className="shadow-lg hover:shadow-2xl transition-all duration-300 border-0 bg-white hover:-translate-y-2">
                <CardContent className="p-8 text-center">
                  <div className="relative mb-6">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-white shadow-lg"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-onassist-primary text-white rounded-full w-8 h-8 flex items-center justify-center">
                      <Award className="w-4 h-4" />
                    </div>
                  </div>
                  
                  <h3 className="font-bold text-xl mb-2">{member.name}</h3>
                  <div className="text-onassist-primary font-medium mb-2">{member.role}</div>
                  <div className="text-gray-500 text-sm mb-4">{member.experience} experience</div>
                  
                  <div className="flex flex-wrap gap-2 justify-center">
                    {member.specialties.map((specialty, specIndex) => (
                      <Badge key={specIndex} variant="secondary" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              Why Choose <span className="text-onassist-primary">{config.name}</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're committed to providing exceptional service that exceeds your expectations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Clock,
                title: "24/7 Availability",
                description: "Round-the-clock support whenever you need assistance"
              },
              {
                icon: Users,
                title: "Expert Team",
                description: "Certified professionals with extensive industry experience"
              },
              {
                icon: Shield,
                title: "Secure & Safe",
                description: "Your data privacy and security are our top priorities"
              },
              {
                icon: Award,
                title: "Guaranteed Results",
                description: "100% satisfaction guarantee on all our services"
              }
            ].map((feature, index) => {
              const FeatureIcon = feature.icon;
              return (
                <Card key={index} className="shadow-lg hover:shadow-2xl transition-all duration-300 border-0 bg-white hover:-translate-y-2">
                  <CardContent className="p-8 text-center">
                    <div className="bg-gradient-to-br from-onassist-primary to-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <FeatureIcon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-bold text-xl mb-4">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-onassist-dark to-blue-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: "url('data:image/svg+xml;utf8,<svg width=\"40\" height=\"40\" viewBox=\"0 0 40 40\" xmlns=\"http://www.w3.org/2000/svg\"><g fill=\"%23ffffff\" fill-opacity=\"0.3\"><path d=\"M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z\"/></g></svg>')"
          }}></div>
        </div>
        
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Get <span className="text-yellow-300">Started?</span>
            </h2>
            <p className="text-xl md:text-2xl opacity-90 mb-12 leading-relaxed">
              Let our expert team solve your tech challenges today.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="flex flex-col items-center">
                <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-4 backdrop-blur-sm">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Call Us</h3>
                <p className="opacity-90">{config.contactPhone}</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-4 backdrop-blur-sm">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Email Us</h3>
                <p className="opacity-90">{config.email}</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-4 backdrop-blur-sm">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Visit Us</h3>
                <p className="opacity-90">{config.address}</p>
              </div>
            </div>
            
            <Button 
              size="lg" 
              className="bg-white text-onassist-primary hover:bg-gray-100 font-bold px-12 py-6 rounded-full shadow-2xl text-xl"
            >
              <Phone className="w-6 h-6 mr-3" />
              Contact Us Today
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;
