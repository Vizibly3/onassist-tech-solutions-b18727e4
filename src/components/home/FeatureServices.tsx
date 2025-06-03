
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useServiceCategories } from '@/hooks/useServices';
import { ArrowRight, Wrench, Monitor, Home, Smartphone, Wifi, Settings } from 'lucide-react';
import { slugify } from '@/utils/slugify';

const FeatureServices = () => {
  const { data: categories, isLoading } = useServiceCategories();

  const getIcon = (title: string) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('home') || lowerTitle.includes('smart')) return Home;
    if (lowerTitle.includes('computer') || lowerTitle.includes('laptop')) return Monitor;
    if (lowerTitle.includes('phone') || lowerTitle.includes('mobile')) return Smartphone;
    if (lowerTitle.includes('network') || lowerTitle.includes('wifi')) return Wifi;
    if (lowerTitle.includes('audio') || lowerTitle.includes('video')) return Settings;
    return Wrench;
  };

  if (isLoading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Tech Support Services</h2>
            <div className="animate-pulse bg-gray-200 h-6 w-96 mx-auto rounded"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animate-pulse bg-gray-200 h-64 rounded-xl"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-onassist-primary/10 text-onassist-primary border-onassist-primary/20">
            Our Services
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Our Tech Support Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From computer issues to smart home setup, our certified tech experts are ready to solve 
            your technology problems with professional, reliable solutions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {categories?.slice(0, 6).map((category, index) => {
            const IconComponent = getIcon(category.title);
            const categorySlug = slugify(category.title);
            return (
              <Card 
                key={category.id} 
                className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg hover:scale-105 bg-white"
              >
                <CardContent className="p-8">
                  <div className="mb-6">
                    <div className={`inline-flex p-4 rounded-2xl mb-4 ${
                      index % 3 === 0 ? 'bg-blue-100 text-blue-600' :
                      index % 3 === 1 ? 'bg-green-100 text-green-600' :
                      'bg-purple-100 text-purple-600'
                    }`}>
                      <IconComponent className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-onassist-primary transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {category.description || 'Professional tech support services tailored to your needs.'}
                    </p>
                  </div>
                  
                  <Link to={`/services/${categorySlug}`}>
                    <Button 
                      variant="outline" 
                      className="w-full group-hover:bg-onassist-primary group-hover:text-white group-hover:border-onassist-primary transition-all duration-300"
                    >
                      Explore Services
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        <div className="text-center">
          <Link to="/services">
            <Button 
              size="lg" 
              className="bg-onassist-primary hover:bg-onassist-dark text-white px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              View All Services
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeatureServices;
