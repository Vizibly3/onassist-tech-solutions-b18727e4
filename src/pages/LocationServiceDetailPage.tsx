import React, { useState, useEffect } from "react";
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
import { useDynamicSiteConfig } from "@/hooks/useDynamicSiteConfig";
import { toast } from "sonner";
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
  MapPin,
  Navigation,
  Building,
  Cloud,
  Sun,
  CloudRain,
  Wind,
  Thermometer,
  Droplets,
  EyeIcon,
  Gauge,
  TrendingUp,
  Calendar,
  MessageCircle,
  ThumbsUp,
  Camera,
  VideoIcon,
  HeadphonesIcon,
  Laptop,
  HardDrive,
  Router,
  Settings,
  FileText,
  BrainCircuit,
  ChevronRight,
  Target,
  Globe,
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

const LocationServiceDetailPage = () => {
  const { country, state, city, serviceSlug } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { config } = useDynamicSiteConfig();
  const {
    data: service,
    isLoading,
    error,
  } = useServiceBySlug(serviceSlug || "");
  const [zipCode, setZipCode] = useState("");
  const [weather, setWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [weatherError, setWeatherError] = useState(null);

  // Get location data
  const stateData = usStates.find((s) => s.slug === state);
  const cityData = stateData?.cities?.find((c) => c.slug === city);

  console.log("Location data:", { stateData, cityData });

  // Mock weather data (replace with real API call)
  useEffect(() => {
    const fetchWeather = async () => {
      if (!cityData) return;

      setWeatherLoading(true);
      setWeatherError(null);

      try {
        // Replace with your actual API key (you can sign up for free at openweathermap.org)
        const apiKey = "e542bb2f899d44e9a2d151942251306";
        const cityName = encodeURIComponent(cityData.name); // Handle spaces/special chars
        const stateAbbr = stateData.abbreviation;

        // First try with city + state
        let response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${cityName},${stateAbbr},US&units=imperial&appid=${apiKey}`
        );

        // If that fails, try with just city name
        if (!response.ok) {
          response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${cityName},US&units=imperial&appid=${apiKey}`
          );
        }

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch weather data");
        }

        const data = await response.json();

        setWeather({
          temperature: Math.round(data.main.temp),
          condition: data.weather[0].main,
          windSpeed: Math.round(data.wind.speed),
          humidity: data.main.humidity,
          visibility: (data.visibility / 1609).toFixed(1), // convert meters to miles
          pressure: data.main.pressure,
          icon: data.weather[0].icon,
        });
      } catch (err) {
        console.error("Failed to fetch weather:", err);
        setWeatherError(err.message);
        // Fallback to mock data if API fails
        setWeather({
          temperature: Math.floor(Math.random() * 30) + 50,
          condition: ["Sunny", "Cloudy", "Partly Cloudy", "Light Rain"][
            Math.floor(Math.random() * 4)
          ],
          windSpeed: Math.floor(Math.random() * 15) + 5,
          humidity: Math.floor(Math.random() * 40) + 40,
          visibility: Math.floor(Math.random() * 5) + 5,
          pressure: Math.floor(Math.random() * 2) + 29.5,
        });
      } finally {
        setWeatherLoading(false);
      }
    };

    fetchWeather();
  }, [cityData, stateData]);

  const handleAddToCart = () => {
    if (service) {
      addToCart(service);
      toast.success(`${service.title} has been added to your cart.`);
    }
  };

  const handleGoBack = () => {
    navigate(`/${country}/${state}/${city}`);
  };

  const getWeatherIcon = (condition) => {
    if (weather?.icon) {
      return (
        <img
          src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
          alt={condition}
          className="w-12 h-12"
        />
      );
    }

    switch (condition) {
      case "Clear":
        return <Sun className="w-8 h-8 text-yellow-500" />;
      case "Clouds":
        return <Cloud className="w-8 h-8 text-gray-500" />;
      case "Rain":
        return <CloudRain className="w-8 h-8 text-blue-600" />;
      case "Snow":
        return <Cloud className="w-8 h-8 text-blue-200" />;
      case "Thunderstorm":
        return <Bolt className="w-8 h-8 text-yellow-400" />;
      default:
        return <Sun className="w-8 h-8 text-yellow-500" />;
    }
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

  if (error || !service || !cityData || !stateData) {
    console.error("Service or location not found:", {
      service,
      cityData,
      stateData,
      error,
      requestedParams: { country, state, city, serviceSlug },
      availableStates: usStates.map((s) => s.slug),
      availableCities: stateData?.cities?.map((c) => c.slug) || [],
    });
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Service not found</h1>
            <p className="text-gray-600 mb-6">
              The service or location you're looking for doesn't exist.
            </p>
            <p className="text-sm text-gray-500 mb-6">
              Looking for: {country}/{state}/{city}/{serviceSlug}
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
          Best {service.title} in {cityData.name}, {stateData.abbreviation} |{" "}
          {siteConfig.name}
        </title>
        <meta
          name="description"
          content={`Professional ${service.title} services in ${cityData.name}, ${stateData.name}. Expert local technicians providing ${service.title} with same-day service and guaranteed satisfaction.`}
        />
        <meta
          name="keywords"
          content={`${service.title}, ${cityData.name}, ${stateData.abbreviation}, tech support`}
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
        {/* Breadcrumb */}
        <div className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-40">
          <div className="container mx-auto px-4 py-4">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link
                      to="/"
                      className="flex items-center gap-2 text-gray-600 hover:text-onassist-primary transition-all duration-300 hover:scale-105"
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
                      className="text-gray-600 hover:text-onassist-primary transition-all duration-300 hover:scale-105"
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
                      className="text-gray-600 hover:text-onassist-primary transition-all duration-300 hover:scale-105"
                    >
                      {stateData.name}
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link
                      to={`/${country}/${state}/${city}`}
                      className="text-gray-600 hover:text-onassist-primary transition-all duration-300 hover:scale-105"
                    >
                      {cityData.name}
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
        <div className="py-20 bg-gradient-to-r from-onassist-primary via-blue-600 to-purple-700 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            ></div>
          </div>

          {/* Floating Elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-32 h-32 bg-purple-300/20 rounded-full blur-2xl animate-pulse delay-1000"></div>

          <div className="container mx-auto px-4 relative">
            <Button
              onClick={handleGoBack}
              variant="ghost"
              className="text-white hover:bg-white/20 mb-8 backdrop-blur-md border border-white/20 transition-all duration-300 hover:scale-105"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to {cityData.name}
            </Button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
                    <Monitor className="w-10 h-10" />
                  </div>
                  <div>
                    <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                      {service.title}
                    </h1>
                    <p className="text-xl text-blue-100 mt-2">
                      in {cityData.name}
                    </p>
                  </div>
                  {service.popular && (
                    <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 px-4 py-2 animate-pulse">
                      <Star className="w-4 h-4 mr-1 fill-current" />
                      Popular
                    </Badge>
                  )}
                </div>
                <p className="text-xl opacity-95 mb-8 leading-relaxed">
                  Professional {service.title} services in {cityData.name},{" "}
                  {stateData.name}. Expert local technicians providing same-day
                  service with guaranteed satisfaction.
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

        {/* Weather Section */}
        <div className="py-8 bg-white/50 backdrop-blur-sm border-b border-gray-200/50">
          <div className="container mx-auto px-4">
            <Card className="shadow-2xl border-0 overflow-hidden bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-500 rounded-xl text-white">
                    <Cloud className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    Current Weather in {cityData.name}
                  </h2>
                </div>

                {weatherLoading ? (
                  <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                    {[...Array(6)].map((_, i) => (
                      <Skeleton key={i} className="h-20 rounded-xl" />
                    ))}
                  </div>
                ) : weather ? (
                  <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                    <div className="bg-white rounded-xl p-4 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <div className="flex justify-center mb-2">
                        {getWeatherIcon(weather.condition)}
                      </div>
                      <div className="text-2xl font-bold text-gray-800">
                        {weather.temperature}°F
                      </div>
                      <div className="text-sm text-gray-600">
                        {weather.condition}
                      </div>
                    </div>

                    <div className="bg-white rounded-xl p-4 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <Wind className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                      <div className="text-xl font-bold text-gray-800">
                        {weather.windSpeed} mph
                      </div>
                      <div className="text-sm text-gray-600">Wind Speed</div>
                    </div>

                    <div className="bg-white rounded-xl p-4 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <Droplets className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                      <div className="text-xl font-bold text-gray-800">
                        {weather.humidity}%
                      </div>
                      <div className="text-sm text-gray-600">Humidity</div>
                    </div>

                    <div className="bg-white rounded-xl p-4 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <EyeIcon className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                      <div className="text-xl font-bold text-gray-800">
                        {weather.visibility} mi
                      </div>
                      <div className="text-sm text-gray-600">Visibility</div>
                    </div>

                    <div className="bg-white rounded-xl p-4 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <Gauge className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                      <div className="text-xl font-bold text-gray-800">
                        {weather.pressure}
                      </div>
                      <div className="text-sm text-gray-600">Pressure</div>
                    </div>

                    <div className="bg-white rounded-xl p-4 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <Thermometer className="w-6 h-6 text-red-500 mx-auto mb-2" />
                      <div className="text-xl font-bold text-gray-800">
                        Perfect
                      </div>
                      <div className="text-sm text-gray-600">Service Day</div>
                    </div>
                  </div>
                ) : null}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content */}
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
                      Service Overview in {cityData.name}
                    </h2>
                  </div>

                  <div className="prose prose-lg max-w-none">
                    <p className="text-gray-700 leading-relaxed mb-8 text-lg">
                      {service.description}
                    </p>

                    <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-8 rounded-2xl border border-blue-200/50 mb-8 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
                      <h3 className="text-2xl font-bold mb-6 text-blue-800 flex items-center gap-3">
                        <Building className="w-8 h-8" />
                        Local Service Excellence in {cityData.name}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center group">
                          <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                            <MapPin className="w-10 h-10 text-white" />
                          </div>
                          <h4 className="font-bold mb-3 text-lg">
                            Local Experts
                          </h4>
                          <p className="text-gray-600">
                            Certified technicians serving {cityData.name} with
                            5+ years experience
                          </p>
                        </div>
                        <div className="text-center group">
                          <div className="bg-gradient-to-br from-purple-500 to-purple-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg"></div>
                          <h4 className="font-bold mb-3 text-lg">
                            Same Day Service
                          </h4>
                          <p className="text-gray-600">
                            Fast response time available throughout{" "}
                            {cityData.name} area
                          </p>
                        </div>
                        <div className="text-center group">
                          <div className="bg-gradient-to-br from-green-500 to-green-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                            <Award className="w-10 h-10 text-white" />
                          </div>
                          <h4 className="font-bold mb-3 text-lg">
                            Trusted Service
                          </h4>
                          <p className="text-gray-600">
                            5-star rated service with 100% satisfaction
                            guarantee
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Local Business Insights */}
              <Card className="shadow-2xl border-0 overflow-hidden bg-gradient-to-br from-white to-gray-50">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 text-white">
                      <TrendingUp className="w-8 h-8" />
                    </div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                      Why Choose Our {cityData.name} Service?
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Target className="w-6 h-6 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-semibold">
                          Local Expertise
                        </h3>
                      </div>
                      <p className="text-gray-600">
                        Deep understanding of {cityData.name}'s tech
                        infrastructure and common issues in the area.
                      </p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          <Users className="w-6 h-6 text-purple-600" />
                        </div>
                        <h3 className="text-xl font-semibold">
                          Community Trusted
                        </h3>
                      </div>
                      <p className="text-gray-600">
                        Serving {cityData.name} residents and businesses with
                        personalized, reliable Smart Doorstep support.
                      </p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-green-100 rounded-lg">
                          <Zap className="w-6 h-6 text-green-600" />
                        </div>
                        <h3 className="text-xl font-semibold">
                          Rapid Response
                        </h3>
                      </div>
                      <p className="text-gray-600">
                        Quick service deployment across all {cityData.name}{" "}
                        neighborhoods and business districts.
                      </p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-orange-100 rounded-lg">
                          <Shield className="w-6 h-6 text-orange-600" />
                        </div>
                        <h3 className="text-xl font-semibold">
                          Guaranteed Quality
                        </h3>
                      </div>
                      <p className="text-gray-600">
                        Every service backed by our comprehensive warranty and
                        satisfaction guarantee.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Service Features */}
              <Card className="shadow-2xl border-0 overflow-hidden bg-gradient-to-br from-white to-blue-50">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                      <Settings className="w-8 h-8" />
                    </div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                      What's Included
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      {
                        icon: BrainCircuit,
                        title: "Expert Diagnosis",
                        desc: "Comprehensive system analysis",
                      },
                      {
                        icon: Wrench,
                        title: "Professional Repair",
                        desc: "Quality parts and workmanship",
                      },
                      {
                        icon: Shield,
                        title: "Service Warranty",
                        desc: "90-day guarantee on all work",
                      },
                      {
                        icon: FileText,
                        title: "Detailed Report",
                        desc: "Complete service documentation",
                      },
                      {
                        icon: Phone,
                        title: "Follow-up Support",
                        desc: "Post-service assistance",
                      },
                      {
                        icon: CheckCircle,
                        title: "Quality Assurance",
                        desc: "Thorough testing and validation",
                      },
                    ].map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100"
                      >
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <feature.icon className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm">
                            {feature.title}
                          </h4>
                          <p className="text-xs text-gray-600">
                            {feature.desc}
                          </p>
                        </div>
                      </div>
                    ))}
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

                  {/* Local Service Info */}
                  <div className="space-y-6 mb-8">
                    <div className="flex items-center gap-3 text-lg font-semibold">
                      <MapPin className="w-6 h-6 text-onassist-primary" />
                      <span>Service Location</span>
                    </div>
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl text-center border border-blue-200/50">
                      <div className="font-bold text-xl text-gray-800">
                        {cityData.name}, {stateData.abbreviation}
                      </div>
                      <div className="text-gray-600 mt-2">
                        Local technician will come to you
                      </div>
                      <div className="flex items-center justify-center gap-2 mt-4 text-green-600">
                        <CheckCircle className="w-5 h-5" />
                        <span className="font-medium">Coverage confirmed</span>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={handleAddToCart}
                    className="w-full bg-gradient-to-r from-onassist-primary to-onassist-dark hover:from-onassist-dark hover:to-onassist-primary text-xl py-8 mb-6 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 rounded-xl"
                    size="lg"
                  >
                    <Calendar className="w-6 h-6 mr-3" />
                    Book Service in {cityData.name}
                  </Button>

                  <div className="space-y-4">
                    <div className="flex items-center justify-center gap-3 text-gray-700 bg-green-50 p-3 rounded-lg border border-green-200">
                      <Shield className="w-5 h-5 text-green-600" />
                      <span className="font-medium">
                        Local {cityData.name} service
                      </span>
                    </div>
                    <div className="flex items-center justify-center gap-3 text-gray-700 bg-blue-50 p-3 rounded-lg border border-blue-200">
                      <span className="font-medium">Same-day availability</span>
                    </div>
                    <div className="flex items-center justify-center gap-3 text-gray-700 bg-purple-50 p-3 rounded-lg border border-purple-200">
                      <Award className="w-5 h-5 text-purple-600" />
                      <span className="font-medium">
                        Satisfaction guaranteed
                      </span>
                    </div>
                  </div>

                  <Separator className="my-8" />

                  {/* Contact Info */}
                  <div className="text-center space-y-4">
                    <h3 className="font-semibold text-lg flex items-center justify-center gap-2">
                      <Phone className="w-5 h-5 text-onassist-primary" />
                      Need Help?
                    </h3>
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <p className="text-sm text-gray-600 mb-2">
                        Call our {cityData.name} support team
                      </p>
                      <p className="font-bold text-lg text-onassist-primary">
                        {config.contactPhone}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats Card */}
              <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-gray-50">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    {cityData.name} Service Stats
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                      <div className="text-2xl font-bold text-blue-600">
                        98%
                      </div>
                      <div className="text-xs text-gray-600">Success Rate</div>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                      <div className="text-2xl font-bold text-green-600">
                        24/7
                      </div>
                      <div className="text-xs text-gray-600">Availability</div>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                      <div className="text-2xl font-bold text-purple-600">
                        500+
                      </div>
                      <div className="text-xs text-gray-600">Happy Clients</div>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                      <div className="text-2xl font-bold text-orange-600">
                        2hrs
                      </div>
                      <div className="text-xs text-gray-600">Avg Response</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Customer Reviews Section */}
        <div className="py-16 bg-gradient-to-r from-gray-50 to-blue-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                What {cityData.name} Customers Say
              </h2>
              <p className="text-xl text-gray-600">
                Real reviews from local residents and businesses
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Sarah M.",
                  location: `${cityData.name} Resident`,
                  rating: 5,
                  review:
                    "Excellent service! The technician arrived on time and fixed my computer quickly. Very professional and knowledgeable.",
                  service: service.title,
                },
                {
                  name: "Mike R.",
                  location: `${cityData.name} Business Owner`,
                  rating: 5,
                  review:
                    "Great experience with their team. They resolved our network issues efficiently and provided helpful tips for future maintenance.",
                  service: service.title,
                },
                {
                  name: "Jennifer L.",
                  location: `${cityData.name} Local`,
                  rating: 5,
                  review:
                    "Highly recommend! Fair pricing, excellent communication, and they really know their stuff. Will definitely use again.",
                  service: service.title,
                },
              ].map((review, index) => (
                <Card
                  key={index}
                  className="shadow-xl border-0 bg-white hover:shadow-2xl transition-shadow duration-300"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-4 italic">
                      "{review.review}"
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                        {review.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold">{review.name}</div>
                        <div className="text-sm text-gray-600">
                          {review.location}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-600">
                Common questions about our {service.title} service in{" "}
                {cityData.name}
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-6">
              {[
                {
                  question: `Do you provide ${service.title} service throughout ${cityData.name}?`,
                  answer: `Yes, we provide comprehensive ${service.title} services to all areas of ${cityData.name}, ${stateData.name}. Our local technicians are familiar with the area and can reach you quickly.`,
                },
                {
                  question: "What is your response time for same-day service?",
                  answer: `We typically respond within 2-4 hours for same-day service requests in ${cityData.name}. Emergency services may be available with faster response times.`,
                },
                {
                  question: "Do you offer any warranty on your services?",
                  answer:
                    "Yes, all our services come with a 90-day warranty. If you experience any issues related to our work, we'll return to fix it at no additional cost.",
                },
                {
                  question: "What payment methods do you accept?",
                  answer:
                    "We accept all major credit cards, cash, and digital payment methods. Payment is due upon completion of service unless other arrangements are made.",
                },
              ].map((faq, index) => (
                <Card
                  key={index}
                  className="shadow-lg border-0 hover:shadow-xl transition-shadow duration-300"
                >
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <MessageCircle className="w-5 h-5 text-onassist-primary" />
                      {faq.question}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-8 md:py-12 lg:py-16 bg-gradient-to-r from-onassist-primary via-blue-600 to-purple-700 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            ></div>
          </div>

          <div className="container mx-auto px-4 text-center relative">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-sm md:text-base lg:text-lg xl:text-xl mb-6 md:mb-8 opacity-90 max-w-2xl mx-auto px-2">
              Join hundreds of satisfied customers in {cityData.name} who trust
              us with their tech needs. Book your service today and experience
              the difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center">
              <Button
                onClick={handleAddToCart}
                size="lg"
                className="bg-white text-onassist-primary hover:bg-gray-100 text-sm md:text-base lg:text-lg px-4 md:px-6 lg:px-8 py-3 md:py-4 lg:py-6 rounded-lg md:rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 w-full sm:w-auto"
              >
                <Calendar className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 mr-2 md:mr-3" />
                Book {service.title} Now
              </Button>
              <Button
                onClick={() =>
                  window.open(`tel:${config.contactPhone}`, "_self")
                }
                size="lg"
                variant="outline"
                className="border-2 border-white hover:bg-white text-onassist-primary text-sm md:text-base lg:text-lg px-4 md:px-6 lg:px-8 py-3 md:py-4 lg:py-6 rounded-lg md:rounded-xl backdrop-blur-sm transition-all duration-300 hover:scale-105 w-full sm:w-auto"
              >
                <Phone className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 mr-2 md:mr-3" />
                Call {config.contactPhone}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LocationServiceDetailPage;
