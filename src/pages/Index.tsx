
import React from 'react';
import Layout from '@/components/layout/Layout';
import Hero from '@/components/home/Hero';
import FeatureServices from '@/components/home/FeatureServices';
import HowItWorks from '@/components/home/HowItWorks';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import MeetOurTechnicians from '@/components/home/MeetOurTechnicians';
import Testimonials from '@/components/home/Testimonials';
import CTASection from '@/components/home/CTASection';
import { Helmet } from 'react-helmet-async';
import { siteConfig } from '@/config/site';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Award, Clock, Users, Star, CheckCircle, Zap, Heart } from 'lucide-react';

const Index = () => {
  const experts = [
    {
      name: 'Sarah Johnson',
      role: 'Senior Tech Specialist',
      experience: '8+ years',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b812b6aa?w=300&h=300&fit=crop&crop=face',
      specialties: ['Computer Repair', 'Network Setup']
    },
    {
      name: 'Michael Chen',
      role: 'Smart Home Expert',
      experience: '6+ years', 
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
      specialties: ['Smart Home', 'IoT Devices']
    },
    {
      name: 'Emily Rodriguez',
      role: 'Mobile Device Specialist',
      experience: '5+ years',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&crop=face',
      specialties: ['Phone Repair', 'Data Recovery']
    },
    {
      name: 'David Wilson',
      role: 'Network Administrator',
      experience: '10+ years',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
      specialties: ['WiFi Setup', 'Security']
    }
  ];

  const certifications = [
    {
      title: 'CompTIA A+ Certified',
      description: 'Industry-standard certification for computer technicians',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=150&fit=crop',
      icon: Award
    },
    {
      title: 'Microsoft Certified',
      description: 'Expertise in Microsoft technologies and solutions',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=200&h=150&fit=crop',
      icon: Shield
    },
    {
      title: 'Cisco Network Associate',
      description: 'Professional networking and security credentials',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=200&h=150&fit=crop',
      icon: CheckCircle
    },
    {
      title: 'Apple Certified Technician',
      description: 'Authorized Apple device repair and support',
      image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=200&h=150&fit=crop',
      icon: Zap
    }
  ];

  const customerTestimonials = [
    {
      name: 'Jennifer Martinez',
      location: 'Los Angeles, CA',
      rating: 5,
      text: 'Outstanding service! They fixed my computer issues quickly and professionally.',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      service: 'Computer Repair'
    },
    {
      name: 'Robert Kim',
      location: 'New York, NY', 
      rating: 5,
      text: 'The smart home setup was flawless. Very knowledgeable technicians!',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
      service: 'Smart Home Setup'
    },
    {
      name: 'Lisa Thompson',
      location: 'Chicago, IL',
      rating: 5,
      text: 'Fast, reliable, and affordable. Will definitely use their services again.',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
      service: 'Phone Repair'
    }
  ];

  return (
    <Layout>
      <Helmet>
        <title>{siteConfig.name} - Professional Tech Support Services</title>
        <meta name="description" content="Get expert tech support for computers, smart homes, phones, and more. Professional technicians available nationwide with same-day service." />
        <meta name="keywords" content="tech support, computer repair, smart home setup, phone repair, IT services" />
      </Helmet>
      
      <Hero />
      <FeatureServices />
      <HowItWorks />
      <WhyChooseUs />

      {/* Meet Our Experts Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 rounded-full px-6 py-2 mb-4">
              <Users className="w-5 h-5" />
              <span className="font-medium">Our Team</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Meet Our <span className="text-onassist-primary">Expert Technicians</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our certified professionals bring years of experience and expertise to solve your tech challenges
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {experts.map((expert, index) => (
              <Card key={index} className="group shadow-xl hover:shadow-2xl transition-all duration-300 border-0 bg-white hover:-translate-y-2">
                <CardContent className="p-8 text-center">
                  <div className="relative mb-6">
                    <img 
                      src={expert.image} 
                      alt={expert.name}
                      className="w-24 h-24 rounded-full mx-auto object-cover shadow-lg group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-onassist-primary text-white rounded-full p-2">
                      <CheckCircle className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="font-bold text-xl mb-2">{expert.name}</h3>
                  <p className="text-onassist-primary font-semibold mb-1">{expert.role}</p>
                  <p className="text-gray-600 mb-4">{expert.experience}</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {expert.specialties.map((specialty, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
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

      {/* Trusted & Certified Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 rounded-full px-6 py-2 mb-4">
              <Shield className="w-5 h-5" />
              <span className="font-medium">Trusted & Certified</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-onassist-primary">Professional</span> Certifications
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our technicians hold industry-leading certifications ensuring top-quality service
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {certifications.map((cert, index) => (
              <Card key={index} className="group shadow-xl hover:shadow-2xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-gray-50 hover:-translate-y-2">
                <CardContent className="p-8 text-center">
                  <div className="relative mb-6">
                    <img 
                      src={cert.image} 
                      alt={cert.title}
                      className="w-full h-32 object-cover rounded-lg shadow-lg group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-white rounded-full p-3 shadow-lg">
                      <cert.icon className="w-6 h-6 text-onassist-primary" />
                    </div>
                  </div>
                  <h3 className="font-bold text-lg mb-3 mt-4">{cert.title}</h3>
                  <p className="text-gray-600 text-sm">{cert.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What Our Customers Say Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-700 rounded-full px-6 py-2 mb-4">
              <Heart className="w-5 h-5" />
              <span className="font-medium">Customer Love</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              What Our <span className="text-onassist-primary">Customers Say</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real feedback from satisfied customers across the nation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {customerTestimonials.map((testimonial, index) => (
              <Card key={index} className="group shadow-xl hover:shadow-2xl transition-all duration-300 border-0 bg-white hover:-translate-y-2">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover shadow-lg mr-4"
                    />
                    <div>
                      <h4 className="font-bold text-lg">{testimonial.name}</h4>
                      <p className="text-gray-600">{testimonial.location}</p>
                      <div className="flex gap-1 mt-1">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <blockquote className="text-gray-700 italic mb-4">
                    "{testimonial.text}"
                  </blockquote>
                  <Badge className="bg-onassist-primary/10 text-onassist-primary">
                    {testimonial.service}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <MeetOurTechnicians />
      <Testimonials />
      <CTASection />
    </Layout>
  );
};

export default Index;
