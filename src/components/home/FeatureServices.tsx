
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useCategoriesWithServices } from '@/hooks/useServices';
import { ChevronRight, Star } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const FeatureServices = () => {
  const { data: categoriesWithServices, isLoading } = useCategoriesWithServices();

  const getIconForCategory = (title: string) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('smart') || lowerTitle.includes('home')) {
      return (
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      );
    }
    if (lowerTitle.includes('wifi') || lowerTitle.includes('network')) {
      return (
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
        </svg>
      );
    }
    if (lowerTitle.includes('audio') || lowerTitle.includes('video') || lowerTitle.includes('tv')) {
      return (
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      );
    }
    if (lowerTitle.includes('mobile') || lowerTitle.includes('phone') || lowerTitle.includes('device')) {
      return (
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a1 1 0 001-1V4a1 1 0 00-1-1H8a1 1 0 00-1 1v16a1 1 0 001 1z" />
        </svg>
      );
    }
    if (lowerTitle.includes('security') || lowerTitle.includes('camera')) {
      return (
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      );
    }
    if (lowerTitle.includes('computer') || lowerTitle.includes('printer') || lowerTitle.includes('laptop')) {
      return (
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      );
    }
    return (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    );
  };

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-onassist-primary/10 to-transparent rounded-full -translate-y-48 translate-x-48"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-onassist-accent/10 to-transparent rounded-full translate-y-48 -translate-x-48"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-20 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-onassist-primary/10 text-onassist-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Star className="h-4 w-4" />
            Professional Tech Support
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-onassist-primary to-onassist-dark bg-clip-text text-transparent">
            Our Tech Support Services
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Whether you need help with your computer, smart home, or anything in between, 
            our certified tech experts are ready to solve your problems with precision and care.
          </p>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-96 rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categoriesWithServices?.slice(0, 6).map((category, index) => (
              <div 
                key={category.id}
                className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 flex flex-col h-full border border-white/50 hover:border-onassist-primary/20 hover:-translate-y-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Icon */}
                <div className="mb-6 relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-onassist-primary to-onassist-dark rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    {getIconForCategory(category.title)}
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-onassist-accent rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">{category.services.length}</span>
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-onassist-primary transition-colors">
                  {category.title}
                </h3>
                <p className="text-gray-600 mb-6 flex-grow leading-relaxed">
                  {category.description}
                </p>
                
                {/* Service preview */}
                <div className="space-y-3 mb-8">
                  {category.services.slice(0, 3).map((service, serviceIndex) => (
                    <div 
                      key={service.id}
                      className="flex items-center text-sm text-gray-700 group-hover:text-onassist-primary transition-colors"
                      style={{ animationDelay: `${(index * 100) + (serviceIndex * 50)}ms` }}
                    >
                      <div className="w-2 h-2 bg-onassist-primary rounded-full mr-3 group-hover:scale-125 transition-transform"></div>
                      <span className="font-medium">{service.title}</span>
                    </div>
                  ))}
                  {category.services.length > 3 && (
                    <div className="flex items-center text-sm text-gray-500">
                      <div className="w-2 h-2 bg-gray-300 rounded-full mr-3"></div>
                      <span>+{category.services.length - 3} more services</span>
                    </div>
                  )}
                </div>
                
                <div className="mt-auto">
                  <Button 
                    asChild
                    className="w-full bg-gradient-to-r from-onassist-primary to-onassist-dark hover:from-onassist-dark hover:to-onassist-primary text-white border-0 shadow-lg group-hover:shadow-xl transition-all duration-300"
                  >
                    <Link to={`/services/${category.id}`} className="flex items-center justify-center gap-2">
                      Explore Services
                      <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="text-center mt-16">
          <Button 
            asChild
            size="lg"
            className="bg-gradient-to-r from-onassist-primary to-onassist-dark hover:from-onassist-dark hover:to-onassist-primary text-white px-8 py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
          >
            <Link to="/services" className="flex items-center gap-3">
              View All 100+ Services
              <ChevronRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeatureServices;
