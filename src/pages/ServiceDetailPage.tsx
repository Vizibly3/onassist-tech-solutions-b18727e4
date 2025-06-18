import React, { useMemo, useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import NeedHelpBox from "@/components/services/NeedHelpBox";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Helmet } from "react-helmet-async";
import { siteConfig } from "@/config/site";
import { useServiceBySlug, useCategoryBySlug } from "@/hooks/useServices";
import { useCart } from "@/contexts/CartContext";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrowLeft,
  Clock,
  Star,
  CheckCircle,
  Phone,
  Globe,
  Home,
  ShoppingCart,
  Users,
  Award,
  Zap,
  Shield,
  Wrench,
  Monitor,
  Headphones,
  Settings,
  MessageCircle,
  ThumbsUp,
  Calendar,
  TrendingUp,
  FileCheck,
  MapPin,
  Sparkles,
  Heart,
  Target,
  Cpu,
  Wifi,
  Database,
  Code,
  Smartphone,
  Laptop,
  HardDrive,
  Play,
  Quote,
  AlertCircle,
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useToast } from "@/hooks/use-toast";
import { testimonialsData } from "@/utils/testimonialsData";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { ServiceLead } from "@/types/supabase";

// Add this at the top of the file, after imports
const gradientAnimation = `
  @keyframes gradient-x {
    0% {
      background-position: 0% 0%;
    }
    50% {
      background-position: 100% 0%;
    }
    100% {
      background-position: 0% 0%;
    }
  }

  .gradient-border {
    position: relative;
    border-radius: 1.5rem;
    padding: 2px;
    background: linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899, #3b82f6);
    background-size: 300% 100%;
    animation: gradient-x 3s linear infinite;
  }

  .gradient-border::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 1.5rem;
    padding: 2px;
    background: linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899, #3b82f6);
    background-size: 300% 100%;
    animation: gradient-x 3s linear infinite;
    -webkit-mask: 
      linear-gradient(#fff 0 0) content-box, 
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
  }
`;

const ServiceDetailPage = () => {
  const { serviceSlug } = useParams();

  const navigate = useNavigate();
  const {
    data: service,
    isLoading,
    error,
  } = useServiceBySlug(serviceSlug || "");
  const { addToCart } = useCart();
  const { toast: useToastToast } = useToast();

  // Get category data for breadcrumb
  const { data: category } = useCategoryBySlug(
    service
      ? service.title
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, "")
      : ""
  );

  // Get random testimonials
  const randomTestimonials = useMemo(() => {
    const shuffled = [...testimonialsData].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 2);
  }, []);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    preferredDateTime: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update service field whenever service data changes
  useEffect(() => {
    if (service) {
      setFormData((prev) => ({
        ...prev,
        service: service.title,
      }));
    }
  }, [service]);

  const handleGoBack = () => {
    navigate("/services");
  };

  const handleAddToCart = () => {
    if (service) {
      addToCart(service);
      toast.success(`${service.title} has been added to your cart.`);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone validation
    const phoneRegex = /^\+[1-9]\d{9,14}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone =
        "Please enter a valid phone number with country code (e.g., +1234567890)";
    }

    // DateTime validation
    if (!formData.preferredDateTime) {
      newErrors.preferredDateTime = "Preferred date and time is required";
    } else {
      const selectedDate = new Date(formData.preferredDateTime);
      const now = new Date();

      if (selectedDate < now) {
        newErrors.preferredDateTime = "Please select a future date and time";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    // Special handling for phone number
    if (name === "phone") {
      // Remove any spaces or special characters except +
      const cleanedValue = value.replace(/[^\d+]/g, "");
      // Ensure only one + at the start
      const formattedValue = cleanedValue.startsWith("+")
        ? "+" + cleanedValue.slice(1).replace(/\+/g, "")
        : "+" + cleanedValue;

      setFormData((prev) => ({
        ...prev,
        [name]: formattedValue,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form", {
        description: "All fields are required and must be valid",
        duration: 5000,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Format the data for Supabase
      const leadData: Omit<ServiceLead, "id" | "created_at" | "updated_at"> = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        service: formData.service.trim(),
        preferred_datetime: formData.preferredDateTime,
        message: formData.message.trim() || null,
        status: "pending",
      };

      // Insert into Supabase
      const { data, error } = await supabase
        .from("service_leads")
        .insert([leadData])
        .select()
        .single();

      if (error) {
        throw error;
      }

      // Show success toast
      toast.success("Request submitted successfully!", {
        description: "We'll contact you shortly to confirm your appointment.",
        duration: 5000,
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: service?.title || "",
        preferredDateTime: "",
        message: "",
      });
      setErrors({});
    } catch (error: unknown) {
      console.error("Error submitting form:", error);

      // Show error toast with specific message
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Please try again later or contact support.";

      toast.error("Failed to submit request", {
        description: errorMessage,
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (error) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 flex items-center justify-center">
          <div className="text-center bg-white rounded-3xl shadow-2xl p-12 max-w-md mx-4">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <MessageCircle className="w-10 h-10 text-red-500" />
            </div>
            <h1 className="text-3xl font-bold mb-4 text-gray-900">
              Service Not Found
            </h1>
            <p className="text-gray-600 mb-8 leading-relaxed">
              The service you're looking for doesn't exist or has been moved.
            </p>
            <Button
              onClick={handleGoBack}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Services
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  if (isLoading || !service) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
          <div className="container mx-auto px-4 py-16">
            <div className="animate-pulse">
              <Skeleton className="h-12 w-96 mb-8 rounded-xl" />
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                  <Skeleton className="h-96 w-full rounded-3xl" />
                  <Skeleton className="h-32 w-full rounded-2xl" />
                  <Skeleton className="h-48 w-full rounded-2xl" />
                </div>
                <div className="space-y-6">
                  <Skeleton className="h-64 w-full rounded-2xl" />
                  <Skeleton className="h-48 w-full rounded-2xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <style>{gradientAnimation}</style>
      <Helmet>
        <title>
          {service.title} | {siteConfig.name}
        </title>
        <meta name="description" content={service.description} />
      </Helmet>

      {/* Hero Breadcrumb */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 to-transparent"></div>
        {/* Animated background elements */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

        <div className="container mx-auto px-4 py-8 relative z-10">
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link
                    to="/"
                    className="flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-300"
                  >
                    <Home className="w-4 h-4" />
                    Home
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-white/60" />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link
                    to="/services"
                    className="text-white/80 hover:text-white transition-colors duration-300"
                  >
                    Services
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-white/60" />
              <BreadcrumbItem>
                <BreadcrumbPage className="font-medium text-white">
                  {service.title}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex items-center gap-4">
            <Button
              onClick={handleGoBack}
              variant="ghost"
              className="text-white hover:bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Services
            </Button>
            {service.popular && (
              <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 px-4 py-2 text-sm font-semibold rounded-full shadow-lg animate-bounce">
                <Star className="w-4 h-4 mr-1 fill-current" />
                Trending
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-gradient-to-br from-gray-50 via-white to-blue-50 min-h-screen">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Service Header with Image */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
                <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden">
                  <div className="relative">
                    <img
                      src={service.image_url}
                      alt={service.title}
                      className="w-full h-80 md:h-96 object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

                    {/* Play button overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/30">
                        <Play className="w-8 h-8 text-white ml-1" />
                      </div>
                    </div>

                    {service.popular && (
                      <div className="absolute top-6 right-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full font-semibold shadow-lg">
                        <Sparkles className="w-4 h-4 inline mr-1" />
                        Popular Choice
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Service Title & Description */}
              <div className="space-y-6">
                <div>
                  <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-6 leading-tight">
                    {service.title}
                  </h1>
                  <p className="text-xl md:text-2xl text-gray-600 leading-relaxed font-light">
                    {service.description}
                  </p>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="group">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-8 rounded-3xl text-white shadow-2xl transition-all duration-300 hover:shadow-3xl hover:-translate-y-2">
                      <div className="text-4xl font-bold mb-2">
                        ${service.price}
                      </div>
                      <div className="text-blue-100 font-medium">
                        Starting Price
                      </div>
                      <div className="mt-4 text-blue-200 text-sm">
                        Professional Rate
                      </div>
                    </div>
                  </div>
                  <div className="group">
                    <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-8 rounded-3xl text-white shadow-2xl transition-all duration-300 hover:shadow-3xl hover:-translate-y-2">
                      <div className="flex items-center gap-3 mb-2">
                        <Clock className="w-8 h-8" />
                        <span className="text-4xl font-bold">
                          {service.duration}
                        </span>
                      </div>
                      <div className="text-green-100 font-medium">
                        Service Duration
                      </div>
                      <div className="mt-4 text-green-200 text-sm">
                        Estimated Time
                      </div>
                    </div>
                  </div>
                  <div className="group">
                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-8 rounded-3xl text-white shadow-2xl transition-all duration-300 hover:shadow-3xl hover:-translate-y-2">
                      <div className="flex items-center gap-3 mb-2">
                        <Award className="w-8 h-8" />
                        <span className="text-4xl font-bold">Expert</span>
                      </div>
                      <div className="text-purple-100 font-medium">
                        Certified Tech
                      </div>
                      <div className="mt-4 text-purple-200 text-sm">
                        Professional Grade
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Service Features */}
              <Card className="shadow-2xl border-0 bg-white rounded-3xl overflow-hidden">
                <CardContent className="p-10">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">
                      What's Included
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      "Expert diagnosis and troubleshooting",
                      "Professional installation and setup",
                      "Configuration and optimization",
                      "Quality testing and verification",
                      "30-day service guarantee",
                      "Follow-up support included",
                    ].map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors duration-200"
                      >
                        <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-gray-700 font-medium">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Lead Generation Form */}
              <Card className="shadow-2xl border-0 bg-gradient-to-br from-white to-purple-50 rounded-3xl overflow-hidden">
                <CardContent className="p-10">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                      Request This Service
                    </h2>
                    <p className="text-gray-600">
                      Fill out the form below and we'll get back to you
                    </p>
                  </div>

                  <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                  >
                    {/* Left Column */}
                    <div className="space-y-6">
                      {/* Name Field */}
                      <div className="space-y-2">
                        <label
                          htmlFor="name"
                          className="font-semibold text-gray-700 flex items-center gap-2"
                        >
                          <Users className="w-5 h-5 text-blue-500" /> Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Your full name"
                          className={`w-full p-3 rounded-xl border ${
                            errors.name ? "border-red-500" : "border-gray-300"
                          } focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition`}
                        />
                        {errors.name && (
                          <p className="text-red-500 text-sm flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.name}
                          </p>
                        )}
                      </div>

                      {/* Email Field */}
                      <div className="space-y-2">
                        <label
                          htmlFor="email"
                          className="font-semibold text-gray-700 flex items-center gap-2"
                        >
                          <MessageCircle className="w-5 h-5 text-purple-500" />{" "}
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="your.email@example.com"
                          className={`w-full p-3 rounded-xl border ${
                            errors.email ? "border-red-500" : "border-gray-300"
                          } focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition`}
                        />
                        {errors.email && (
                          <p className="text-red-500 text-sm flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.email}
                          </p>
                        )}
                      </div>

                      {/* Phone Field */}
                      <div className="space-y-2">
                        <label
                          htmlFor="phone"
                          className="font-semibold text-gray-700 flex items-center gap-2"
                        >
                          <Phone className="w-5 h-5 text-green-500" /> Phone
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+1 234 567 8900"
                          className={`w-full p-3 rounded-xl border ${
                            errors.phone ? "border-red-500" : "border-gray-300"
                          } focus:ring-2 focus:ring-green-400 focus:border-green-400 transition`}
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-sm flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.phone}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                      {/* Service Field (Pre-filled) */}
                      <div className="space-y-2">
                        <label
                          htmlFor="service"
                          className="font-semibold text-gray-700 flex items-center gap-2"
                        >
                          <Wrench className="w-5 h-5 text-yellow-500" /> Service
                        </label>
                        <input
                          type="text"
                          id="service"
                          name="service"
                          value={formData.service}
                          readOnly
                          className="w-full p-3 rounded-xl border border-gray-300 bg-gray-50 text-gray-500"
                        />
                      </div>

                      {/* Preferred Date & Time Field */}
                      <div className="space-y-2">
                        <label
                          htmlFor="preferredDateTime"
                          className="font-semibold text-gray-700 flex items-center gap-2"
                        >
                          <Calendar className="w-5 h-5 text-pink-500" />{" "}
                          Preferred Date & Time
                        </label>
                        <input
                          type="datetime-local"
                          id="preferredDateTime"
                          name="preferredDateTime"
                          value={formData.preferredDateTime}
                          onChange={handleInputChange}
                          min={new Date().toISOString().slice(0, 16)}
                          step="1"
                          className={`w-full p-3 rounded-xl border ${
                            errors.preferredDateTime
                              ? "border-red-500"
                              : "border-gray-300"
                          } focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition`}
                        />
                        {errors.preferredDateTime && (
                          <p className="text-red-500 text-sm flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.preferredDateTime}
                          </p>
                        )}
                      </div>

                      {/* Message Field */}
                      <div className="space-y-2">
                        <label
                          htmlFor="message"
                          className="font-semibold text-gray-700 flex items-center gap-2"
                        >
                          <MessageCircle className="w-5 h-5 text-blue-500" />{" "}
                          Message
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="Any additional information or requirements..."
                          rows={4}
                          className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition resize-none"
                        />
                      </div>
                    </div>

                    {/* Submit Button - Full Width */}
                    <div className="md:col-span-2">
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? "Submitting..." : "Submit Request"}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>

              {/* Service Process */}
              <Card className="shadow-2xl border-0 bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl overflow-hidden">
                <CardContent className="p-10">
                  <div className="text-center mb-10">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                      Our Service Process
                    </h2>
                    <p className="text-gray-600 text-lg">
                      Simple steps to get your technology working perfectly
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                      {
                        icon: Calendar,
                        title: "Book Service",
                        desc: "Schedule your appointment online or by phone",
                        step: 1,
                        color: "from-blue-500 to-blue-600",
                      },
                      {
                        icon: Users,
                        title: "Expert Arrives",
                        desc: "Certified technician arrives at your location",
                        step: 2,
                        color: "from-green-500 to-emerald-600",
                      },
                      {
                        icon: Wrench,
                        title: "Professional Work",
                        desc: "Expert diagnosis and quality service delivery",
                        step: 3,
                        color: "from-purple-500 to-purple-600",
                      },
                      {
                        icon: ThumbsUp,
                        title: "Satisfaction",
                        desc: "Service completion with guarantee and support",
                        step: 4,
                        color: "from-orange-500 to-red-500",
                      },
                    ].map((process, index) => (
                      <div key={index} className="text-center group">
                        <div className="relative mb-6">
                          <div
                            className={`w-20 h-20 bg-gradient-to-br ${process.color} rounded-3xl flex items-center justify-center mx-auto shadow-lg group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110`}
                          >
                            <process.icon className="w-10 h-10 text-white" />
                          </div>
                          <div className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-lg">
                            {process.step}
                          </div>
                        </div>
                        <h3 className="font-bold text-xl mb-3 text-gray-900">
                          {process.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {process.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Technology & Tools */}
              <Card className="shadow-2xl border-0 bg-gradient-to-br from-gray-900 to-blue-900 text-white rounded-3xl overflow-hidden">
                <CardContent className="p-10">
                  <div className="text-center mb-10">
                    <h2 className="text-4xl font-bold mb-4">
                      Professional Tools & Technology
                    </h2>
                    <p className="text-gray-300 text-lg">
                      Cutting-edge equipment for superior results
                    </p>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                      {
                        icon: Monitor,
                        name: "Advanced Diagnostics",
                        color: "from-blue-400 to-blue-500",
                      },
                      {
                        icon: Settings,
                        name: "Professional Tools",
                        color: "from-green-400 to-emerald-500",
                      },
                      {
                        icon: Shield,
                        name: "Security Software",
                        color: "from-purple-400 to-purple-500",
                      },
                      {
                        icon: Headphones,
                        name: "Remote Support",
                        color: "from-orange-400 to-red-500",
                      },
                    ].map((tool, index) => (
                      <div
                        key={index}
                        className="text-center bg-white/10 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:bg-white/20 transition-all duration-300 hover:scale-105 border border-white/10"
                      >
                        <div
                          className={`w-16 h-16 bg-gradient-to-r ${tool.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}
                        >
                          <tool.icon className="w-8 h-8 text-white" />
                        </div>
                        <p className="font-semibold text-sm">{tool.name}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <NeedHelpBox serviceTitle={service.title} />

              {/* Booking Card */}
              <Card className="relative shadow-2xl border-0 bg-gradient-to-br from-white to-blue-50 rounded-3xl overflow-hidden">
                <div className="gradient-border">
                  <CardContent className="p-8 relative z-10 bg-gradient-to-br from-white to-blue-50 rounded-3xl">
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        Book This Service
                      </h3>
                      <p className="text-gray-600">
                        Professional service at your fingertips
                      </p>
                    </div>

                    <div className="space-y-6">
                      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-gray-600 font-medium">
                            Service Price:
                          </span>
                          <div className="text-right">
                            <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                              ${service.price}
                            </span>
                            <div className="text-sm text-gray-500">
                              Starting from
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 font-medium">
                            Duration:
                          </span>
                          <div className="flex items-center gap-2 text-gray-800">
                            <Clock className="w-4 h-4" />
                            <span className="font-semibold">
                              {service.duration}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <Button
                          onClick={handleAddToCart}
                          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                        >
                          <ShoppingCart className="w-5 h-5 mr-2" />
                          Add to Cart
                        </Button>

                        <Button
                          variant="outline"
                          className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-bold py-4 rounded-2xl transition-all duration-300 transform hover:scale-105"
                          onClick={() =>
                            window.open(
                              `tel:${siteConfig.contactPhone}`,
                              "_self"
                            )
                          }
                        >
                          <Phone className="w-5 h-5 mr-2" />
                          Call to Book Now
                        </Button>
                      </div>

                      <div className="text-center">
                        <div className="text-sm text-gray-500 mb-2">
                          Quick Response
                        </div>
                        <div className="flex items-center justify-center gap-2 text-green-600">
                          <CheckCircle className="w-4 h-4" />
                          <span className="font-medium">
                            Usually responds in 1 hour
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>

              {/* Service Statistics */}
              <Card className="shadow-2xl border-0 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl overflow-hidden">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Service Statistics
                    </h3>
                    <p className="text-gray-600">
                      Numbers that speak for our quality
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    {[
                      {
                        number: "99%",
                        label: "Success Rate",
                        icon: TrendingUp,
                        color: "text-green-600",
                      },
                      {
                        number: "500+",
                        label: "Happy Customers",
                        icon: Heart,
                        color: "text-red-500",
                      },
                      {
                        number: "24/7",
                        label: "Support Available",
                        icon: Phone,
                        color: "text-blue-600",
                      },
                      {
                        number: "30 Day",
                        label: "Guarantee",
                        icon: Shield,
                        color: "text-purple-600",
                      },
                    ].map((stat, index) => (
                      <div key={index} className="text-center group">
                        <div
                          className={`${stat.color} mb-4 flex justify-center`}
                        >
                          <stat.icon className="w-8 h-8 group-hover:scale-110 transition-transform duration-300" />
                        </div>
                        <div className="text-2xl font-bold text-gray-900 mb-1">
                          {stat.number}
                        </div>
                        <div className="text-sm text-gray-600 font-medium">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Tech Expertise Areas */}
              <Card className="shadow-2xl border-0 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-3xl overflow-hidden">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Our Tech Expertise
                    </h3>
                    <p className="text-gray-600">
                      Specialized knowledge across all technology domains
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      {
                        icon: Laptop,
                        name: "Laptops",
                        color: "from-blue-500 to-blue-600",
                      },
                      {
                        icon: Smartphone,
                        name: "Mobile",
                        color: "from-green-500 to-emerald-600",
                      },
                      {
                        icon: Monitor,
                        name: "Desktops",
                        color: "from-purple-500 to-purple-600",
                      },
                      {
                        icon: HardDrive,
                        name: "Storage",
                        color: "from-orange-500 to-red-500",
                      },
                    ].map((tech, index) => (
                      <div key={index} className="text-center group">
                        <div
                          className={`w-14 h-14 bg-gradient-to-r ${tech.color} rounded-2xl flex items-center justify-center mx-auto mb-2 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}
                        >
                          <tech.icon className="w-7 h-7 text-white" />
                        </div>
                        <p className="font-semibold text-gray-800 text-sm">
                          {tech.name}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Service Guarantee */}
              <Card className="shadow-2xl border-0 bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl overflow-hidden">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Shield className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">
                      Service Guarantee
                    </h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="font-medium text-gray-800 text-sm">
                        30-day service warranty
                      </span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="font-medium text-gray-800 text-sm">
                        100% satisfaction guaranteed
                      </span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="font-medium text-gray-800 text-sm">
                        Free follow-up support
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <Card className="shadow-2xl border-0 bg-gradient-to-br from-gray-900 to-blue-900 text-white rounded-3xl overflow-hidden">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold mb-6 text-center">
                    Need Help?
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                      <Phone className="w-5 h-5 text-blue-300" />
                      <div>
                        <div className="font-medium">Call Us</div>
                        <div className="text-sm text-gray-300">
                          24/7 Support
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                      <MessageCircle className="w-5 h-5 text-green-300" />
                      <div>
                        <div className="font-medium">Live Chat</div>
                        <div className="text-sm text-gray-300">
                          Instant Response
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                      <MapPin className="w-5 h-5 text-purple-300" />
                      <div>
                        <div className="font-medium">On-Site Service</div>
                        <div className="text-sm text-gray-300">
                          At Your Location
                        </div>
                      </div>
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
