
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { siteConfig } from '@/config/site';

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-onassist-primary via-blue-600 to-onassist-dark text-white py-20 overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-10 -top-10 w-64 h-64 rounded-full bg-onassist-secondary/20 blur-3xl"></div>
        <div className="absolute -left-10 bottom-10 w-96 h-96 rounded-full bg-onassist-light/10 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-slide-up">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Tech Support Made <span className="text-onassist-accent">Simple</span>
              </h1>
              <p className="text-lg md:text-xl opacity-90 max-w-lg">
                Professional tech support when you need it. Our experts are ready to solve all your technology problems.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                asChild
                size="lg" 
                className="bg-onassist-accent hover:bg-onassist-accent/90 text-white font-medium px-8"
              >
                <Link to="/services">Book a Service</Link>
              </Button>
              <Button 
                asChild
                variant="outline" 
                size="lg"
                className="bg-white/10 hover:bg-white/20 border-white/30 text-white font-medium px-8"
              >
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
            
            <div className="flex flex-col md:flex-row gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <div className="bg-white/20 rounded-full p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span>{siteConfig.support.response}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-white/20 rounded-full p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span>{siteConfig.support.satisfaction}</span>
              </div>
            </div>
          </div>
          
          <div className="relative animate-slide-down hidden lg:block">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20 relative z-10">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">Schedule a Service</h2>
                <p className="text-white/80">Find the tech help you need in minutes</p>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Service Type</label>
                  <select className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white focus:ring-2 focus:ring-onassist-accent">
                    <option value="" disabled selected>Select a service</option>
                    <option value="wifi">WiFi & Network</option>
                    <option value="computer">Computer & Printer</option>
                    <option value="tv">TV & Home Theater</option>
                    <option value="smart-home">Smart Home</option>
                    <option value="mobile">Mobile Device</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Zip Code</label>
                  <input 
                    type="text" 
                    placeholder="Enter your zip code" 
                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white focus:ring-2 focus:ring-onassist-accent"
                  />
                </div>
                
                <div className="pt-2">
                  <Button 
                    className="w-full bg-onassist-accent hover:bg-onassist-accent/90 text-white font-medium py-6"
                  >
                    Find Available Technicians
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Visual elements */}
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-onassist-light/10 rounded-full blur-md"></div>
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-onassist-accent/10 rounded-full blur-lg"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
