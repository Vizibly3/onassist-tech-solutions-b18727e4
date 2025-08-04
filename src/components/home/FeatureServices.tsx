import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useServiceCategories } from "@/hooks/useServices";
import { useDynamicSiteConfig } from "@/hooks/useDynamicSiteConfig";
import { ArrowRight, Star } from "lucide-react";

const FeatureServices = () => {
  const { data: categories, isLoading } = useServiceCategories();
  const { config } = useDynamicSiteConfig();

  if (isLoading) {
    return (
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Your {config.name}{" "}
              <span className="text-onassist-primary">Services</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="animate-pulse">
                <div className="h-64 bg-gray-200 rounded-lg"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 rounded-full px-6 py-2 mb-4">
            <Star className="w-5 h-5" />
            <span className="font-medium">Featured Services</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Your {config.name}{" "}
            <span className="text-onassist-primary">Services</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive technology solutions to keep your devices running
            smoothly and your business productive
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories?.slice(0, 6).map((category) => (
            <Card
              key={category.id}
              className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-white overflow-hidden h-full hover:-translate-y-2"
            >
              <Link to={`/services/${category.slug}`} className="block h-full">
                <div className="relative overflow-hidden">
                  <img
                    src={category.image_url}
                    alt={category.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-bold text-xl mb-2">
                      {category.title}
                    </h3>
                  </div>
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowRight className="w-4 h-4 text-onassist-primary" />
                  </div>
                </div>

                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex-1">
                    <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                      {category.description}
                    </p>
                  </div>

                  <div className="mt-auto">
                    <Button className="w-full bg-onassist-primary hover:bg-onassist-dark text-white font-semibold group-hover:shadow-lg transition-all duration-300">
                      Explore Services
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/services">
            <Button
              size="lg"
              variant="outline"
              className="font-semibold px-8 py-3 text-lg hover:bg-onassist-primary hover:text-white border-onassist-primary text-onassist-primary"
            >
              View All Services
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeatureServices;
