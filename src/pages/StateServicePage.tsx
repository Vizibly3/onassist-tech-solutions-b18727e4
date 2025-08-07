import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Helmet } from "react-helmet-async";
import { siteConfig } from "@/config/site";
import { useDynamicSiteConfig } from "@/hooks/useDynamicSiteConfig";
import {
  useServiceCategories,
  useCategoriesWithServices,
} from "@/hooks/useServices";
import { usStates } from "@/data/locations";
import {
  MapPin,
  Star,
  Users,
  Award,
  Phone,
  Clock,
  CheckCircle,
  ArrowRight,
  Home,
  Monitor,
  Smartphone,
  Wifi,
  Wrench,
  Shield,
  Zap,
  Building,
  Heart,
  Navigation,
  Search,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import ServiceCard from "@/components/services/ServiceCard";
import { slugify } from "@/utils/slugify";
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

const StateServicePage = () => {
  const { country, state } = useParams();
  const { config } = useDynamicSiteConfig();
  const { data: categories } = useServiceCategories();
  const { data: categoriesWithServices } = useCategoriesWithServices();

  // Get state data
  const stateData = usStates.find((s) => s.slug === state);

  // Get 3 random technicians (always call hooks)
  const stateSpecialists = React.useMemo(() => {
    if (!stateData) return [];
    return getRandomItems(techniciansData, 3).map((t) => ({
      ...t,
      location: stateData.name, // override location to state name for context
    }));
  }, [stateData]);

  // Get 3 random testimonials (always call hooks)
  const stateTestimonials = React.useMemo(
    () => getRandomItems(testimonialsData, 3),
    []
  );

  // --- City Search & Pagination State ---
  const [citySearch, setCitySearch] = useState("");
  const [cityPage, setCityPage] = useState(1);
  const CITIES_PER_PAGE = 10; // Reduced from 30 to 10 for mobile

  // Filtered cities by search
  const filteredCities = stateData.cities.filter((city) =>
    city.name.toLowerCase().includes(citySearch.toLowerCase())
  );
  const totalPages = Math.ceil(filteredCities.length / CITIES_PER_PAGE);
  const paginatedCities = filteredCities.slice(
    (cityPage - 1) * CITIES_PER_PAGE,
    cityPage * CITIES_PER_PAGE
  );

  // Reset to page 1 if search changes
  React.useEffect(() => {
    setCityPage(1);
  }, [citySearch]);

  // Scroll to top services section
  const scrollToTopServices = () => {
    const element = document.getElementById("top-services");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (!stateData) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">State not found</h1>
            <p className="text-gray-600 mb-6">
              The state you're looking for doesn't exist.
            </p>
            <Button asChild variant="outline">
              <Link to="/">Go Home</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  // Get popular services (first 6 categories)
  const popularCategories = categoriesWithServices?.slice(0, 6) || [];

  const getServiceIcon = (categoryTitle: string) => {
    const title = categoryTitle.toLowerCase();
    if (title.includes("home") || title.includes("smart")) return Home;
    if (title.includes("computer") || title.includes("laptop")) return Monitor;
    if (title.includes("phone") || title.includes("mobile")) return Smartphone;
    if (title.includes("network") || title.includes("wifi")) return Wifi;
    return Wrench;
  };

  return (
    <Layout>
      <Helmet>
        <title>
          Best Smart Doorstep Support Services in {stateData.name} |{" "}
          {siteConfig.name}
        </title>
        <meta
          name="description"
          content={`Professional Smart Doorstep support services throughout ${stateData.name}. Expert technicians providing computer repair, smart home setup, and IT support in all cities across ${stateData.name}.`}
        />
        <meta
          name="keywords"
          content={`Smart Doorstep support ${stateData.name}, computer repair ${stateData.abbreviation}, IT services ${stateData.name}`}
        />
      </Helmet>

      {/* Breadcrumb */}
      <div className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-200">
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
                <BreadcrumbPage className="font-medium text-onassist-primary">
                  {stateData.name}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-onassist-primary via-blue-600 to-purple-700 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>

        <div className="relative w-full px-4 py-12 md:py-20">
          <div className="w-full max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-1 md:gap-2 bg-white/20 backdrop-blur-sm rounded-full px-2 md:px-4 lg:px-6 py-1.5 md:py-2 mb-4 md:mb-6 lg:mb-8">
              <Navigation className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5" />
              <span className="font-medium text-xs md:text-sm lg:text-base">
                Serving All of {stateData.name}
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 md:mb-4 lg:mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                Smart Doorstep Support in
              </span>
              <br />
              <span className="text-yellow-300">{stateData.name}</span>
            </h1>

            <p className="text-sm md:text-base lg:text-lg xl:text-xl opacity-90 mb-6 md:mb-8 lg:mb-10 leading-relaxed max-w-xl mx-auto px-1">
              Professional technology support throughout{" "}
              <strong>{stateData.name}</strong>. Our certified technicians serve
              all cities in {stateData.name} with guaranteed satisfaction.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 lg:gap-6 mb-6 md:mb-8 lg:mb-10">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 md:p-3 lg:p-4">
                <div className="text-sm md:text-base lg:text-lg xl:text-xl font-bold mb-1">
                  Statewide
                </div>
                <div className="text-xs md:text-sm opacity-80">
                  Coverage in {stateData.name}
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 md:p-3 lg:p-4">
                <div className="text-sm md:text-base lg:text-lg xl:text-xl font-bold mb-1">
                  Same Day
                </div>
                <div className="text-xs md:text-sm opacity-80">
                  Service Available
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 md:p-3 lg:p-4">
                <div className="text-sm md:text-base lg:text-lg xl:text-xl font-bold mb-1">
                  100%
                </div>
                <div className="text-xs md:text-sm opacity-80">
                  Satisfaction Rate
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 md:gap-3 lg:gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-onassist-primary hover:bg-gray-100 font-semibold px-3 md:px-4 lg:px-6 py-2 md:py-3 lg:py-4 rounded-full shadow-xl text-xs md:text-sm lg:text-base"
                onClick={() =>
                  window.open(`tel:${config.contactPhone}`, "_self")
                }
              >
                <Phone className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 mr-1 md:mr-2" />
                Call {config.contactPhone}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white hover:bg-white text-onassist-primary font-semibold px-3 md:px-4 lg:px-6 py-2 md:py-3 lg:py-4 rounded-full backdrop-blur-sm text-xs md:text-sm lg:text-base"
                onClick={scrollToTopServices}
              >
                <Search className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 mr-1 md:mr-2" />
                <span className="text-blue-600">Find Local Service</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Cities We Serve - Unique Design */}
      <section className="py-8 md:py-12 lg:py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="w-full px-4">
          <div className="text-center mb-8 md:mb-12 lg:mb-16">
            <div className="inline-flex items-center gap-1 md:gap-2 bg-onassist-primary/10 text-onassist-primary rounded-full px-2 md:px-3 lg:px-6 py-1.5 md:py-2 mb-3 md:mb-4">
              <MapPin className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5" />
              <span className="font-medium text-xs md:text-sm lg:text-base">
                Local Presence
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 md:mb-4 lg:mb-6">
              Cities We Serve in{" "}
              <span className="text-onassist-primary">{stateData.name}</span>
            </h2>
            <p className="text-xs md:text-sm lg:text-base xl:text-lg text-gray-600 px-1">
              Professional Smart Doorstep support available in all major cities
              across {stateData.name}
            </p>
          </div>

          <div className="bg-white rounded-lg md:rounded-xl lg:rounded-2xl xl:rounded-3xl shadow-2xl p-3 md:p-4 lg:p-6 xl:p-8">
            {/* Search Box */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-2 md:gap-3 lg:gap-4 mb-4 md:mb-6 lg:mb-8">
              <input
                type="text"
                placeholder="Search cities..."
                value={citySearch}
                onChange={(e) => setCitySearch(e.target.value)}
                className="w-full md:w-80 px-2 md:px-3 lg:px-4 py-1.5 md:py-2 rounded-full border border-gray-200 focus:border-onassist-primary focus:ring-2 focus:ring-onassist-primary/20 outline-none text-xs md:text-sm lg:text-base transition-all"
              />
              <div className="text-gray-500 text-xs md:text-sm mt-1 md:mt-0">
                Showing {paginatedCities.length} of {filteredCities.length}{" "}
                cities
              </div>
            </div>
            {/* Cities List */}
            <div className="flex flex-wrap gap-1 md:gap-2 lg:gap-3 justify-center min-h-[100px] md:min-h-[120px]">
              {paginatedCities.length === 0 ? (
                <div className="text-gray-400 italic py-6 md:py-8">
                  No cities found.
                </div>
              ) : (
                paginatedCities.map((city, index) => (
                  <Link
                    key={city.name}
                    to={`/${country}/${state}/${city.slug}`}
                    className="group inline-flex items-center gap-1 md:gap-2 px-1.5 md:px-2 lg:px-3 py-1 md:py-1.5 lg:py-2 rounded-full bg-gradient-to-r from-blue-50 to-onassist-primary/10 border border-onassist-primary/20 text-onassist-primary font-medium shadow-sm hover:bg-onassist-primary hover:text-white transition-all duration-200 text-xs md:text-sm mb-1 md:mb-2"
                    style={{ minWidth: "70px", maxWidth: "120px" }}
                  >
                    <Building className="w-2.5 h-2.5 md:w-3 md:h-3 lg:w-4 lg:h-4 group-hover:text-yellow-300 transition-colors flex-shrink-0" />
                    <span className="truncate">{city.name}</span>
                    <ArrowRight className="w-2.5 h-2.5 md:w-3 md:h-3 lg:w-4 lg:h-4 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                  </Link>
                ))
              )}
            </div>
            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-1 md:gap-2 mt-4 md:mt-6 lg:mt-8">
                <button
                  onClick={() => setCityPage((p) => Math.max(1, p - 1))}
                  disabled={cityPage === 1}
                  className={`px-1.5 md:px-2 lg:px-3 py-0.5 md:py-1 rounded-full border border-gray-200 bg-white text-gray-500 hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed text-xs md:text-sm`}
                  aria-label="Previous page"
                >
                  &larr;
                </button>

                {/* Smart pagination - show only 6-7 pages max */}
                {(() => {
                  const maxVisiblePages = 6;
                  const pages = [];

                  if (totalPages <= maxVisiblePages) {
                    // Show all pages if total is small
                    for (let i = 1; i <= totalPages; i++) {
                      pages.push(i);
                    }
                  } else {
                    // Show smart pagination for large numbers
                    if (cityPage <= 3) {
                      // Near start: show 1,2,3,4,5,6,...
                      for (let i = 1; i <= maxVisiblePages - 1; i++) {
                        pages.push(i);
                      }
                      pages.push("...");
                      pages.push(totalPages);
                    } else if (cityPage >= totalPages - 2) {
                      // Near end: show ...,n-5,n-4,n-3,n-2,n-1,n
                      pages.push(1);
                      pages.push("...");
                      for (
                        let i = totalPages - (maxVisiblePages - 2);
                        i <= totalPages;
                        i++
                      ) {
                        pages.push(i);
                      }
                    } else {
                      // Middle: show ...,current-1,current,current+1,...
                      pages.push(1);
                      pages.push("...");
                      for (let i = cityPage - 1; i <= cityPage + 1; i++) {
                        pages.push(i);
                      }
                      pages.push("...");
                      pages.push(totalPages);
                    }
                  }

                  return pages.map((page, i) =>
                    page === "..." ? (
                      <span
                        key={`ellipsis-${i}`}
                        className="px-1 md:px-2 text-gray-400 text-xs md:text-sm"
                      >
                        ...
                      </span>
                    ) : (
                      <button
                        key={page}
                        onClick={() => setCityPage(page)}
                        className={`px-1.5 md:px-2 lg:px-3 py-0.5 md:py-1 rounded-full border text-xs md:text-sm ${
                          cityPage === page
                            ? "bg-onassist-primary text-white border-onassist-primary"
                            : "bg-white text-gray-700 border-gray-200"
                        } hover:bg-onassist-primary/10 transition`}
                        aria-current={cityPage === page ? "page" : undefined}
                      >
                        {page}
                      </button>
                    )
                  );
                })()}

                <button
                  onClick={() =>
                    setCityPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={cityPage === totalPages}
                  className={`px-1.5 md:px-2 lg:px-3 py-0.5 md:py-1 rounded-full border border-gray-200 bg-white text-gray-500 hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed text-xs md:text-sm`}
                  aria-label="Next page"
                >
                  &rarr;
                </button>
              </div>
            )}
            <div className="text-center mt-4 md:mt-6 lg:mt-8">
              <p className="text-gray-600 mb-3 md:mb-4 lg:mb-6 text-xs md:text-sm px-1">
                Don't see your city? We serve all areas in {stateData.name}!
              </p>
              <Button
                size="lg"
                className="bg-gradient-to-r from-onassist-primary to-blue-600 hover:from-blue-600 hover:to-onassist-primary text-white font-semibold px-3 md:px-4 lg:px-6 py-1.5 md:py-2 lg:py-3 rounded-full shadow-lg text-xs md:text-sm"
                onClick={() => window.open("tel:+18889701698", "_self")}
              >
                <Phone className="w-2.5 h-2.5 md:w-3 md:h-3 lg:w-4 lg:h-4 mr-1 md:mr-1.5" />
                Call for Your Area
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Services */}
      <section id="top-services" className="py-8 md:py-12 lg:py-20 bg-white">
        <div className="w-full px-4">
          <div className="text-center mb-8 md:mb-12 lg:mb-16">
            <div className="inline-flex items-center gap-1 md:gap-2 bg-blue-100 text-blue-700 rounded-full px-2 md:px-3 lg:px-6 py-1.5 md:py-2 mb-3 md:mb-4">
              <Zap className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5" />
              <span className="font-medium text-xs md:text-sm lg:text-base">
                Most Popular
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 md:mb-4 lg:mb-6">
              Top Services in{" "}
              <span className="text-onassist-primary">{stateData.name}</span>
            </h2>
            <p className="text-xs md:text-sm lg:text-base xl:text-lg text-gray-600 px-1">
              Most requested tech solutions across {stateData.name}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-6 xl:gap-8">
            {popularCategories.map((category) => {
              const CategoryIcon = getServiceIcon(category.title);
              return (
                <Card
                  key={category.id}
                  className="group shadow-xl hover:shadow-2xl transition-all duration-500 border-0 bg-white hover:-translate-y-1"
                >
                  <CardContent className="p-3 md:p-4 lg:p-6 xl:p-8">
                    <div className="flex items-center gap-1.5 md:gap-2 lg:gap-3 mb-3 md:mb-4 lg:mb-6">
                      <div className="bg-gradient-to-br from-onassist-primary to-blue-600 p-1.5 md:p-2 lg:p-3 rounded-lg group-hover:scale-110 transition-transform duration-300">
                        <CategoryIcon className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 xl:w-8 xl:h-8 text-white" />
                      </div>
                      <h3 className="font-bold text-sm md:text-base lg:text-lg xl:text-xl">
                        {category.title}
                      </h3>
                    </div>

                    <p className="text-gray-600 mb-3 md:mb-4 lg:mb-6 text-xs md:text-sm lg:text-base">
                      {category.description}
                    </p>

                    <div className="space-y-0.5 md:space-y-1 lg:space-y-2 xl:space-y-3 mb-3 md:mb-4 lg:mb-6">
                      {category.services.slice(0, 3).map((service) => (
                        <Link
                          key={service.id}
                          to={`/${country}/${state}/service/${slugify(
                            service.title
                          )}`}
                          className="block text-gray-700 hover:text-onassist-primary transition-colors p-0.5 md:p-1 lg:p-2 rounded hover:bg-gray-50 text-xs md:text-sm lg:text-base"
                        >
                          • {service.title}
                        </Link>
                      ))}
                    </div>

                    <Link
                      to={`/services/${slugify(category.title)}`}
                      className="inline-flex items-center gap-0.5 md:gap-1 lg:gap-2 text-onassist-primary font-semibold group-hover:gap-1 md:group-hover:gap-2 lg:group-hover:gap-3 transition-all text-xs md:text-sm lg:text-base"
                    >
                      View All Services
                      <ArrowRight className="w-2.5 h-2.5 md:w-3 md:h-3 lg:w-4 lg:h-4" />
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Meet State Specialists */}
      <section className="py-8 md:py-12 lg:py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50">
        <div className="w-full px-4">
          <div className="text-center mb-8 md:mb-12 lg:mb-16">
            <div className="inline-flex items-center gap-1 md:gap-2 bg-green-100 text-green-700 rounded-full px-2 md:px-3 lg:px-6 py-1.5 md:py-2 mb-3 md:mb-4">
              <Award className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5" />
              <span className="font-medium text-xs md:text-sm lg:text-base">
                Expert Team
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 md:mb-4 lg:mb-6">
              Meet {stateData.name} Specialists
            </h2>
            <p className="text-xs md:text-sm lg:text-base xl:text-lg text-gray-600 px-1">
              Certified experts serving customers across {stateData.name}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 lg:gap-6 xl:gap-8">
            {stateSpecialists.map((specialist, index) => (
              <Card
                key={specialist.id}
                className="shadow-xl text-center border-0 bg-gradient-to-b from-white to-gray-50 hover:shadow-2xl transition-all duration-300"
              >
                <CardContent className="p-3 md:p-4 lg:p-6 xl:p-8">
                  <div className="relative mb-3 md:mb-4 lg:mb-6">
                    <img
                      src={specialist.image}
                      alt={specialist.name}
                      className="w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 rounded-full mx-auto object-cover border-4 border-white shadow-lg"
                    />
                    <div className="absolute -bottom-0.5 md:-bottom-1 lg:-bottom-2 -right-0.5 md:-right-1 lg:-right-2 bg-green-500 rounded-full p-0.5 md:p-1 lg:p-1.5 xl:p-2">
                      <CheckCircle className="w-2.5 h-2.5 md:w-3 md:h-3 lg:w-4 lg:h-4 text-white" />
                    </div>
                  </div>
                  <h3 className="font-bold text-sm md:text-base lg:text-lg xl:text-xl mb-0.5 md:mb-1 lg:mb-2">
                    {specialist.name}
                  </h3>
                  <p className="text-onassist-primary font-semibold mb-0.5 md:mb-1 lg:mb-2 text-xs md:text-sm lg:text-base">
                    {specialist.title}
                  </p>
                  <p className="text-gray-600 mb-1.5 md:mb-2 lg:mb-3 xl:mb-4 text-xs md:text-sm lg:text-base">
                    {specialist.experience}
                  </p>
                  <div className="flex items-center justify-center gap-0.5 md:gap-1 lg:gap-2 text-gray-500 mb-1.5 md:mb-2 lg:mb-3 xl:mb-4">
                    <MapPin className="w-2.5 h-2.5 md:w-3 md:h-3 lg:w-4 lg:h-4" />
                    <span className="text-xs md:text-sm lg:text-base">
                      {specialist.location}
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-0.5 md:gap-1 lg:gap-2 bg-yellow-100 text-yellow-700 rounded-full px-1.5 md:px-2 lg:px-3 xl:px-4 py-0.5 md:py-1 lg:py-1.5 xl:py-2">
                    <Star className="w-2.5 h-2.5 md:w-3 md:h-3 lg:w-4 lg:h-4 fill-current" />
                    <span className="text-xs md:text-sm font-medium">
                      {specialist.rating.toFixed(1)} Rating
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-8 md:py-12 lg:py-20 bg-white">
        <div className="w-full px-4">
          <div className="text-center mb-8 md:mb-12 lg:mb-16">
            <div className="inline-flex items-center gap-1 md:gap-2 bg-yellow-100 text-yellow-700 rounded-full px-2 md:px-3 lg:px-6 py-1.5 md:py-2 mb-3 md:mb-4">
              <Heart className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5" />
              <span className="font-medium text-xs md:text-sm lg:text-base">
                Customer Stories
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 md:mb-4 lg:mb-6">
              What{" "}
              <span className="text-onassist-primary">{stateData.name}</span>{" "}
              Says About Us
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 lg:gap-6 xl:gap-8">
            {stateTestimonials.map((testimonial) => (
              <Card
                key={testimonial.id}
                className="shadow-xl border-0 bg-gradient-to-br from-gray-50 to-white hover:shadow-2xl transition-all duration-300"
              >
                <CardContent className="p-3 md:p-4 lg:p-6 xl:p-8">
                  <div className="flex items-center mb-3 md:mb-4 lg:mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-3 md:mb-4 lg:mb-6 italic text-xs md:text-sm lg:text-base xl:text-lg leading-relaxed">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center gap-1.5 md:gap-2 lg:gap-3 xl:gap-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-7 h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 rounded-full object-cover border-2 border-onassist-primary"
                    />
                    <div>
                      <div className="font-bold text-sm md:text-base lg:text-lg">
                        {testimonial.name}
                      </div>
                      <div className="text-gray-600 text-xs md:text-sm lg:text-base">
                        {testimonial.location}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 md:py-12 lg:py-20 bg-gradient-to-br from-onassist-primary via-blue-600 to-purple-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none select-none">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url('data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.08'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E')`,
            }}
          ></div>
        </div>
        <div className="relative w-full px-4 flex justify-center">
          <div className="w-full max-w-sm md:max-w-lg lg:max-w-2xl mx-auto">
            <div className="rounded-lg md:rounded-xl lg:rounded-2xl xl:rounded-3xl shadow-xl border border-white/20 bg-gradient-to-br from-white/10 via-white/5 to-white/0 p-3 md:p-4 lg:p-6 xl:p-8 2xl:p-14 flex flex-col items-center text-center">
              <div className="inline-flex items-center gap-1 md:gap-2 lg:gap-3 bg-gradient-to-r from-onassist-primary/90 to-blue-600/80 text-white rounded-full px-2 md:px-3 lg:px-4 xl:px-6 py-1.5 md:py-2 mb-3 md:mb-4 lg:mb-6 shadow-lg">
                <Zap className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 text-yellow-300" />
                <span className="font-semibold tracking-wide text-xs md:text-sm lg:text-base">
                  Get Help Fast
                </span>
              </div>
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-extrabold mb-2 md:mb-3 leading-tight text-white drop-shadow-lg">
                Ready for Smart Doorstep Support in{" "}
                <span className="text-yellow-300 drop-shadow">
                  {stateData.name}
                </span>
                ?
              </h2>
              <div className="h-0.5 md:h-1 w-6 md:w-8 lg:w-12 xl:w-16 bg-gradient-to-r from-onassist-primary to-blue-600 rounded-full my-1.5 md:my-2 lg:my-3 xl:my-4 mb-2 md:mb-3 lg:mb-4 xl:mb-6 opacity-60"></div>
              <p className="text-xs md:text-sm lg:text-base xl:text-lg text-white/90 mb-4 md:mb-6 lg:mb-8 xl:mb-10 leading-relaxed max-w-sm md:max-w-lg lg:max-w-2xl mx-auto px-1">
                Get professional technology support anywhere in{" "}
                <span className="font-bold text-yellow-200">
                  {stateData.name}
                </span>
                . Our certified technicians are ready to help you today.
              </p>
              <div className="flex flex-col sm:flex-row gap-1.5 md:gap-2 lg:gap-3 xl:gap-4 2xl:gap-6 justify-center w-full">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-onassist-primary to-blue-600 hover:from-blue-600 hover:to-onassist-primary text-white font-bold px-2 md:px-3 lg:px-4 xl:px-6 2xl:px-8 py-2 md:py-3 lg:py-4 xl:py-5 rounded-full shadow-xl text-xs md:text-sm lg:text-base flex-1 max-w-xs w-full whitespace-normal break-words"
                  style={{ minWidth: "0" }}
                  onClick={() =>
                    window.open(`tel:${config.contactPhone}`, "_self")
                  }
                >
                  <Phone className="w-2.5 h-2.5 md:w-3 md:h-3 lg:w-4 lg:h-4 xl:w-5 xl:h-5 2xl:w-6 2xl:h-6 mr-0.5 md:mr-1 lg:mr-2 xl:mr-3 shrink-0" />
                  <span className="truncate">
                    Call Now: {config.contactPhone}
                  </span>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-onassist-primary text-onassist-primary hover:bg-onassist-primary hover:text-white font-bold px-2 md:px-3 lg:px-4 xl:px-6 2xl:px-8 py-2 md:py-3 lg:py-4 xl:py-5 rounded-full text-xs md:text-sm lg:text-base flex-1 max-w-xs w-full whitespace-normal break-words bg-white/80 backdrop-blur-sm"
                  style={{ minWidth: "0" }}
                >
                  <Clock className="w-2.5 h-2.5 md:w-3 md:h-3 lg:w-4 lg:h-4 xl:w-5 xl:h-5 2xl:w-6 2xl:h-6 mr-0.5 md:mr-1 lg:mr-2 xl:mr-3 shrink-0" />
                  <span className="truncate">Schedule Service</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default StateServicePage;
