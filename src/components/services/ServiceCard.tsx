
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useCart } from '@/contexts/CartContext';
import { Service } from '@/hooks/useServices';
import { Clock, Info } from 'lucide-react';

interface ServiceCardProps {
  service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    addToCart(service);
  };

  const handleLearnMore = () => {
    navigate(`/service/${service.id}`);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col h-full group">
      {/* Image */}
      <div className="aspect-video relative overflow-hidden bg-gray-100">
        <img 
          src={service.image_url} 
          alt={service.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {service.popular && (
          <div className="absolute top-4 right-4 bg-onassist-accent text-white text-xs font-bold py-1 px-3 rounded-full shadow-lg">
            Popular
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-semibold line-clamp-2 group-hover:text-onassist-primary transition-colors">
            {service.title}
          </h3>
          <span className="font-bold text-onassist-primary text-lg ml-2">
            ${service.price}
          </span>
        </div>
        
        <p className="text-gray-600 mb-4 flex-grow line-clamp-3">
          {service.description}
        </p>
        
        <div className="flex items-center text-gray-500 text-sm mb-6">
          <Clock className="h-4 w-4 mr-2" />
          <span>{service.duration}</span>
        </div>
        
        {/* Buttons */}
        <div className="space-y-3">
          <Button 
            onClick={handleAddToCart}
            className="w-full bg-onassist-primary hover:bg-onassist-dark transition-all duration-200"
          >
            Book This Service
          </Button>
          
          <Button 
            onClick={handleLearnMore}
            variant="outline"
            className="w-full border-onassist-primary text-onassist-primary hover:bg-onassist-primary hover:text-white transition-all duration-200"
          >
            <Info className="w-4 h-4 mr-2" />
            Learn More / Get Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
