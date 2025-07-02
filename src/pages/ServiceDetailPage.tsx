
import React, { useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Helmet } from "react-helmet-async";
import { siteConfig } from "@/config/site";
import { useServiceBySlug } from "@/hooks/useServices";
import { useDynamicSiteConfig } from "@/hooks/useDynamicSiteConfig";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import {
  Clock,
  DollarSign,
  ShoppingCart,
  CheckCircle,
  Star,
  Users,
  Shield,
  Award,
  HeadphonesIcon,
  Calendar,
  Zap,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { testimonialsData } from "@/utils/testimonialsData";
import { slugify } from "@/utils/slugify";

const ServiceDetailPage = () => {
  const { serviceSlug } = useParams();
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { config: dynamicConfig } = useDynamicSiteConfig();

  const {
    data: service,
    isLoading,
    error,
  } = useServiceBySlug(serviceSlug || "");

  if (error) {
    console.error("Error loading service:", error);
    return <Navigate to="/404" replace />;
  }

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Skeleton className="h-96 w-full" />
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-10 w-1/3" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!service) {
    return <Navigate to="/404" replace />;
  }

  const handleAddToCart = () => {
    addToCart(service, quantity);
    toast.success(`Added ${quantity} ${service.title} to cart!`);
  };

  // Get random testimonials
  const getRandomTestimonials = () => {
    const shuffled = [...testimonialsData].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  };

  const testimonials = getRandomTestimonials();

  return (
    <Layout>
      <Helmet>
        <title>
          {service.title} - Professional Service | {siteConfig.name}
        </title>
        <meta
          name="description"
          content={`${service.description} Professional ${service.title} service starting at $${service.price}. Book now for expert assistance.`}
        />
        <meta
          name="keywords"
          content={`${service.title}, tech support, professional service`}
        />
      </Helmet>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-onassist-primary via-blue-600 to-purple-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-white/20 text-white mb-4">
                Professional Service
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                {service.title}
              </h1>
              <p className="text-xl opacity-90 mb-8 leading-relaxed">
                {service.description}
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
                  <DollarSign className="w-5 h-5" />
                  <span className="font-semibold">${service.price}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
                  <Clock className="w-5 h-5" />
                  <span>{service.duration}</span>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <img
                src={service.image_url}
                alt={service.title}
                className="rounded-2xl shadow-2xl max-w-md w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Service Guarantee Section with Dynamic Data */}
      <section className="py-20 bg-gradient-to-br from-green-50 via-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Our <span className="text-green-600">Service Guarantee</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We stand behind our work with comprehensive guarantees and support
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-blue-50 hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                  <Calendar className="w-10 h-10 text-white" />
                </div>
                <h3 className="font-bold text-xl mb-4">
                  {dynamicConfig.service_warranty_days}-Day Service Warranty
                </h3>
                <p className="text-gray-600">
                  All our services come with a comprehensive {dynamicConfig.service_warranty_days}-day warranty for your peace of mind.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-green-50 hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="bg-gradient-to-br from-green-500 to-green-600 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                  <Shield className="w-10 h-10 text-white" />
                </div>
                <h3 className="font-bold text-xl mb-4">
                  {dynamicConfig.satisfaction_guarantee_percent}% Satisfaction Guaranteed
                </h3>
                <p className="text-gray-600">
                  We guarantee {dynamicConfig.satisfaction_guarantee_percent}% satisfaction with our services or your money back.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-purple-50 hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                  <HeadphonesIcon className="w-10 h-10 text-white" />
                </div>
                <h3 className="font-bold text-xl mb-4">
                  {dynamicConfig.followup_support_text}
                </h3>
                <p className="text-gray-600">
                  Get ongoing support and assistance even after your service is complete.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Book {service.title} Today
              </h2>
              <p className="text-gray-600 mb-8">
                Ready to experience hassle-free tech support? Schedule your {service.title} service now and let our experts take care of everything.
              </p>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </Button>
                  <span className="font-semibold">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </Button>
                </div>
                <Button
                  className="bg-onassist-primary text-white hover:bg-onassist-primary/90"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
              <p className="text-sm text-gray-500">
                Prices are subject to change based on service requirements.
              </p>
            </div>
            <div className="flex justify-center">
              <Card className="w-full max-w-md shadow-xl border-0">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">
                    Service Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span>{service.title}</span>
                    <span className="font-semibold">${service.price}</span>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <span>Quantity</span>
                    <span className="font-semibold">{quantity}</span>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <span>Duration</span>
                    <span className="font-semibold">{service.duration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Total</span>
                    <span className="text-onassist-primary font-bold text-lg">
                      ${service.price * quantity}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-700 rounded-full px-6 py-2 mb-4">
              <Star className="w-5 h-5" />
              <span className="font-medium">Happy Customers</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Read what our satisfied customers have to say about our services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="shadow-xl border-0 bg-white hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 italic text-lg leading-relaxed">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-onassist-primary to-blue-600 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-lg">{testimonial.name}</div>
                      <div className="text-gray-600">{testimonial.location}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-onassist-primary via-blue-600 to-purple-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        <div className="relative container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl md:text-2xl opacity-90 mb-10 leading-relaxed">
              Experience top-notch tech support with our expert team. Book your service today!
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                size="lg"
                className="bg-white text-onassist-primary hover:bg-gray-100 font-bold px-10 py-5 rounded-full shadow-2xl text-lg"
                onClick={() => window.open(`tel:${siteConfig.contactPhone}`, '_self')}
              >
                <Zap className="w-6 h-6 mr-3" />
                Call Now: {siteConfig.contactPhone}
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-onassist-primary font-bold px-10 py-5 rounded-full backdrop-blur-sm text-lg">
                <ShoppingCart className="w-6 h-6 mr-3" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ServiceDetailPage;
