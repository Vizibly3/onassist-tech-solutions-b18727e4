
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
    <div className="fixed top-16 left-0 right-0 w-full bg-white shadow-2xl border-t z-[60] animate-in slide-in-from-top-2 duration-200">
      <div className="w-full max-w-none mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
          <div className="w-full">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Our Services</h2>
              <p className="text-lg text-gray-600">Professional tech support for your home and business</p>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="h-16 w-16 mx-auto rounded-2xl" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-4 w-3/4 mx-auto" />
                  </div>
                ))}
              </div>
            ) : categories && categories.length > 0 ? (
              <div className="w-full">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 mb-10">
                  {categories.map((category) => {
                    const IconComponent = getIconForCategory(category.title);
                    
                    return (
                      <div key={category.id} className="group">
                        <Link
                          to={`/services/${slugify(category.title)}`}
                          onClick={onClose}
                          className="block p-4 rounded-xl hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 border border-transparent hover:border-blue-200 hover:shadow-lg group text-center"
                        >
                          <div className="space-y-3">
                            <div className="w-16 h-16 bg-gradient-to-br from-onassist-primary to-blue-600 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg">
                              <IconComponent className="h-8 w-8 text-white" />
                            </div>
                            <div>
                              <h3 className="font-bold text-gray-900 group-hover:text-onassist-primary transition-colors mb-2 text-base line-clamp-2">
                                {category.title}
                              </h3>
                              {category.description && (
                                <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
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

                <div className="border-t border-gray-200 pt-8">
                  <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 rounded-xl">
                    <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
                      <div className="text-center lg:text-left">
                        <h3 className="font-bold text-gray-900 mb-2 text-xl">Need Help Choosing?</h3>
                        <p className="text-gray-600">Our certified experts are here to help you find the perfect service for your needs</p>
                      </div>
                      <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                        <Link
                          to="/services"
                          onClick={onClose}
                          className="inline-flex items-center justify-center gap-2 text-onassist-primary font-bold hover:text-onassist-dark transition-colors border-2 border-onassist-primary hover:border-onassist-dark px-6 py-3 rounded-lg whitespace-nowrap"
                        >
                          View All Services
                          <ChevronRight className="h-5 w-5" />
                        </Link>
                        <Link
                          to="/contact"
                          onClick={onClose}
                          className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-onassist-primary to-blue-600 text-white px-6 py-3 rounded-lg hover:from-onassist-dark hover:to-blue-700 transition-all duration-300 font-bold shadow-lg hover:shadow-xl whitespace-nowrap"
                        >
                          Get Free Consultation
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center p-8">
                <p className="text-gray-500">No service categories available</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ServicesMegaMenu;
