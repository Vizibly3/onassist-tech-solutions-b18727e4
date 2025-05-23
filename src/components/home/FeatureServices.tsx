
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useCategoriesWithServices } from '@/hooks/useServices';
import { ChevronRight } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const FeatureServices = () => {
  const { data: categoriesWithServices, isLoading } = useCategoriesWithServices();

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Tech Support Services</h2>
          <p className="text-lg text-gray-600">
            Whether you need help with your computer, smart home, or anything in between, 
            our tech experts are ready to solve your tech problems.
          </p>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-80 rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categoriesWithServices?.slice(0, 6).map((category) => (
              <div 
                key={category.id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 flex flex-col h-full border border-gray-100"
              >
                <div className="mb-4 p-3 bg-onassist-light inline-flex rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-onassist-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                </div>
                
                <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                <p className="text-gray-600 mb-4 flex-grow">{category.description}</p>
                
                <div className="space-y-2 mb-6">
                  {category.services.slice(0, 3).map((service) => (
                    <div 
                      key={service.id}
                      className="flex items-center text-sm"
                    >
                      <ChevronRight className="h-4 w-4 text-onassist-primary mr-1 flex-shrink-0" />
                      <span>{service.title}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-auto">
                  <Button 
                    asChild
                    variant="outline"
                    className="w-full"
                  >
                    <Link to={`/services/${category.id}`}>
                      View Services
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="text-center mt-12">
          <Button 
            asChild
            size="lg"
            className="bg-onassist-primary hover:bg-onassist-dark"
          >
            <Link to="/services">
              View All Services
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeatureServices;
