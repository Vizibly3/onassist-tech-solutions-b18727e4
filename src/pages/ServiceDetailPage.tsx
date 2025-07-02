import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useServices } from '@/hooks/useServices';
import { useCart } from '@/contexts/CartContext';
import { ServiceLeadInsert } from '@/types/supabase';
import { 
  Clock, 
  DollarSign, 
  Star, 
  Plus, 
  Minus, 
  ShoppingCart,
  Phone,
  Mail,
  Calendar,
  MessageSquare,
  CheckCircle,
  ArrowLeft
} from 'lucide-react';
import { format } from 'date-fns';

const ServiceDetailPage = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();
  const { data: services, isLoading, error } = useServices();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferred_datetime: '',
    message: ''
  });
  const { toast } = useToast();

  const service = services?.find((service) => service.id === serviceId);

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: "Failed to load service details.",
        variant: "destructive",
      });
    }
  }, [error, toast]);

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 flex justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-onassist-primary"></div>
        </div>
      </Layout>
    );
  }

  if (!service) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Service Not Found</h1>
            <p className="text-gray-600">The requested service could not be found.</p>
            <Button onClick={() => navigate('/services')} variant="outline" className="mt-4">
              Go back to Services
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    addToCart(service);
    toast({
      title: "Added to Cart",
      description: `${service.title} added to your cart.`,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const leadData: ServiceLeadInsert = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: service?.title || '',
        preferred_datetime: formData.preferred_datetime,
        message: formData.message || null,
        status: 'pending'
      };

      const { error } = await supabase
        .from('service_leads')
        .insert(leadData);

      if (error) throw error;

      toast({
        title: "Request Submitted!",
        description: "We'll contact you soon to discuss your service needs.",
        duration: 5000,
      });

      setShowForm(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        preferred_datetime: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting lead:', error);
      toast({
        title: "Submission Failed",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          className="hover:bg-gray-200 mb-4"
          onClick={() => navigate('/services')}
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Services
        </Button>
        <Card className="shadow-lg border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-2xl font-bold">{service.title}</CardTitle>
            <Badge variant="secondary">
              <DollarSign className="w-4 h-4 mr-2" />
              {service.price}
            </Badge>
          </CardHeader>
          <CardContent className="py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <img
                  src={service.image_url}
                  alt={service.title}
                  className="rounded-lg w-full object-cover h-64"
                />
                <div className="mt-4 space-y-2">
                  <h3 className="text-lg font-semibold">Description</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
                <div className="mt-4 space-y-2">
                  <h3 className="text-lg font-semibold">Details</h3>
                  <ul className="list-disc pl-5 text-gray-600">
                    <li>Duration: {service.duration} <Clock className="inline-block w-4 h-4 ml-1" /></li>
                    <li>Available: 24/7 <Star className="inline-block w-4 h-4 ml-1" /></li>
                  </ul>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Book Now</h3>
                <div className="flex items-center justify-between mb-4">
                  <div className="font-semibold">Quantity:</div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="icon" onClick={decrementQuantity} disabled={quantity <= 1}>
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span>{quantity}</span>
                    <Button variant="outline" size="icon" onClick={incrementQuantity}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <Button className="w-full mb-4" onClick={handleAddToCart}>
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>

                {!showForm ? (
                  <Button variant="secondary" className="w-full" onClick={() => setShowForm(true)}>
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Request a Service
                  </Button>
                ) : (
                  <Card className="mt-4">
                    <CardHeader>
                      <CardTitle>Request Service</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                          <Label htmlFor="name">Name</Label>
                          <Input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone</Label>
                          <Input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="preferred_datetime">Preferred Date/Time</Label>
                          <Input
                            type="datetime-local"
                            id="preferred_datetime"
                            name="preferred_datetime"
                            value={formData.preferred_datetime}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="message">Message (Optional)</Label>
                          <Textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Any specific details about your request?"
                          />
                        </div>
                        <Button type="submit" disabled={isSubmitting} className="w-full">
                          {isSubmitting ? (
                            <>
                              Submitting...
                            </>
                          ) : (
                            <>
                              Submit Request <CheckCircle className="w-4 h-4 ml-2" />
                            </>
                          )}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ServiceDetailPage;
