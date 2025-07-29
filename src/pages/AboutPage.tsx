
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Users, Shield, Award, Clock, Star, ArrowRight } from 'lucide-react';
import { useDynamicSiteConfig } from '@/hooks/useDynamicSiteConfig';

const AboutPage = () => {
  const { config } = useDynamicSiteConfig();

  const values = [
    {
      title: "Excellence",
      description: "We strive for perfection in every service we provide",
      icon: <Award className="w-6 h-6 text-yellow-500" />
    },
    {
      title: "Reliability",
      description: "Count on us to be there when you need us most",
      icon: <Shield className="w-6 h-6 text-blue-500" />
    },
    {
      title: "Innovation",
      description: "We stay ahead of technology trends to serve you better",
      icon: <Star className="w-6 h-6 text-purple-500" />
    },
    {
      title: "Customer First",
      description: "Your satisfaction is our top priority",
      icon: <Users className="w-6 h-6 text-green-500" />
    }
  ];

  const team = [
    {
      name: "John Smith",
      role: "CEO & Founder",
      description: "20+ years in tech industry",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
    },
    {
      name: "Sarah Chen",
      role: "CTO",
      description: "Expert in network systems",
      image: "https://images.unsplash.com/photo-1494790108755-2616b9ef6524?w=400&h=400&fit=crop&crop=face"
    },
    {
      name: "Mike Johnson",
      role: "Head of Operations",
      description: "Operations excellence specialist",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"
    },
    {
      name: "Emily Davis",
      role: "Customer Success Manager",
      description: "Dedicated to customer satisfaction",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face"
    }
  ];

  const stats = [
    { number: config.happy_customers_stat, label: "Happy Customers" },
    { number: config.certified_experts_stat, label: "Certified Experts" },
    { number: config.cities_covered_stat, label: "Cities Covered" },
    { number: config.customer_satisfaction_stat, label: "Customer Rating" }
  ];

  const milestones = [
    {
      year: "2020",
      title: "Company Founded",
      description: "Started with a vision to revolutionize tech support"
    },
    {
      year: "2021",
      title: "First 1000 Customers",
      description: "Reached our first major milestone"
    },
    {
      year: "2022",
      title: "Nationwide Expansion",
      description: "Extended services to 50+ cities"
    },
    {
      year: "2023",
      title: "Industry Recognition",
      description: "Awarded 'Best Tech Support Service'"
    },
    {
      year: "2024",
      title: "AI Integration",
      description: "Launched AI-powered diagnostic tools"
    }
  ];

  return (
    <>
      <Helmet>
        <title>About Us - {config.name}</title>
        <meta name="description" content={`Learn about ${config.name}, our mission, values, and the team behind our professional tech support services.`} />
      </Helmet>
      
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-onassist-primary to-blue-600 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                About {config.name}
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                {config.description}
              </p>
              <Button size="lg" className="bg-white text-onassist-primary hover:bg-gray-100 text-lg px-8 py-3">
                Learn More
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-onassist-primary mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                Our Mission
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                At {config.name}, we believe technology should work seamlessly for everyone. 
                Our mission is to provide exceptional tech support services that are accessible, 
                reliable, and tailored to your needs.
              </p>
              <div className="grid md:grid-cols-2 gap-8 text-left">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">What We Do</h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      On-site computer repair and maintenance
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      Network setup and troubleshooting
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      Software installation and updates
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                      Data recovery and backup solutions
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">How We're Different</h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start">
                      <Clock className="w-5 h-5 text-blue-500 mr-3 mt-0.5" />
                      {config.response_time_stat} average response time
                    </li>
                    <li className="flex items-start">
                      <Shield className="w-5 h-5 text-blue-500 mr-3 mt-0.5" />
                      {config.service_warranty_days} days service warranty
                    </li>
                    <li className="flex items-start">
                      <Star className="w-5 h-5 text-blue-500 mr-3 mt-0.5" />
                      {config.satisfaction_guarantee_percent}% satisfaction guarantee
                    </li>
                    <li className="flex items-start">
                      <Users className="w-5 h-5 text-blue-500 mr-3 mt-0.5" />
                      Certified and background-checked technicians
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our Values
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                These core values guide everything we do at {config.name}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-center mb-4">
                      {value.icon}
                    </div>
                    <CardTitle className="text-xl">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600">
                      {value.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Meet Our Team
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                The experts behind {config.name}'s exceptional service
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-center mb-4">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-20 h-20 rounded-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <CardTitle className="text-xl">{member.name}</CardTitle>
                    <CardDescription className="text-onassist-primary font-semibold">
                      {member.role}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{member.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our Journey
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Key milestones in our growth story
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 w-20 text-center">
                      <Badge className="bg-onassist-primary text-white text-sm px-3 py-1">
                        {milestone.year}
                      </Badge>
                    </div>
                    <div className="ml-6 flex-grow">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-onassist-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Experience {config.name}?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of satisfied customers who trust us with their tech needs
            </p>
            <Button size="lg" className="bg-white text-onassist-primary hover:bg-gray-100 text-lg px-8 py-3">
              Get Started Today
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </section>
      </div>
    </>
  );
};

export default AboutPage;
