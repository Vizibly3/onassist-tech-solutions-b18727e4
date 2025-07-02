
import React from 'react';
import { Link } from 'react-router-dom';
import { useServiceCategories } from '@/hooks/useServices';
import { Skeleton } from '@/components/ui/skeleton';
import { ChevronRight, Smartphone, Wifi, Shield, Monitor, Speaker, Home, Wrench, Sparkles } from 'lucide-react';
import { slugify } from '@/utils/slugify';

interface ServicesMegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const categoryIcons: { [key: string]: any } = {
  'smart home': Home,
  'wifi & network': Wifi,
  'home security': Shield,
  'computers & printers': Monitor,
  'audio & video': Speaker,
  'mobile devices': Smartphone,
  'tv mounting': Monitor,
  'around the home': Wrench,
  'home cleaning': Sparkles,
};

const ServicesMegaMenu: React.FC<ServicesMegaMenuProps> = ({ isOpen, onClose }) => {
  const { data: categories, isLoading, error } = useServiceCategories();

  if (!isOpen) return null;

  const getIconForCategory = (title: string) => {
    const key = title.toLowerCase();
    const IconComponent = categoryIcons[key] || Wrench;
    return IconComponent;
  };

  return (
    <div className="absolute top-full left-0 w-full bg-white shadow-2xl border-t z-50 animate-in slide-in-from-top-2 duration-200">
      <div className="container mx-auto px-4 py-8">
        {error ? (
          <div className="text-center p-6">
            <p className="text-red-500 mb-2">Failed to load services</p>
            <button 
              className="text-onassist-primary underline hover:text-onassist-dark"
              onClick={() => window.location.reload()}
            >
              Try refreshing the page
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Our Services</h2>
              <p className="text-gray-600">Professional tech support for your home and business</p>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="space-y-3">
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ))}
              </div>
            ) : categories && categories.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-8">
                  {categories.map((category) => {
                    const IconComponent = getIconForCategory(category.title);
                    
                    return (
                      <div key={category.id} className="group">
                        <Link
                          to={`/services/${slugify(category.title)}`}
                          onClick={onClose}
                          className="block p-4 rounded-lg hover:bg-gray-50 transition-all duration-200 border border-transparent hover:border-gray-200 hover:shadow-md"
                        >
                          <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0">
                              <div className="w-10 h-10 bg-onassist-primary/10 rounded-lg flex items-center justify-center group-hover:bg-onassist-primary/20 transition-colors">
                                <IconComponent className="h-5 w-5 text-onassist-primary" />
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-gray-900 group-hover:text-onassist-primary transition-colors mb-1 text-sm">
                                {category.title}
                              </h3>
                              {category.description && (
                                <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                                  {category.description}
                                </p>
                              )}
                            </div>
                          </div>
                        </Link>
                      </div>
                    );
                  })}
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Need Help Choosing?</h3>
                      <p className="text-sm text-gray-600">Our experts are here to help you find the right service</p>
                    </div>
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                      <Link
                        to="/services"
                        onClick={onClose}
                        className="inline-flex items-center gap-2 text-onassist-primary font-semibold hover:text-onassist-dark transition-colors text-sm"
                      >
                        View All Services
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                      <Link
                        to="/contact"
                        onClick={onClose}
                        className="inline-flex items-center gap-2 bg-onassist-primary text-white px-4 py-2 rounded-lg hover:bg-onassist-dark transition-colors text-sm font-medium"
                      >
                        Get Free Consultation
                      </Link>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center p-8">
                <p className="text-gray-500">No service categories available</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ServicesMegaMenu;
