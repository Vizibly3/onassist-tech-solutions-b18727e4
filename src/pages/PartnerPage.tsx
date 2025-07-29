
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Users, Star, Shield, Clock, ArrowRight } from 'lucide-react';
import { useDynamicSiteConfig } from '@/hooks/useDynamicSiteConfig';

const PartnerPage = () => {
  const { config } = useDynamicSiteConfig();

  const benefits = [
    {
      title: "Guaranteed Income",
      description: "Steady stream of customers with competitive compensation rates",
      icon: <CheckCircle className="w-6 h-6 text-green-500" />
    },
    {
      title: "Flexible Schedule",
      description: "Work when you want, where you want. Perfect for freelancers",
      icon: <Clock className="w-6 h-6 text-blue-500" />
    },
    {
      title: "Professional Support",
      description: "24/7 technical and business support from our team",
      icon: <Shield className="w-6 h-6 text-purple-500" />
    },
    {
      title: "Growing Network",
      description: "Join thousands of certified technicians in our network",
      icon: <Users className="w-6 h-6 text-orange-500" />
    }
  ];

  const requirements = [
    "2+ years of tech support experience",
    "Valid certification in relevant technologies",
    "Excellent communication skills",
    "Own transportation and basic tools",
    "Background check clearance",
    "Customer service orientation"
  ];

  const stats = [
    { number: "500+", label: "Partner Technicians" },
    { number: "4.8/5", label: "Average Rating" },
    { number: "95%", label: "Customer Satisfaction" },
    { number: "24/7", label: "Support Available" }
  ];

  return (
    <>
      <Helmet>
        <title>Partner With Us - Join {config.name} Network</title>
        <meta name="description" content={`Join the ${config.name} network of certified technicians. Flexible work, guaranteed income, and professional support.`} />
      </Helmet>
      
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-onassist-primary to-blue-600 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Partner With {config.name}
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                Join our network of certified technicians and grow your business with guaranteed customers
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-onassist-primary hover:bg-gray-100 text-lg px-8 py-3">
                  Apply Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-onassist-primary text-lg px-8 py-3"
                >
                  Learn More
                </Button>
              </div>
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

        {/* Benefits Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Partner With Us?
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Join a network that values your expertise and helps you grow your business
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-center mb-4">
                      {benefit.icon}
                    </div>
                    <CardTitle className="text-xl">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600">
                      {benefit.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Requirements Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Partner Requirements
                </h2>
                <p className="text-xl text-gray-600">
                  We maintain high standards to ensure excellent service for our customers
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Basic Requirements</h3>
                  <ul className="space-y-4">
                    {requirements.map((requirement, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Application Process</h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Badge className="bg-onassist-primary text-white mr-3">1</Badge>
                      <span className="text-gray-700">Submit application with credentials</span>
                    </div>
                    <div className="flex items-center">
                      <Badge className="bg-onassist-primary text-white mr-3">2</Badge>
                      <span className="text-gray-700">Technical skills assessment</span>
                    </div>
                    <div className="flex items-center">
                      <Badge className="bg-onassist-primary text-white mr-3">3</Badge>
                      <span className="text-gray-700">Background check and verification</span>
                    </div>
                    <div className="flex items-center">
                      <Badge className="bg-onassist-primary text-white mr-3">4</Badge>
                      <span className="text-gray-700">Onboarding and training</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                What Our Partners Say
              </h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <Card className="text-center">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                      <Users className="w-8 h-8 text-gray-600" />
                    </div>
                  </div>
                  <CardTitle className="text-lg">John Smith</CardTitle>
                  <CardDescription>IT Support Specialist</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 italic">
                    "Working with {config.name} has been amazing. Steady income and great support!"
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                      <Users className="w-8 h-8 text-gray-600" />
                    </div>
                  </div>
                  <CardTitle className="text-lg">Sarah Johnson</CardTitle>
                  <CardDescription>Network Technician</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 italic">
                    "The flexibility and professional support make this the perfect partnership."
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                      <Users className="w-8 h-8 text-gray-600" />
                    </div>
                  </div>
                  <CardTitle className="text-lg">Mike Chen</CardTitle>
                  <CardDescription>Computer Repair Expert</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 italic">
                    "Best decision I made for my business. Highly recommend partnering with them."
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-onassist-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Join Our Network?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Start your journey with {config.name} today and grow your business with us
            </p>
            <Button size="lg" className="bg-white text-onassist-primary hover:bg-gray-100 text-lg px-8 py-3">
              Apply Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </section>
      </div>
    </>
  );
};

export default PartnerPage;
