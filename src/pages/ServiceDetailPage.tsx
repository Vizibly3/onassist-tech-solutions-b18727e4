import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from '@/contexts/CartContext';
import { useServiceBySlug } from '@/hooks/useServices';
import { Helmet } from 'react-helmet-async';
import { siteConfig } from '@/config/site';
import { 
  Clock, 
  Star, 
  Shield, 
  CheckCircle, 
  ArrowLeft,
  Wrench,
  Monitor,
  Home,
  Smartphone,
  Bolt,
  Wifi,
  Zap,
  Users,
  Award,
  Phone,
  MapPin
} from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const ServiceDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { data: service, isLoading, error } = useServiceBySlug(slug || '');
  const [zipCode, setZipCode] = useState('');

  const handleAddToCart = () => {
    if (service && zipCode.trim()) {
      addToCart(service);
    }
  };

  const handleGoBack = () => {
    navigate('/services');
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-8 w-32 mb-6" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Skeleton className="h-96 rounded-xl" />
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !service) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Service not found</h1>
            <p className="text-gray-600 mb-6">The service you're looking for doesn't exist.</p>
            <Button onClick={handleGoBack} variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Helmet>
        <title>{service.title} | {siteConfig.name}</title>
        <meta name="description" content={service.description} />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
        {/* Breadcrumb */}
        <div className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-40">
          <div className="container mx-auto px-4 py-3">
            <Button
              onClick={handleGoBack}
              variant="ghost"
              className="text-gray-600 hover:text-onassist-primary transition-all duration-300 hover:scale-105"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Services
            </Button>
          </div>
        </div>

        {/* Hero Section - Reduced top padding */}
        <div className="py-12 bg-gradient-to-r from-onassist-primary via-blue-600 to-purple-700 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
              }}
            ></div>
          </div>

          <div className="container mx-auto px-4 relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left side - Better alignment */}
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
                    <Monitor className="w-10 h-10" />
                  </div>
                  <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                    {service.title}
                  </h1>
                  {service.popular && (
                    <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 px-4 py-2 animate-pulse">
                      <Star className="w-4 h-4 mr-1 fill-current" />
                      Popular
                    </Badge>
                  )}
                </div>
                <p className="text-xl opacity-95 mb-8 leading-relaxed">
                  {service.description}
                </p>

                <div className="flex items-center gap-8 text-lg">
                  <div className="flex items-center gap-3 bg-white/20 px-4 py-3 rounded-xl backdrop-blur-md">
                    <Clock className="w-6 h-6" />
                    <span className="font-semibold">{service.duration}</span>
                  </div>
                  <div className="text-4xl font-bold bg-gradient-to-r from-yellow-300 to-yellow-100 bg-clip-text text-transparent">
                    ${service.price}
                  </div>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
                <img
                  src={service.image_url}
                  alt={service.title}
                  className="relative w-full h-96 object-cover rounded-2xl shadow-2xl transform group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Rest of the component remains the same */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Service Details */}
            <div className="lg:col-span-2 space-y-8">
              <Card className="shadow-2xl border-0 overflow-hidden bg-white">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                      <Monitor className="w-8 h-8" />
                    </div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                      Service Overview
                    </h2>
                  </div>

                  <div className="prose prose-lg max-w-none">
                    <p className="text-gray-700 leading-relaxed mb-8 text-lg">
                      {service.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Booking Sidebar */}
            <div className="space-y-6">
              <Card className="shadow-2xl border-0 sticky top-32 bg-white overflow-hidden">
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <div className="text-5xl font-bold bg-gradient-to-r from-onassist-primary to-blue-600 bg-clip-text text-transparent mb-3">
                      ${service.price}
                    </div>
                    <div className="flex items-center justify-center gap-2 text-gray-600 bg-gray-50 rounded-lg px-4 py-2">
                      <Clock className="w-5 h-5" />
                      <span className="font-medium">{service.duration}</span>
                    </div>
                  </div>

                  <Separator className="my-8" />

                  <div className="space-y-4 mb-8">
                    <Label htmlFor="zipCode" className="text-lg font-semibold">
                      Enter Your ZIP Code
                    </Label>
                    <Input
                      id="zipCode"
                      type="text"
                      placeholder="12345"
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                      className="text-lg py-6 px-4 rounded-xl border-2 focus:border-onassist-primary"
                    />
                  </div>

                  <Button
                    onClick={handleAddToCart}
                    disabled={!zipCode.trim()}
                    className="w-full bg-gradient-to-r from-onassist-primary to-onassist-dark hover:from-onassist-dark hover:to-onassist-primary text-xl py-8 mb-6 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    size="lg"
                  >
                    Add to Cart
                  </Button>

                  <div className="space-y-4">
                    <div className="flex items-center justify-center gap-3 text-gray-700 bg-green-50 p-3 rounded-lg border border-green-200">
                      <Shield className="w-5 h-5 text-green-600" />
                      <span className="font-medium">Service Guarantee</span>
                    </div>
                    <div className="flex items-center justify-center gap-3 text-gray-700 bg-blue-50 p-3 rounded-lg border border-blue-200">
                      <span className="font-medium">Same-day availability</span>
                    </div>
                    <div className="flex items-center justify-center gap-3 text-gray-700 bg-purple-50 p-3 rounded-lg border border-purple-200">
                      <Award className="w-5 h-5 text-purple-600" />
                      <span className="font-medium">Expert technicians</span>
                    </div>
                  </div>

                  <Separator className="my-8" />

                  <div className="text-center space-y-4">
                    <h3 className="font-semibold text-lg flex items-center justify-center gap-2">
                      <Phone className="w-5 h-5 text-onassist-primary" />
                      Need Help?
                    </h3>
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <p className="text-sm text-gray-600 mb-2">Call our support team</p>
                      <p className="font-bold text-lg text-onassist-primary">{siteConfig.contactPhone}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ServiceDetailPage;
