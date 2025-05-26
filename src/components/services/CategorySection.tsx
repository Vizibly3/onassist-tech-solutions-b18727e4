
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ServiceCategory, Service } from '@/hooks/useServices';
import ServiceCard from './ServiceCard';

interface CategorySectionProps {
  category: ServiceCategory & { services: Service[] };
  showAll?: boolean;
}

const CategorySection: React.FC<CategorySectionProps> = ({ category, showAll = false }) => {
  const displayServices = showAll ? category.services : category.services.slice(0, 3);
  
  return (
    <section className="py-16" id={`category-${category.id}`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-bold mb-2">{category.title}</h2>
            <p className="text-gray-600 max-w-2xl">{category.description}</p>
          </div>
          
          {!showAll && category.services.length > 3 && (
            <Button 
              asChild
              variant="outline"
            >
              <Link to={`/services/${category.slug}`}>
                View All {category.title} Services
              </Link>
            </Button>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
