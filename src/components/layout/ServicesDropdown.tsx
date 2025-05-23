
import React from 'react';
import { Link } from 'react-router-dom';
import { useServiceCategories } from '@/hooks/useServices';
import { Skeleton } from '@/components/ui/skeleton';
import { ChevronRight } from 'lucide-react';

interface ServicesDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

const ServicesDropdown: React.FC<ServicesDropdownProps> = ({ isOpen, onClose }) => {
  const { data: categories, isLoading, error } = useServiceCategories();

  if (!isOpen) return null;

  return (
    <div className="absolute top-full left-0 w-full bg-white shadow-2xl border-t z-50 animate-in slide-in-from-top-2 duration-200">
      <div className="container mx-auto px-4 py-8">
        {error ? (
          <div className="text-center p-6">
            <p className="text-red-500">Failed to load services</p>
            <button 
              className="text-onassist-primary mt-2 underline"
              onClick={() => window.location.reload()}
            >
              Try refreshing the page
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {isLoading ? (
              // Loading skeletons
              Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-4 w-24" />
                </div>
              ))
            ) : categories && categories.length > 0 ? (
              categories.map((category) => (
                <Link
                  key={category.id}
                  to={`/services/${category.id}`}
                  onClick={onClose}
                  className="group p-4 rounded-lg hover:bg-gray-50 transition-all duration-200 border border-transparent hover:border-gray-200"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 group-hover:text-onassist-primary transition-colors">
                      {category.title}
                    </h3>
                    <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-onassist-primary group-hover:translate-x-1 transition-all" />
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {category.description || `Browse our ${category.title} services`}
                  </p>
                </Link>
              ))
            ) : (
              <div className="col-span-full text-center p-6">
                <p className="text-gray-500">No service categories found</p>
              </div>
            )}
          </div>
        )}
        
        {!isLoading && categories && categories.length > 0 && (
          <div className="mt-8 pt-6 border-t border-gray-200">
            <Link
              to="/services"
              onClick={onClose}
              className="inline-flex items-center gap-2 text-onassist-primary font-semibold hover:text-onassist-dark transition-colors"
            >
              View All Services
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServicesDropdown;
