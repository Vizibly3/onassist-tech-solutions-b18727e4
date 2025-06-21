import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone, Clock, Shield, Star, ArrowRight, Users } from "lucide-react";
import { siteConfig } from "@/config/site";
import { useDynamicSiteConfig } from "@/hooks/useDynamicSiteConfig";

const CTASection = () => {
  const { config, isLoading } = useDynamicSiteConfig();

  return (
    <section className="relative py-20 bg-gradient-to-br from-onassist-primary via-onassist-dark to-purple-900 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-white rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-20 w-12 h-12 bg-white rounded-full animate-pulse delay-500"></div>
        <div className="absolute bottom-32 right-32 w-24 h-24 bg-white rounded-full animate-pulse delay-1500"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Need Tech Support
            <span className="block text-transparent bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text">
              Right Now?
            </span>
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Don't let technology frustrations ruin your day. Our certified
            experts are standing by to solve your tech problems quickly and
            efficiently.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-500 rounded-full mb-4">
              <Clock className="h-6 w-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">
              {config.response_time_stat}
            </div>
            <div className="text-blue-200 text-sm">Response Time</div>
          </div>
          <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-500 rounded-full mb-4">
              <Star className="h-6 w-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">
              {config.rating_stat}
            </div>
            <div className="text-blue-200 text-sm">Customer Rating</div>
          </div>
          <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-500 rounded-full mb-4">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">
              {config.satisfaction_stat}
            </div>
            <div className="text-blue-200 text-sm">Satisfaction</div>
          </div>
          <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-red-500 rounded-full mb-4">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">
              {config.happy_customers_stat}
            </div>
            <div className="text-blue-200 text-sm">Happy Customers</div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="text-center space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href={`tel:${siteConfig.contactPhone.replace(/[^\d+]/g, "")}`}
              className="group"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold px-8 py-4 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-green-300/30"
              >
                <Phone className="mr-3 h-5 w-5 animate-pulse" />
                Call Now: {siteConfig.contactPhone}
                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>

            <span className="text-blue-200 font-medium">OR</span>

            <Link to="/contact" className="group">
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white hover:text-onassist-primary font-semibold px-8 py-4 rounded-2xl transform hover:scale-105 transition-all duration-300"
              >
                Get Free Quote
                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <p className="text-blue-200 text-sm max-w-md mx-auto">
            💡 <strong>Available 24/7</strong> • No hidden fees • Same-day
            service available
          </p>
        </div>

        {/* Trust badges */}
        <div className="mt-16 pt-8 border-t border-white/20">
          <p className="text-center text-blue-200 mb-6 font-medium">
            Trusted by thousands of customers
          </p>
          <div className="flex justify-center items-center space-x-8 opacity-60">
            <div className="text-white font-bold">CompTIA Certified</div>
            <div className="w-px h-6 bg-white/30"></div>
            <div className="text-white font-bold">BBB A+ Rating</div>
            <div className="w-px h-6 bg-white/30"></div>
            <div className="text-white font-bold">Fully Insured</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
