import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/contexts/CartContext";
import { useServiceBySlug } from "@/hooks/useServices";
import { Helmet } from "react-helmet-async";
import { siteConfig } from "@/config/site";
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
  Wifi,
  Zap,
  Users,
  Award,
  Phone,
  MapPin,
  Navigation,
  Building,
  Heart,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { usStates } from "@/data/locations";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { techniciansData } from "@/utils/techniciansData";
import { testimonialsData } from "@/utils/testimonialsData";

const StateServiceDetailPage = () => {
  const { country, state, serviceSlug } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const {
    data: service,
    isLoading,
    error,
  } = useServiceBySlug(serviceSlug || "");
  const [zipCode, setZipCode] = useState("");

  // Get state data
  const stateData = usStates.find((s) => s.slug === state);

  const handleAddToCart = () => {
    if (service && zipCode.trim()) {
      addToCart(service);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  // Dynamic service type detection based on title keywords
  const getServiceType = (title: string) => {
    const lowerTitle = title.toLowerCase();
    if (
      lowerTitle.includes("home") ||
      lowerTitle.includes("smart") ||
      lowerTitle.includes("automation")
    ) {
      return "home";
    } else if (
      lowerTitle.includes("computer") ||
      lowerTitle.includes("laptop") ||
      lowerTitle.includes("pc")
    ) {
      return "computer";
    } else if (
      lowerTitle.includes("phone") ||
      lowerTitle.includes("mobile") ||
      lowerTitle.includes("iphone")
    ) {
      return "mobile";
    } else if (
      lowerTitle.includes("audio") ||
      lowerTitle.includes("video") ||
      lowerTitle.includes("tv")
    ) {
      return "av";
    } else if (
      lowerTitle.includes("network") ||
      lowerTitle.includes("wifi") ||
      lowerTitle.includes("internet")
    ) {
      return "network";
    }
    return "general";
  };

  const getServiceIcon = (type: string) => {
    switch (type) {
      case "home":
        return Home;
      case "computer":
        return Monitor;
      case "mobile":
        return Smartphone;
      case "av":
        return Monitor;
      case "network":
        return Wifi;
      default:
        return Wrench;
    }
  };

  const getServiceFeatures = (type: string) => {
    switch (type) {
      case "home":
        return [
          "Professional smart home consultation",
          "Device integration and connectivity",
          "Advanced security configuration",
          "Comprehensive user training",
          "Remote monitoring setup",
          "30-day premium support included",
        ];
      case "computer":
        return [
          "Advanced hardware diagnosis",
          "Software installation and optimization",
          "Performance tuning and upgrades",
          "Data backup and recovery solutions",
          "Virus removal and security setup",
          "90-day warranty on all repairs",
        ];
      case "mobile":
        return [
          "Expert screen repair and replacement",
          "Software troubleshooting and updates",
          "Data transfer and cloud backup",
          "App setup and optimization",
          "Privacy and security configuration",
          "Same-day service available",
        ];
      case "av":
        return [
          "Professional AV installation",
          "High-end calibration and tuning",
          "Custom cable management",
          "Remote control programming",
          "Complete user training",
          "Extended warranty options",
        ];
      case "network":
        return [
          "Network design and setup",
          "WiFi optimization and coverage",
          "Security configuration",
          "Performance monitoring",
          "Troubleshooting and maintenance",
          "Business-grade solutions",
        ];
      default:
        return [
          "Professional consultation",
          "Complete setup and configuration",
          "Testing and optimization",
          "Training and support",
          "Quality guarantee",
          "Follow-up support",
        ];
    }
  };

  const getLayoutVariant = (type: string, title: string) => {
    const titleHash = title.split("").reduce((a, b) => a + b.charCodeAt(0), 0);
    const variants = ["modern", "classic", "premium", "minimal"];
    return variants[titleHash % variants.length];
  };

  // Random technicians and testimonials
  const randomTechnicians = React.useMemo(
    () => getRandomItems(techniciansData, 3),
    []
  );
  const randomTestimonials = React.useMemo(
    () => getRandomItems(testimonialsData, 3),
    []
  );

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

  if (error || !service || !stateData) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Service not found</h1>
            <p className="text-gray-600 mb-6">
              The service or location you're looking for doesn't exist.
            </p>
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
        <title>
          Best {service.title} in {stateData.name} | {siteConfig.name}
        </title>
        <meta
          name="description"
          content={`Professional ${service.title} services throughout ${stateData.name}. Expert technicians serving all cities in ${stateData.name} with guaranteed satisfaction.`}
        />
        <meta
          name="keywords"
          content={`${service.title}, ${stateData.name}, ${stateData.abbreviation}, tech support`}
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
        {/* Breadcrumb */}
        <div className="bg-gray-50 border-b">
          <div className="container mx-auto px-4 py-4">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link
                      to="/"
                      className="flex items-center gap-2 text-gray-600 hover:text-onassist-primary transition-colors"
                    >
                      <Home className="w-4 h-4" />
                      Home
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link
                      to={`/${country}`}
                      className="text-gray-600 hover:text-onassist-primary transition-colors"
                    >
                      United States
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link
                      to={`/${country}/${state}`}
                      className="text-gray-600 hover:text-onassist-primary transition-colors"
                    >
                      {stateData.name}
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="font-medium text-onassist-primary">
                    {service.title}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>

        {/* Hero Section */}
        <div className="relative py-20 bg-gradient-to-br from-onassist-primary via-blue-700 to-purple-800 text-white overflow-hidden">
          {/* Animated SVG Waves */}
          <div className="absolute inset-0 pointer-events-none select-none">
            <svg
              className="absolute top-0 left-0 w-full h-32 opacity-30"
              viewBox="0 0 1440 320"
            >
              <path
                fill="#fff"
                fillOpacity="0.1"
                d="M0,160L48,170.7C96,181,192,203,288,197.3C384,192,480,160,576,133.3C672,107,768,85,864,101.3C960,117,1056,171,1152,186.7C1248,203,1344,181,1392,170.7L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
              ></path>
            </svg>
            <svg
              className="absolute bottom-0 left-0 w-full h-32 opacity-20"
              viewBox="0 0 1440 320"
            >
              <path
                fill="#fff"
                fillOpacity="0.08"
                d="M0,224L48,202.7C96,181,192,139,288,128C384,117,480,139,576,170.7C672,203,768,245,864,229.3C960,213,1056,139,1152,128C1248,117,1344,171,1392,197.3L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              ></path>
            </svg>
          </div>
          <div className="container mx-auto px-4 relative z-10 flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 flex flex-col items-start justify-center">
              <Button
                onClick={handleGoBack}
                variant="ghost"
                className="text-white hover:bg-white/20 mb-8 backdrop-blur-sm"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Services
              </Button>
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-12 mb-6 w-full max-w-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <Monitor className="w-10 h-10 text-yellow-300" />
                  <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-yellow-300 via-white to-blue-200 bg-clip-text text-transparent drop-shadow">
                    {service.title} <span className="text-white">in</span>{" "}
                    <span className="text-yellow-300">{stateData.name}</span>
                  </h1>
                  {service.popular && (
                    <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-yellow-900 border-0 shadow-md">
                      <Star className="w-3 h-3 mr-1 fill-current" />
                      Popular
                    </Badge>
                  )}
                </div>
                <p className="text-xl opacity-90 mb-6 text-white/90">
                  Professional {service.title} services throughout{" "}
                  {stateData.name}. Expert technicians serving all cities in{" "}
                  {stateData.name}.
                </p>
                <div className="flex items-center gap-8 text-lg mb-2">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-yellow-200" />
                    <span>{service.duration}</span>
                  </div>
                  <div className="text-3xl font-bold text-yellow-300">
                    ${service.price}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <div className="relative w-full max-w-md">
                <img
                  src={service.image_url}
                  alt={service.title}
                  className="w-full h-80 object-cover rounded-3xl shadow-2xl border-4 border-white/20 transform hover:scale-105 transition-transform duration-300 bg-white/20"
                  style={{ boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)" }}
                />
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-gradient-to-r from-onassist-primary to-blue-600 text-white px-6 py-2 rounded-full shadow-lg font-semibold text-lg border-2 border-white/30">
                  {service.title}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Service Details */}
            <div className="lg:col-span-2 space-y-8">
              <Card className="shadow-2xl border-0 overflow-hidden bg-white/70 backdrop-blur-xl rounded-3xl">
                <CardContent className="p-10 md:p-14">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-4 rounded-xl bg-gradient-to-br from-blue-100 via-blue-200 to-blue-50 text-onassist-primary shadow-md">
                      <Monitor className="w-7 h-7" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-onassist-primary via-blue-600 to-purple-700 bg-clip-text text-transparent drop-shadow">
                      Service Overview in {stateData.name}
                    </h2>
                  </div>
                  <div className="prose prose-lg max-w-none">
                    <p className="text-gray-700 leading-relaxed mb-8 text-xl font-medium">
                      {service.description}
                    </p>
                    <div className="bg-gradient-to-r from-blue-100 via-white to-indigo-100 p-8 rounded-2xl border-2 border-blue-200 shadow-lg mb-8">
                      <h3 className="text-2xl font-bold mb-6 text-blue-800 flex items-center gap-3">
                        <Building className="w-7 h-7" />
                        Serving All of {stateData.name}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                          <div className="bg-gradient-to-br from-blue-200 to-blue-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 shadow">
                            <MapPin className="w-8 h-8 text-white" />
                          </div>
                          <h4 className="font-semibold mb-2 text-blue-900">
                            Statewide Coverage
                          </h4>
                          <p className="text-sm text-gray-600">
                            Available in all {stateData.name} cities
                          </p>
                        </div>
                        <div className="text-center">
                          <div className="bg-gradient-to-br from-yellow-200 to-yellow-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 shadow">
                            <Zap className="w-8 h-8 text-yellow-700" />
                          </div>
                          <h4 className="font-semibold mb-2 text-yellow-700">
                            Fast Response
                          </h4>
                          <p className="text-sm text-gray-600">
                            Quick service throughout {stateData.abbreviation}
                          </p>
                        </div>
                        <div className="text-center">
                          <div className="bg-gradient-to-br from-green-200 to-green-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 shadow">
                            <Users className="w-8 h-8 text-green-700" />
                          </div>
                          <h4 className="font-semibold mb-2 text-green-700">
                            Local Experts
                          </h4>
                          <p className="text-sm text-gray-600">
                            Certified technicians in {stateData.name}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Booking Sidebar with Zip Code */}
            <div className="space-y-6">
              <Card className="shadow-2xl border-0 sticky top-24 bg-white/80 backdrop-blur-xl rounded-3xl">
                <CardContent className="p-8 md:p-10">
                  <div className="text-center mb-8">
                    <div className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-onassist-primary to-blue-600 text-white text-3xl font-extrabold shadow-lg mb-3">
                      ${service.price}
                    </div>
                    <div className="flex items-center justify-center gap-2 text-lg text-onassist-primary font-semibold mb-2">
                      <Clock className="w-5 h-5" />
                      <span>{service.duration}</span>
                    </div>
                  </div>
                  <Separator className="my-6" />
                  {/* Zip Code Input */}
                  <div className="space-y-4 mb-8">
                    <Label
                      htmlFor="zipCode"
                      className="text-base font-semibold flex items-center gap-2 text-onassist-primary"
                    >
                      <MapPin className="w-5 h-5" />
                      Enter Your Zip Code
                    </Label>
                    <Input
                      id="zipCode"
                      type="text"
                      placeholder="e.g., 12345"
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                      className="text-center text-lg rounded-full border-2 border-onassist-primary/30 focus:border-onassist-primary focus:ring-2 focus:ring-onassist-primary/20 shadow-sm"
                    />
                    <p className="text-xs text-gray-500 text-center">
                      We need your zip code to connect you with the nearest
                      technician in {stateData.name}
                    </p>
                  </div>
                  <Button
                    onClick={handleAddToCart}
                    disabled={!zipCode.trim()}
                    className="w-full bg-gradient-to-r from-onassist-primary to-blue-600 hover:from-blue-600 hover:to-onassist-primary text-lg py-6 mb-6 shadow-xl rounded-full font-bold disabled:opacity-50"
                    size="lg"
                  >
                    Book Service in {stateData.abbreviation}
                  </Button>
                  <Separator className="my-6" />
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 bg-green-50 rounded-xl px-4 py-2 text-green-700 font-medium">
                      <Shield className="w-5 h-5 text-green-500" />
                      Serving all {stateData.name}
                    </div>
                    <div className="flex items-center gap-3 bg-blue-50 rounded-xl px-4 py-2 text-blue-700 font-medium">
                      <CheckCircle className="w-5 h-5 text-blue-500" />
                      Local {stateData.abbreviation} technicians
                    </div>
                    <div className="flex items-center gap-3 bg-yellow-50 rounded-xl px-4 py-2 text-yellow-700 font-medium">
                      <Award className="w-5 h-5 text-yellow-500" />
                      Satisfaction guaranteed
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-3 text-onassist-primary drop-shadow">
              Why Choose Us?
            </h2>
            <p className="text-lg text-gray-600 mb-10">
              Experience the difference with our premium tech support in{" "}
              {stateData?.name}.
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch">
            <div className="flex-1 bg-gradient-to-br from-white via-blue-50 to-purple-50 rounded-2xl shadow-xl p-8 flex flex-col items-center hover:scale-105 transition-transform duration-300 group">
              <div className="bg-green-100 p-4 rounded-full mb-4 group-hover:scale-110 transition-transform">
                <Shield className="w-10 h-10 text-green-500" />
              </div>
              <h3 className="font-semibold text-xl mb-2">
                Trusted & Certified
              </h3>
              <p className="text-gray-600">
                All our technicians are background-checked, certified, and
                highly experienced.
              </p>
            </div>
            <div className="flex-1 bg-gradient-to-br from-white via-yellow-50 to-yellow-100 rounded-2xl shadow-xl p-8 flex flex-col items-center hover:scale-105 transition-transform duration-300 group">
              <div className="bg-yellow-100 p-4 rounded-full mb-4 group-hover:scale-110 transition-transform">
                <Zap className="w-10 h-10 text-yellow-400" />
              </div>
              <h3 className="font-semibold text-xl mb-2">Fast Response</h3>
              <p className="text-gray-600">
                We offer same-day and next-day service in all cities across{" "}
                {stateData?.name}.
              </p>
            </div>
            <div className="flex-1 bg-gradient-to-br from-white via-blue-50 to-blue-100 rounded-2xl shadow-xl p-8 flex flex-col items-center hover:scale-105 transition-transform duration-300 group">
              <div className="bg-blue-100 p-4 rounded-full mb-4 group-hover:scale-110 transition-transform">
                <Award className="w-10 h-10 text-blue-500" />
              </div>
              <h3 className="font-semibold text-xl mb-2">
                Satisfaction Guaranteed
              </h3>
              <p className="text-gray-600">
                We stand by our work with a 100% satisfaction guarantee and
                follow-up support.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-20 bg-gradient-to-r from-onassist-primary/10 to-blue-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-3 text-onassist-primary drop-shadow">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 mb-10">
              Getting help is easy and seamless.
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            {/* Step 1 */}
            <div className="flex-1 flex flex-col items-center relative">
              <div className="bg-white rounded-full shadow-lg p-6 mb-4 border-4 border-onassist-primary/20">
                <Phone className="w-10 h-10 text-onassist-primary" />
              </div>
              <h3 className="font-semibold text-xl mb-2">
                1. Book Online or Call
              </h3>
              <p className="text-gray-600 text-center">
                Schedule your service in minutes online or by phone. We confirm
                your appointment instantly.
              </p>
              <div
                className="hidden md:block absolute top-1/2 right-0 w-24 h-1 bg-gradient-to-r from-onassist-primary to-blue-400 opacity-40 rounded-full"
                style={{ transform: "translateY(-50%)" }}
              ></div>
            </div>
            {/* Step 2 */}
            <div className="flex-1 flex flex-col items-center relative">
              <div className="bg-white rounded-full shadow-lg p-6 mb-4 border-4 border-onassist-primary/20">
                <Users className="w-10 h-10 text-onassist-primary" />
              </div>
              <h3 className="font-semibold text-xl mb-2">
                2. Meet Your Technician
              </h3>
              <p className="text-gray-600 text-center">
                A certified expert arrives at your location, ready to help and
                answer all your questions.
              </p>
              <div
                className="hidden md:block absolute top-1/2 right-0 w-24 h-1 bg-gradient-to-r from-onassist-primary to-blue-400 opacity-40 rounded-full"
                style={{ transform: "translateY(-50%)" }}
              ></div>
            </div>
            {/* Step 3 */}
            <div className="flex-1 flex flex-col items-center">
              <div className="bg-white rounded-full shadow-lg p-6 mb-4 border-4 border-green-400/30">
                <CheckCircle className="w-10 h-10 text-green-500" />
              </div>
              <h3 className="font-semibold text-xl mb-2">
                3. Enjoy Peace of Mind
              </h3>
              <p className="text-gray-600 text-center">
                Your service is completed to the highest standard, with a full
                satisfaction guarantee.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Service Benefits Section */}
      <div className="py-20 bg-gradient-to-br from-white via-blue-50 to-purple-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-onassist-primary">
            Service Benefits
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center">
              <Wrench className="w-10 h-10 text-onassist-primary mb-3" />
              <h4 className="font-semibold text-lg mb-1">Expert Repairs</h4>
              <p className="text-gray-600">
                We fix it right the first time, every time.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <Clock className="w-10 h-10 text-onassist-primary mb-3" />
              <h4 className="font-semibold text-lg mb-1">On-Time Arrival</h4>
              <p className="text-gray-600">
                We respect your time and always arrive as scheduled.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <Shield className="w-10 h-10 text-onassist-primary mb-3" />
              <h4 className="font-semibold text-lg mb-1">Safe & Secure</h4>
              <p className="text-gray-600">
                Your privacy and safety are our top priorities.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <Star className="w-10 h-10 text-yellow-400 mb-3" />
              <h4 className="font-semibold text-lg mb-1">Top Rated</h4>
              <p className="text-gray-600">
                Thousands of 5-star reviews from happy customers.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Meet Our Technicians Section */}
      <div className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 rounded-full px-6 py-2 mb-4">
              <Award className="w-5 h-5" />
              <span className="font-medium">Meet Our Experts</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-onassist-primary">
              Our Top Technicians
            </h2>
            <p className="text-xl text-gray-600">
              Certified, background-checked, and ready to help you in{" "}
              {stateData?.name}.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {randomTechnicians.map((tech) => (
              <Card
                key={tech.id}
                className="shadow-xl text-center border-0 bg-gradient-to-b from-white to-gray-50 hover:shadow-2xl transition-all duration-300"
              >
                <CardContent className="p-8">
                  <div className="relative mb-6">
                    <img
                      src={tech.image}
                      alt={tech.name}
                      className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-white shadow-lg"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-2">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <h3 className="font-bold text-xl mb-2">{tech.name}</h3>
                  <p className="text-onassist-primary font-semibold mb-2">
                    {tech.title}
                  </p>
                  <p className="text-gray-600 mb-4">{tech.experience}</p>
                  <div className="flex items-center justify-center gap-2 text-gray-500 mb-4">
                    <MapPin className="w-4 h-4" />
                    <span>{stateData?.name}</span>
                  </div>
                  <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-700 rounded-full px-4 py-2">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-medium">
                      {tech.rating.toFixed(1)} Rating
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Customer Testimonials Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-700 rounded-full px-6 py-2 mb-4">
              <Heart className="w-5 h-5" />
              <span className="font-medium">Customer Stories</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-onassist-primary">
              What Our Customers Say
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {randomTestimonials.map((testimonial) => (
              <Card
                key={testimonial.id}
                className="shadow-xl border-0 bg-gradient-to-br from-gray-50 to-white hover:shadow-2xl transition-all duration-300"
              >
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-6 h-6 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 italic text-lg leading-relaxed">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center gap-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-onassist-primary"
                    />
                    <div>
                      <div className="font-bold text-lg">
                        {testimonial.name}
                      </div>
                      <div className="text-gray-600">
                        {testimonial.location}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

// Utility to get N unique random items from an array
function getRandomItems<T>(arr: T[], n: number): T[] {
  const result = [];
  const used = new Set<number>();
  while (result.length < n && used.size < arr.length) {
    const idx = Math.floor(Math.random() * arr.length);
    if (!used.has(idx)) {
      used.add(idx);
      result.push(arr[idx]);
    }
  }
  return result;
}

export default StateServiceDetailPage;
