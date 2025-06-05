
import React from 'react';
import { Link } from 'react-router-dom';
import { useCategoriesWithServices } from '@/hooks/useServices';
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { slugify } from '@/utils/slugify';

interface ServicesMegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const ServicesMegaMenu: React.FC<ServicesMegaMenuProps> = ({ isOpen, onClose }) => {
  const { data: categoriesWithServices, isLoading, error } = useCategoriesWithServices();

  if (!isOpen) return null;

  return (
    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-[80vw] max-w-7xl bg-white shadow-2xl border border-gray-200 rounded-lg z-50 animate-in slide-in-from-top-2 duration-300">
      <div className="p-8">
        {error ? (
          <div className="text-center p-12">
            <p className="text-red-500 mb-4 text-lg">Failed to load services</p>
            <button 
              className="text-onassist-primary underline hover:text-onassist-dark text-lg"
              onClick={() => window.location.reload()}
            >
              Try refreshing the page
            </button>
          </div>
        ) : (
          <>
            <ScrollArea className="h-[70vh] w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pr-4">
                {isLoading ? (
                  Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="space-y-4">
                      <Skeleton className="h-7 w-32" />
                      <div className="space-y-2">
                        {Array.from({ length: 4 }).map((_, j) => (
                          <Skeleton key={j} className="h-5 w-28" />
                        ))}
                      </div>
                      <Skeleton className="h-5 w-20" />
                    </div>
                  ))
                ) : categoriesWithServices && categoriesWithServices.length > 0 ? (
                  categoriesWithServices.map((category) => (
                    <div key={category.id} className="space-y-4">
                      <Link
                        to={`/services/${slugify(category.title)}`}
                        onClick={onClose}
                        className="block group"
                      >
                        <h3 className="font-bold text-lg text-gray-900 group-hover:text-onassist-primary transition-colors border-b-2 border-onassist-primary pb-2 mb-4">
                          {category.title}
                        </h3>
                      </Link>
                      
                      <div className="space-y-2">
                        {category.services && category.services.length > 0 ? (
                          <>
                            {category.services.slice(0, 6).map((service) => (
                              <Link
                                key={service.id}
                                to={`/service/${slugify(service.title)}`}
                                onClick={onClose}
                                className="block text-sm text-gray-600 hover:text-onassist-primary transition-colors py-1 hover:pl-2 transition-all duration-200"
                              >
                                • {service.title}
                              </Link>
                            ))}
                            
                            {category.services.length > 6 && (
                              <Link
                                to={`/services/${slugify(category.title)}`}
                                onClick={onClose}
                                className="inline-flex items-center gap-1 text-sm text-onassist-primary hover:text-onassist-dark font-medium mt-2 group"
                              >
                                View More
                                <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                              </Link>
                            )}
                          </>
                        ) : (
                          <p className="text-sm text-gray-400 italic">No services available</p>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center p-12">
                    <p className="text-gray-500 text-lg">No service categories available</p>
                  </div>
                )}
              </div>
            </ScrollArea>
            
            {!isLoading && categoriesWithServices && categoriesWithServices.length > 0 && (
              <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                <Link
                  to="/services"
                  onClick={onClose}
                  className="inline-flex items-center gap-2 text-onassist-primary font-bold hover:text-onassist-dark transition-colors text-lg group"
                >
                  Browse All Services
                  <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ServicesMegaMenu;
