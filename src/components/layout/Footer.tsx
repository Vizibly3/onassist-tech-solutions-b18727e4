import React from "react";
import { useDynamicSiteConfig } from "@/hooks/useDynamicSiteConfig";
import { Phone, Mail, MapPin, Clock, Star, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useState } from "react";

const Footer = () => {
  const { config } = useDynamicSiteConfig();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase
        .from("newsletter_subscribers")
        .insert([{ email }]);
      if (error) {
        if (
          error.code === "23505" ||
          (error.message && error.message.includes("duplicate"))
        ) {
          toast.error("This email is already subscribed!");
        } else {
          toast.error("Failed to subscribe. Please try again.");
        }
        return;
      }
      toast.success("🎉 Subscribed successfully! Welcome to our newsletter.");
      setEmail("");
    } catch (err) {
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        {/* Newsletter Subscription */}
        <div className="max-w-xl mx-auto mb-12 text-center">
          <h4 className="text-2xl font-bold mb-2 text-onassist-primary">
            Subscribe to our Newsletter
          </h4>
          <p className="text-gray-400 mb-4 text-sm md:text-base">
            Get the latest updates, offers, and tech tips delivered straight to
            your inbox.
          </p>
          <form
            className="flex flex-col sm:flex-row items-center gap-3 justify-center"
            onSubmit={handleSubscribe}
          >
            <Input
              type="email"
              placeholder="Enter your email address"
              className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:ring-onassist-primary max-w-xs"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
            <Button
              type="submit"
              className="bg-onassist-primary hover:bg-onassist-primary/90 text-white px-6 py-2 rounded-md transition-colors"
              disabled={loading}
            >
              {loading ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-onassist-primary">
              {config.name}
            </h3>
            <p className="text-gray-300 text-sm">{config.description}</p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-yellow-400" />
                <span className="text-sm">5.0 Rating</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-onassist-primary" />
                <span className="text-sm">10k+ Customers</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/services"
                  className="text-gray-300 hover:text-onassist-primary transition-colors"
                >
                  Our Services
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="text-gray-300 hover:text-onassist-primary transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-gray-300 hover:text-onassist-primary transition-colors"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="/faq"
                  className="text-gray-300 hover:text-onassist-primary transition-colors"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="/partner"
                  className="text-gray-300 hover:text-onassist-primary transition-colors"
                >
                  Partner With Us
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Popular Services</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/services"
                  className="text-gray-300 hover:text-onassist-primary transition-colors"
                >
                  Computer Repair
                </a>
              </li>
              <li>
                <a
                  href="/services"
                  className="text-gray-300 hover:text-onassist-primary transition-colors"
                >
                  Smart Home Setup
                </a>
              </li>
              <li>
                <a
                  href="/services"
                  className="text-gray-300 hover:text-onassist-primary transition-colors"
                >
                  Network Installation
                </a>
              </li>
              <li>
                <a
                  href="/services"
                  className="text-gray-300 hover:text-onassist-primary transition-colors"
                >
                  Data Recovery
                </a>
              </li>
              <li>
                <a
                  href="/services"
                  className="text-gray-300 hover:text-onassist-primary transition-colors"
                >
                  Tech Consultation
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact Info</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-onassist-primary flex-shrink-0" />
                <span className="text-gray-300">{config.contactPhone}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-onassist-primary flex-shrink-0" />
                <span className="text-gray-300">{config.email}</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-onassist-primary flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">{config.address}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-4 h-4 text-onassist-primary flex-shrink-0" />
                <span className="text-gray-300">{config.support.hours}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2024 {config.name}. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a
                href="/privacy"
                className="text-gray-400 hover:text-onassist-primary transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                className="text-gray-400 hover:text-onassist-primary transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="/returns"
                className="text-gray-400 hover:text-onassist-primary transition-colors"
              >
                Returns Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
