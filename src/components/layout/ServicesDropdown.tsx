
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
    <div className="absolute top-full left-0 w-80 bg-white shadow-2xl border-t z-50 animate-in slide-in-from-top-2 duration-200">
      <div className="p-4">
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
            <div className="space-y-1">
              {isLoading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="flex items-center justify-between p-3">
                    <Skeleton className="h-5 w-48" />
                    <Skeleton className="h-4 w-4" />
                  </div>
                ))
              ) : categories && categories.length > 0 ? (
                categories.map((category) => (
                  <Link
                    key={category.id}
                    to={`/services/${category.id}`}
                    onClick={onClose}
                    className="group flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-all duration-200 border border-transparent hover:border-gray-200 hover:shadow-sm w-full"
                  >
                    <span className="font-medium text-gray-900 group-hover:text-onassist-primary transition-colors truncate pr-2">
                      {category.title}
                    </span>
                    <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-onassist-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
                  </Link>
                ))
              ) : (
                <div className="text-center p-6">
                  <p className="text-gray-500">No service categories available</p>
                </div>
              )}
            </div>
            
            {!isLoading && categories && categories.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <Link
                  to="/services"
                  onClick={onClose}
                  className="inline-flex items-center gap-2 text-onassist-primary font-semibold hover:text-onassist-dark transition-colors text-sm"
                >
                  View All Services
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ServicesDropdown;
