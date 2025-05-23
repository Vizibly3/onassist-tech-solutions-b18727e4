
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Clock, Star, Users, Award, Wrench } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Certified Experts',
    description: 'All our technicians are certified professionals with extensive training and experience.',
    color: 'text-blue-600 bg-blue-100'
  },
  {
    icon: Clock,
    title: 'Same Day Service',
    description: 'Quick response times with most services completed the same day you book.',
    color: 'text-green-600 bg-green-100'
  },
  {
    icon: Star,
    title: '98% Satisfaction Rate',
    description: 'Our customers love our service, with consistently high ratings and reviews.',
    color: 'text-yellow-600 bg-yellow-100'
  },
  {
    icon: Users,
    title: 'Trusted by Thousands',
    description: 'Over 10,000 happy customers trust us with their technology needs.',
    color: 'text-purple-600 bg-purple-100'
  },
  {
    icon: Award,
    title: 'Quality Guarantee',
    description: 'We stand behind our work with comprehensive warranties and guarantees.',
    color: 'text-red-600 bg-red-100'
  },
  {
    icon: Wrench,
    title: 'Complete Solutions',
    description: 'From simple fixes to complex installations, we handle it all.',
    color: 'text-indigo-600 bg-indigo-100'
  }
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Choose OnAssist?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're not just another tech support company. We're your trusted technology partners, 
            committed to making your digital life seamless and stress-free.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg">
                <CardContent className="p-8 text-center">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-8 w-8" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Trust Badges */}
        <div className="mt-16 pt-12 border-t border-gray-200">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Trusted & Certified</h3>
            <p className="text-gray-600">We maintain the highest industry standards and certifications</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
            <div className="text-center">
              <div className="h-16 bg-gray-200 rounded-lg flex items-center justify-center mb-2">
                <span className="font-bold text-gray-600">CompTIA</span>
              </div>
              <p className="text-sm text-gray-500">Certified</p>
            </div>
            <div className="text-center">
              <div className="h-16 bg-gray-200 rounded-lg flex items-center justify-center mb-2">
                <span className="font-bold text-gray-600">BBB</span>
              </div>
              <p className="text-sm text-gray-500">A+ Rating</p>
            </div>
            <div className="text-center">
              <div className="h-16 bg-gray-200 rounded-lg flex items-center justify-center mb-2">
                <span className="font-bold text-gray-600">Google</span>
              </div>
              <p className="text-sm text-gray-500">Partner</p>
            </div>
            <div className="text-center">
              <div className="h-16 bg-gray-200 rounded-lg flex items-center justify-center mb-2">
                <span className="font-bold text-gray-600">Apple</span>
              </div>
              <p className="text-sm text-gray-500">Authorized</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
