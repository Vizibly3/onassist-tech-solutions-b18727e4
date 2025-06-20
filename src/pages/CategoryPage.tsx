import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import ServiceCard from "@/components/services/ServiceCard";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";
import { siteConfig } from "@/config/site";
import { useServicesByCategory, useCategoryBySlug } from "@/hooks/useServices";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import {
  ArrowLeft,
  Phone,
  MessageCircle,
  CheckCircle,
  Star,
  Award,
  Users,
  Zap,
  Shield,
  AlertCircle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { testimonialsData } from "@/utils/testimonialsData";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Country codes for phone numbers
const countryCodes = [
  { code: "+1", country: "United States" },
  { code: "+44", country: "United Kingdom" },
  { code: "+91", country: "India" },
  { code: "+61", country: "Australia" },
  { code: "+86", country: "China" },
  { code: "+81", country: "Japan" },
  { code: "+49", country: "Germany" },
  { code: "+33", country: "France" },
  { code: "+39", country: "Italy" },
  { code: "+34", country: "Spain" },
];

const CategoryPage = () => {
  const { categorySlug } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    preferredTime: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const {
    data: services,
    isLoading,
    error,
  } = useServicesByCategory(categorySlug || "");
  const { data: category } = useCategoryBySlug(categorySlug || "");

  const getRandomTestimonials = () => {
    const arr = [...testimonialsData];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.slice(0, 3);
  };
  const randomTestimonials = getRandomTestimonials();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    // Phone validation
    const phoneRegex = /^\+[1-9]\d{9,14}$/; // Must start with + and have 10-15 digits
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone =
        "Please enter a valid phone number starting with + and country code (e.g., +1234567890)";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Address validation
    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    // Preferred time validation
    if (!formData.preferredTime) {
      newErrors.preferredTime = "Preferred time is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
      toast.error("Please fix the errors in the form");
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("category_service_leads").insert([
        {
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          address: formData.address,
          category_slug: categorySlug,
          category_name: categoryTitle,
          preferred_time: formData.preferredTime,
          message: formData.message || null,
          status: "pending",
        },
      ]);

      if (error) {
        console.error("Error submitting form:", error);
        if (error.code === "23505") {
          toast.error("A request with this information already exists");
        } else if (error.code === "22P02") {
          toast.error("Invalid data format. Please check your input");
        } else {
          toast.error("Unable to submit request. Please try again");
        }
        return;
      }

      toast.success("Request submitted successfully! We'll contact you soon.");

      // Reset form
      setFormData({
        name: "",
        phone: "",
        email: "",
        address: "",
        preferredTime: "",
        message: "",
      });
      setErrors({});
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An unexpected error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (error) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Category not found</h1>
            <p className="text-gray-600 mb-6">
              The category you're looking for doesn't exist.
            </p>
            <Link to="/services">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Services
              </Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <Skeleton className="h-8 w-64 mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-80 rounded-lg" />
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  const categoryTitle =
    categorySlug
      ?.split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ") || "Services";

  return (
    <Layout>
      <Helmet>
        <title>
          {categoryTitle} | {siteConfig.name}
        </title>
        <meta
          name="description"
          content={`Professional ${categoryTitle.toLowerCase()} services. Expert technicians providing reliable solutions.`}
        />
      </Helmet>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-onassist-primary via-blue-600 to-purple-700 text-white py-28 overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-purple-600/30"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_64px_1.2fr] gap-0 lg:gap-0 items-center">
            {/* Left: Hero Content */}
            <div className="text-center lg:text-left pr-0 lg:pr-20">
              {category?.image_url && (
                <div className="mb-8 flex justify-center lg:justify-start">
                  <img
                    src={category.image_url}
                    alt={categoryTitle}
                    className="w-36 h-36 rounded-full object-cover border-4 border-white/40 shadow-2xl ring-4 ring-blue-200/30 mx-auto lg:mx-0"
                  />
                </div>
              )}
              <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent drop-shadow-lg">
                {categoryTitle}
              </h1>
              <p className="text-2xl md:text-3xl mb-10 opacity-95 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
                {category?.description ||
                  `Professional ${categoryTitle.toLowerCase()} services by certified technicians with years of experience`}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
                <Button
                  size="lg"
                  className="bg-white text-onassist-primary hover:bg-gray-100 text-lg px-10 py-6 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1 font-semibold border-2 border-white"
                  onClick={() =>
                    window.open(`tel:${siteConfig.contactPhone}`, "_self")
                  }
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now - Get Instant Help
                </Button>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-orange-500 to-yellow-400 text-white hover:from-orange-600 hover:to-yellow-500 border-0 text-lg px-10 py-6 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1 font-semibold"
                  onClick={() => window.open("/contact", "_self")}
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Get Free Quote
                </Button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center lg:text-left">
                {[
                  { icon: Users, label: "50+ Experts", value: "Certified" },
                  {
                    icon: Star,
                    label: "4.9/5 Rating",
                    value: "Customer Satisfaction",
                  },
                  { icon: Award, label: "Licensed", value: "Insured & Bonded" },
                  { icon: Zap, label: "Same Day", value: "Service Available" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:scale-105 transition-transform duration-300"
                  >
                    <item.icon className="w-10 h-10 mx-auto mb-2 text-white" />
                    <div className="text-base font-semibold">{item.label}</div>
                    <div className="text-xs opacity-80">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* Divider for large screens */}
            <div className="hidden lg:flex justify-center items-center h-full">
              <div className="w-1 h-[560px] bg-gradient-to-b from-white/10 via-white/40 to-white/10 mx-auto rounded-full"></div>
            </div>
            {/* Right: Lead Generation Form */}
            <div className="relative flex justify-center items-center mt-16 lg:mt-0">
              <div className="absolute inset-0 blur-xl bg-gradient-to-br from-blue-200/30 via-purple-200/30 to-white/30 rounded-3xl z-0"></div>
              <div className="relative bg-white/95 p-14 rounded-3xl shadow-2xl border border-blue-100 max-w-xl w-full flex flex-col justify-center min-h-[560px] lg:ml-0 lg:mr-4">
                <h2 className="text-3xl font-extrabold mb-6 text-center text-onassist-primary drop-shadow">
                  Request a Service
                </h2>
                <form
                  onSubmit={handleSubmit}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="name"
                      className="font-semibold text-gray-700 flex items-center gap-2"
                    >
                      <Users className="w-5 h-5 text-blue-500" /> Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Full Name"
                      className={`p-3 rounded-xl border ${
                        errors.name ? "border-red-500" : "border-gray-300"
                      } focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition`}
                      required
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="phone"
                      className="font-semibold text-gray-700 flex items-center gap-2"
                    >
                      <Phone className="w-5 h-5 text-green-500" /> Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+1 234 567 8900 (with country code)"
                      className={`p-3 rounded-xl border ${
                        errors.phone ? "border-red-500" : "border-gray-300"
                      } focus:ring-2 focus:ring-green-400 focus:border-green-400 transition`}
                      required
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="email"
                      className="font-semibold text-gray-700 flex items-center gap-2"
                    >
                      <MessageCircle className="w-5 h-5 text-purple-500" />{" "}
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Email Address"
                      className={`p-3 rounded-xl border ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      } focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition`}
                      required
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="address"
                      className="font-semibold text-gray-700 flex items-center gap-2"
                    >
                      <Shield className="w-5 h-5 text-blue-400" /> Address
                    </label>
                    <textarea
                      name="address"
                      id="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Your Address"
                      className={`p-3 rounded-xl border ${
                        errors.address ? "border-red-500" : "border-gray-300"
                      } focus:ring-2 focus:ring-blue-200 focus:border-blue-200 transition`}
                      rows={2}
                      required
                    />
                    {errors.address && (
                      <p className="text-red-500 text-sm flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.address}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="category"
                      className="font-semibold text-gray-700 flex items-center gap-2"
                    >
                      <Award className="w-5 h-5 text-yellow-500" /> Service
                      Category
                    </label>
                    <input
                      type="text"
                      name="category"
                      id="category"
                      value={categoryTitle}
                      readOnly
                      className="p-3 rounded-xl border border-gray-300 bg-gray-100 text-gray-500"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="preferredTime"
                      className="font-semibold text-gray-700 flex items-center gap-2"
                    >
                      <Zap className="w-5 h-5 text-pink-500" /> Preferred
                      Date/Time
                    </label>
                    <input
                      type="datetime-local"
                      name="preferredTime"
                      id="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleInputChange}
                      className={`p-3 rounded-xl border ${
                        errors.preferredTime
                          ? "border-red-500"
                          : "border-gray-300"
                      } focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition`}
                      required
                    />
                    {errors.preferredTime && (
                      <p className="text-red-500 text-sm flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.preferredTime}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 md:col-span-2">
                    <label
                      htmlFor="message"
                      className="font-semibold text-gray-700 flex items-center gap-2"
                    >
                      <MessageCircle className="w-5 h-5 text-blue-500" />{" "}
                      Message / Description
                    </label>
                    <textarea
                      name="message"
                      id="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Message / Description"
                      className="p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                      rows={4}
                    />
                  </div>

                  <label className="flex items-center gap-3 mt-2 md:col-span-2">
                    <input
                      type="checkbox"
                      required
                      className="w-5 h-5 accent-blue-600"
                    />
                    <span className="text-sm text-gray-600">
                      I consent to the processing of my data for service request
                      purposes.
                    </span>
                  </label>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-onassist-primary to-blue-600 hover:from-blue-700 hover:to-onassist-primary text-white font-bold text-lg shadow-xl py-4 mt-2 md:col-span-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Request"}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="mb-8">
          <Link to="/services">
            <Button variant="ghost" className="mb-6 hover:bg-gray-100">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to All Services
            </Button>
          </Link>

          <h2 className="text-4xl font-bold mb-4">
            Available {categoryTitle} Services
          </h2>
          <p className="text-xl text-gray-600">
            Choose from our comprehensive range of professional services
          </p>
        </div>

        {services && services.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {services.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>

            <div className="bg-gradient-to-r from-onassist-primary to-blue-600 rounded-3xl p-12 text-white text-center">
              <h3 className="text-3xl font-bold mb-6">
                What's Included in Every Service
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  "Professional Diagnosis",
                  "Expert Installation",
                  "Quality Testing",
                  "30-Day Guarantee",
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 bg-white/10 rounded-xl p-4"
                  >
                    <CheckCircle className="w-6 h-6 text-green-300 flex-shrink-0" />
                    <span className="font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-2xl font-semibold mb-4">No services found</h3>
            <p className="text-gray-600 mb-8 text-lg">
              There are currently no services in this category.
            </p>
            <Link to="/services">
              <Button size="lg">Browse All Services</Button>
            </Link>
          </div>
        )}
      </div>

      {/* New Section: How It Works */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-14">
            <h2 className="text-4xl font-extrabold mb-4 text-onassist-primary">
              How It Works
            </h2>
            <p className="text-lg text-gray-600">
              Our simple process ensures you get the help you need, fast.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                icon: MessageCircle,
                title: "1. Submit Request",
                desc: "Fill out our quick form with your details and service needs.",
              },
              {
                icon: Phone,
                title: "2. Get a Call",
                desc: "Our team will contact you to confirm your requirements and schedule.",
              },
              {
                icon: CheckCircle,
                title: "3. Service Delivered",
                desc: "A certified technician arrives and completes your service efficiently.",
              },
            ].map((step, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 shadow-lg flex flex-col items-center hover:scale-105 transition-transform duration-300"
              >
                <step.icon className="w-12 h-12 mb-4 text-onassist-primary" />
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Nationwide Service Coverage - Redesigned */}
      <div className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-100">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 mb-10 lg:mb-0">
            <h2 className="text-4xl font-extrabold mb-4 text-onassist-primary">
              Nationwide Service Coverage
            </h2>
            <p className="text-xl text-gray-700 mb-8 max-w-lg">
              No matter where you are, our certified experts are available to
              provide prompt and reliable services in your area. We cover all
              major cities and towns, ensuring you get the help you need, when
              you need it.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center border border-blue-100">
                <Users className="w-8 h-8 text-blue-500 mb-2" />
                <div className="font-bold text-lg">100+ Cities</div>
                <div className="text-gray-500 text-sm">Served Nationwide</div>
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center border border-blue-100">
                <Shield className="w-8 h-8 text-green-500 mb-2" />
                <div className="font-bold text-lg">Certified Experts</div>
                <div className="text-gray-500 text-sm">Background Checked</div>
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center border border-blue-100">
                <Zap className="w-8 h-8 text-yellow-500 mb-2" />
                <div className="font-bold text-lg">Same Day Service</div>
                <div className="text-gray-500 text-sm">Fast Response</div>
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center border border-blue-100">
                <Star className="w-8 h-8 text-purple-500 mb-2" />
                <div className="font-bold text-lg">4.9/5 Rating</div>
                <div className="text-gray-500 text-sm">
                  Customer Satisfaction
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="relative w-full max-w-xl">
              <img
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
                alt="Nationwide Service Coverage"
                className="w-full h-96 object-cover rounded-3xl shadow-2xl border-4 border-blue-100"
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="bg-gradient-to-br from-blue-400/10 to-purple-400/10 w-full h-full rounded-3xl"></div>
              </div>
              <div className="absolute bottom-6 right-6 bg-white/90 rounded-xl px-6 py-3 shadow-lg flex items-center gap-2 border border-blue-100">
                <CheckCircle className="w-6 h-6 text-green-500" />
                <span className="font-semibold text-gray-700">
                  Service Near You
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section - Uses Real Data */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-10">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {randomTestimonials.map((testimonial) => (
              <Card
                key={testimonial.id}
                className="p-8 shadow-md hover:shadow-xl transition flex flex-col items-center"
              >
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-blue-100 mb-4 shadow"
                />
                <CardContent className="flex-1 flex flex-col items-center">
                  <div className="flex gap-1 mb-2">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">
                    "{testimonial.text}"
                  </p>
                  <h3 className="font-bold text-lg">{testimonial.name}</h3>
                  <div className="text-sm text-gray-500">
                    {testimonial.location} &middot; {testimonial.service}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* New Section: FAQ */}
      <div className="py-20 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-4xl font-extrabold mb-4 text-onassist-primary">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Answers to common questions about our{" "}
              {categoryTitle.toLowerCase()} services.
            </p>
          </div>
          <div className="space-y-6 max-w-2xl mx-auto">
            {[
              {
                q: `How quickly can I get a technician for ${categoryTitle.toLowerCase()}?`,
                a: "We offer same-day and next-day appointments in most areas.",
              },
              {
                q: "Are your technicians certified and insured?",
                a: "Yes, all our professionals are fully certified, insured, and background-checked.",
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept all major credit cards, UPI, and cash on delivery.",
              },
            ].map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow p-6 text-left border-l-4 border-onassist-primary"
              >
                <div className="font-bold text-gray-900 mb-2">Q: {faq.q}</div>
                <div className="text-gray-700">A: {faq.a}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* New Section: Call to Action Banner */}
      <div className="py-16 bg-gradient-to-r from-onassist-primary to-blue-600 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-extrabold mb-4">
            Ready to Experience the Best {categoryTitle} Services?
          </h2>
          <p className="text-lg mb-8">
            Contact us now and let our experts handle your needs with
            professionalism and care.
          </p>
          <Button
            size="lg"
            className="bg-white text-onassist-primary font-bold text-lg px-10 py-5 shadow-xl hover:bg-gray-100"
            onClick={() => window.open("/contact", "_self")}
          >
            Get Started
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryPage;
