
import React from 'react';
import { Button } from "@/components/ui/button";
import { useCart } from '@/contexts/CartContext';
import { Service } from '@/hooks/useServices';

interface ServiceCardProps {
  service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(service);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col h-full">
      {/* Image */}
      <div className="aspect-video relative overflow-hidden bg-gray-100">
        <img 
          src={service.image_url} 
          alt={service.title} 
          className="w-full h-full object-cover"
        />
        
        {service.popular && (
          <div className="absolute top-4 right-4 bg-onassist-accent text-white text-xs font-bold py-1 px-3 rounded-full">
            Popular
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold">{service.title}</h3>
          <span className="font-bold text-onassist-primary">${service.price}</span>
        </div>
        
        <p className="text-gray-600 mb-4 flex-grow">{service.description}</p>
        
        <div className="flex items-center text-gray-500 text-sm mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{service.duration}</span>
        </div>
        
        <Button 
          onClick={handleAddToCart}
          className="w-full bg-onassist-primary hover:bg-onassist-dark"
        >
          Book This Service
        </Button>
      </div>
    </div>
  );
};

export default ServiceCard;
