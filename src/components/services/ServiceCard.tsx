
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Star, ArrowRight, ExternalLink, ShoppingCart } from 'lucide-react';
import { Service } from '@/hooks/useServices';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

interface ServiceCardProps {
  service: Service;
  linkPath?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, linkPath }) => {
  const defaultLinkPath = `/service/${service.slug}`;
  const finalLinkPath = linkPath || defaultLinkPath;
  const { addToCart } = useCart();
  const { toast } = useToast();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(service);
    toast({
      title: "Added to cart",
      description: `${service.title} has been added to your cart.`,
    });
  };

  return (
    <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-white overflow-hidden h-full relative cursor-pointer hover:-translate-y-2">
      <Link to={finalLinkPath} className="block h-full">
        <div className="relative overflow-hidden">
          <img 
            src={service.image_url} 
            alt={service.title}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {service.popular && (
            <Badge className="absolute top-3 left-3 bg-yellow-500 text-yellow-900 border-0 shadow-lg">
              <Star className="w-3 h-3 mr-1 fill-current" />
              Popular
            </Badge>
          )}
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
            <ExternalLink className="w-4 h-4 text-onassist-primary" />
          </div>
        </div>
        
        <CardContent className="p-6 flex flex-col h-full">
          <div className="flex-1">
            <h3 className="font-bold text-xl mb-3 group-hover:text-onassist-primary transition-colors leading-tight">
              {service.title}
            </h3>
            <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
              {service.description}
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-gray-500">
                <Clock className="w-4 h-4" />
                <span>{service.duration}</span>
              </div>
              <div className="text-2xl font-bold text-onassist-primary">
                ${service.price}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <Button 
                onClick={handleAddToCart}
                className="bg-onassist-primary hover:bg-onassist-dark text-white font-semibold pointer-events-auto transition-all duration-300 hover:shadow-lg"
                size="sm"
              >
                <ShoppingCart className="w-4 h-4 mr-1" />
                Add to Cart
              </Button>
              
              <Button variant="outline" className="group-hover:shadow-lg transition-shadow pointer-events-none border-onassist-primary text-onassist-primary hover:bg-onassist-primary hover:text-white font-semibold" size="sm">
                Learn More
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};

export default ServiceCard;
