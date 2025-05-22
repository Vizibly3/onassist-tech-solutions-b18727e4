
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { siteConfig } from '@/config/site';

const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-gray-900 to-onassist-dark text-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-onassist-accent/10 rounded-full"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-onassist-primary/20 rounded-full"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full bg-grid-white/[0.2]"></div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-slide-up">
            <h2 className="text-3xl md:text-4xl font-bold">Need Tech Support Right Now?</h2>
            <p className="text-xl text-white/80">
              Whether you're having computer problems, WiFi issues, or need help setting up your smart home, 
              our tech experts are ready to help.
            </p>
            
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
                className="border-white/40 text-white hover:bg-white/10 font-medium px-8"
              >
                <a href={`tel:${siteConfig.contactPhone.replace(/\D/g, '')}`}>
                  {siteConfig.contactPhone}
                </a>
              </Button>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/20 animate-slide-up md:animate-slide-down shadow-lg">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2">Why Choose OnAssist?</h3>
              <p className="text-white/80">The tech support service customers love</p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-white/20 p-2 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Fast Response Time</h4>
                  <p className="text-white/70">Our technicians respond quickly to your tech emergencies.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-white/20 p-2 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Fully Background-Checked</h4>
                  <p className="text-white/70">All our technicians are carefully vetted and trained.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-white/20 p-2 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Satisfaction Guarantee</h4>
                  <p className="text-white/70">If you're not happy, we'll make it right.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-white/20 p-2 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Upfront Pricing</h4>
                  <p className="text-white/70">No surprise fees or hidden costs.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
