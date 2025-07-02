
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
    <div className="fixed top-16 left-0 right-0 w-full h-[calc(100vh-4rem)] bg-white shadow-2xl border-t z-[60] animate-in slide-in-from-top-2 duration-200">
      <div className="w-full h-full max-w-none mx-auto px-4 sm:px-6 lg:px-8 py-12 overflow-hidden">
        {error ? (
          <div className="text-center p-8">
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 max-w-md mx-auto">
              <p className="text-red-600 mb-3 font-semibold">Failed to load services</p>
              <button 
                className="text-onassist-primary underline hover:text-onassist-dark font-medium"
                onClick={() => window.location.reload()}
              >
                Try refreshing the page
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex flex-col">
            <div className="mb-12 text-center">
              <h2 className="text-4xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-onassist-primary to-blue-600 bg-clip-text text-transparent">
                Our Premium Services
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Professional tech support solutions designed to make your life easier with cutting-edge technology
              </p>
            </div>

            {/* Scrollable container with beautiful scrollbar */}
            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
              {isLoading ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="space-y-4">
                      <Skeleton className="h-20 w-20 mx-auto rounded-3xl" />
                      <Skeleton className="h-6 w-full" />
                      <Skeleton className="h-4 w-3/4 mx-auto" />
                    </div>
                  ))}
                </div>
              ) : categories && categories.length > 0 ? (
                <div className="w-full">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8 mb-12">
                    {categories.map((category) => {
                      const IconComponent = getIconForCategory(category.title);
                      
                      return (
                        <div key={category.id} className="group">
                          <Link
                            to={`/services/${slugify(category.title)}`}
                            onClick={onClose}
                            className="block p-6 rounded-2xl hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-100 transition-all duration-300 border-2 border-transparent hover:border-blue-200 hover:shadow-2xl group text-center transform hover:-translate-y-2"
                          >
                            <div className="space-y-4">
                              {/* Image or Icon */}
                              <div className="relative mx-auto">
                                {category.image_url ? (
                                  <div className="w-20 h-20 mx-auto rounded-3xl overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110">
                                    <img
                                      src={category.image_url}
                                      alt={category.title}
                                      className="w-full h-full object-cover"
                                      onError={(e) => {
                                        // Fallback to icon if image fails to load
                                        const target = e.target as HTMLImageElement;
                                        target.style.display = 'none';
                                        const iconDiv = target.nextElementSibling as HTMLElement;
                                        if (iconDiv) iconDiv.style.display = 'flex';
                                      }}
                                    />
                                    <div className="w-20 h-20 bg-gradient-to-br from-onassist-primary to-blue-600 rounded-3xl hidden items-center justify-center shadow-xl">
                                      <IconComponent className="h-10 w-10 text-white" />
                                    </div>
                                  </div>
                                ) : (
                                  <div className="w-20 h-20 bg-gradient-to-br from-onassist-primary to-blue-600 rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-xl group-hover:shadow-2xl">
                                    <IconComponent className="h-10 w-10 text-white" />
                                  </div>
                                )}
                                {/* Floating effect */}
                                <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl"></div>
                              </div>
                              
                              <div>
                                <h3 className="font-bold text-gray-900 group-hover:text-onassist-primary transition-colors mb-3 text-lg line-clamp-2">
                                  {category.title}
                                </h3>
                                {category.description && (
                                  <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed group-hover:text-gray-700">
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
                </div>
              ) : (
                <div className="text-center p-12">
                  <div className="bg-gray-50 rounded-3xl p-8 max-w-md mx-auto">
                    <p className="text-gray-500 text-lg">No service categories available</p>
                  </div>
                </div>
              )}
            </div>

            {/* Enhanced CTA Section */}
            <div className="border-t border-gray-200 pt-10 mt-8">
              <div className="bg-gradient-to-r from-gray-50 via-blue-50 to-indigo-50 p-8 rounded-2xl shadow-inner border border-blue-100">
                <div className="flex flex-col lg:flex-row justify-between items-center space-y-8 lg:space-y-0">
                  <div className="text-center lg:text-left max-w-2xl">
                    <h3 className="font-bold text-gray-900 mb-3 text-2xl">Need Expert Guidance?</h3>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      Our certified technology experts are ready to help you choose the perfect service solution tailored to your specific needs and requirements.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
                    <Link
                      to="/services"
                      onClick={onClose}
                      className="inline-flex items-center justify-center gap-3 text-onassist-primary font-bold hover:text-onassist-dark transition-all duration-300 border-2 border-onassist-primary hover:border-onassist-dark px-8 py-4 rounded-xl whitespace-nowrap hover:shadow-lg transform hover:-translate-y-1"
                    >
                      Explore All Services
                      <ChevronRight className="h-5 w-5" />
                    </Link>
                    <Link
                      to="/contact"
                      onClick={onClose}
                      className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-onassist-primary to-blue-600 text-white px-8 py-4 rounded-xl hover:from-onassist-dark hover:to-blue-700 transition-all duration-300 font-bold shadow-xl hover:shadow-2xl whitespace-nowrap transform hover:-translate-y-1"
                    >
                      Get Free Consultation
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <style jsx>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
          }
          
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #f1f5f9;
            border-radius: 10px;
          }
          
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: linear-gradient(135deg, #0056b3, #67b2e8);
            border-radius: 10px;
            border: 2px solid #f1f5f9;
          }
          
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(135deg, #004494, #5aa3e0);
          }
          
          .custom-scrollbar {
            scrollbar-width: thin;
            scrollbar-color: #0056b3 #f1f5f9;
          }
        `}</style>
      </div>
    </div>
  );
};

export default ServicesMegaMenu;
