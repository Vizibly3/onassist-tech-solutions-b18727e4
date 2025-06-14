
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Clock, Users, Award, Star, CheckCircle } from 'lucide-react';

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Trusted & Certified
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're committed to providing exceptional service with industry-leading standards and certifications.
          </p>
        </div>

        {/* Main Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <Card className="text-center hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-8">
              <div className="bg-gradient-to-br from-onassist-primary to-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">Licensed & Insured</h3>
              <p className="text-gray-600">
                Fully licensed technicians with comprehensive insurance coverage for your peace of mind.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-8">
              <div className="bg-gradient-to-br from-green-500 to-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">Same-Day Service</h3>
              <p className="text-gray-600">
                Most repairs and installations completed the same day you call. Emergency services available 24/7.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-8">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">Expert Technicians</h3>
              <p className="text-gray-600">
                Certified professionals with years of experience and ongoing training in the latest technologies.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-8">
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">100% Guarantee</h3>
              <p className="text-gray-600">
                30-day satisfaction guarantee on all services. If you're not happy, we'll make it right.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Certifications Section */}
        <div className="bg-white rounded-2xl p-12 shadow-lg">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Industry Certifications & Partnerships
            </h3>
            <p className="text-lg text-gray-600">
              We maintain the highest industry standards through certified training and partnerships
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
            {/* Technology Partner Logos */}
            <div className="text-center">
              <img 
                src="https://images.unsplash.com/photo-1611606063065-ee7946f0787a?w=120&h=80&fit=crop" 
                alt="Technology Certification"
                className="w-20 h-12 mx-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
              />
              <p className="text-xs text-gray-600 mt-2">Google Certified</p>
            </div>
            
            <div className="text-center">
              <img 
                src="https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=120&h=80&fit=crop" 
                alt="Apple Certification"
                className="w-20 h-12 mx-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
              />
              <p className="text-xs text-gray-600 mt-2">Apple Authorized</p>
            </div>
            
            <div className="text-center">
              <img 
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=120&h=80&fit=crop" 
                alt="Microsoft Partnership"
                className="w-20 h-12 mx-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
              />
              <p className="text-xs text-gray-600 mt-2">Microsoft Partner</p>
            </div>
            
            <div className="text-center">
              <img 
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=120&h=80&fit=crop" 
                alt="Samsung Certified"
                className="w-20 h-12 mx-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
              />
              <p className="text-xs text-gray-600 mt-2">Samsung Certified</p>
            </div>
            
            <div className="text-center">
              <img 
                src="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=120&h=80&fit=crop" 
                alt="CompTIA Certified"
                className="w-20 h-12 mx-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
              />
              <p className="text-xs text-gray-600 mt-2">CompTIA A+</p>
            </div>
            
            <div className="text-center">
              <img 
                src="https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=120&h=80&fit=crop" 
                alt="Security Certification"
                className="w-20 h-12 mx-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
              />
              <p className="text-xs text-gray-600 mt-2">Security+</p>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h4 className="text-xl font-bold mb-2">Background Checked</h4>
            <p className="text-gray-600">All technicians undergo comprehensive background checks</p>
          </div>
          
          <div className="text-center">
            <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-yellow-600" />
            </div>
            <h4 className="text-xl font-bold mb-2">5-Star Rated</h4>
            <p className="text-gray-600">Consistently rated 5 stars by thousands of customers</p>
          </div>
          
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
            <h4 className="text-xl font-bold mb-2">Privacy Protected</h4>
            <p className="text-gray-600">Your data and privacy are our top priority</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
