import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useDynamicSiteConfig } from "@/hooks/useDynamicSiteConfig";
import {
  Home,
  Phone,
  Search,
  ArrowLeft,
  Wrench,
  AlertTriangle,
} from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const { config } = useDynamicSiteConfig();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <Helmet>
        <title>Page Not Found | {config.name}</title>
      </Helmet>

      <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-blue-50">
        <div className="text-center max-w-2xl mx-auto px-4">
          {/* Animated 404 Icon */}
          <div className="relative mb-12">
            <div className="text-8xl md:text-9xl font-bold text-onassist-primary/20 select-none">
              404
            </div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="bg-gradient-to-br from-onassist-primary to-blue-600 w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center shadow-2xl animate-bounce">
                <AlertTriangle className="w-12 h-12 md:w-16 md:h-16 text-white" />
              </div>
            </div>
          </div>

          <div className="space-y-6 mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Oops! Page Not Found
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-md mx-auto">
              The page you're looking for seems to have wandered off. Don't
              worry, our tech experts can help you find your way!
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 max-w-lg mx-auto">
              <p className="text-sm text-yellow-800 flex items-center justify-center gap-2">
                <Wrench className="w-4 h-4" />
                <span>Need immediate tech support? We're here 24/7!</span>
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-onassist-primary to-blue-600 hover:from-onassist-primary/90 hover:to-blue-600/90 text-white font-bold px-8 py-4 rounded-full shadow-lg"
            >
              <Link to="/">
                <Home className="w-5 h-5 mr-2" />
                Back to Home
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-onassist-primary text-onassist-primary hover:bg-onassist-primary hover:text-white font-bold px-8 py-4 rounded-full"
            >
              <Link to="/services">
                <Search className="w-5 h-5 mr-2" />
                Browse Services
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-green-500 text-green-600 hover:bg-green-500 hover:text-white font-bold px-8 py-4 rounded-full"
            >
              <Link to="/contact">
                <Phone className="w-5 h-5 mr-2" />
                Get Support
              </Link>
            </Button>
          </div>

          {/* Popular Services */}
          <div className="mt-16 bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Popular Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { name: "Computer Repair", link: "/services" },
                { name: "Smart Home Setup", link: "/services" },
                { name: "Virus Removal", link: "/services" },
              ].map((service, index) => (
                <Link
                  key={index}
                  to={service.link}
                  className="p-4 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl hover:from-onassist-primary hover:to-blue-600 hover:text-white transition-all duration-300 group shadow-md hover:shadow-lg"
                >
                  <div className="font-medium text-center group-hover:text-white">
                    {service.name}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="mt-8 bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-2xl p-6">
            <p className="text-red-800 font-medium mb-3">
              <Phone className="w-5 h-5 inline mr-2" />
              Need immediate Smart Doorstep support?
            </p>
            <Button
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-full shadow-lg"
              onClick={() => window.open(`tel:${config.contactPhone}`, "_self")}
            >
              Call Now: {config.contactPhone}
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
