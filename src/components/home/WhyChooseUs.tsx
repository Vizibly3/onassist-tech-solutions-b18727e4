import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Clock, Users, Award, Star, CheckCircle } from "lucide-react";

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Trusted & Certified
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're committed to providing exceptional service with
            industry-leading standards and certifications.
          </p>
        </div>

        {/* Main Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <Card className="text-center hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-8">
              <div className="bg-gradient-to-br from-onassist-primary to-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">Licensed & Insured</h3>
              <p className="text-gray-600">
                Fully licensed technicians with comprehensive insurance coverage
                for your peace of mind.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-8">
              <div className="bg-gradient-to-br from-green-500 to-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">Same-Day Service</h3>
              <p className="text-gray-600">
                Most repairs and installations completed the same day you call.
                Emergency services available 24/7.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-8">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">Expert Technicians</h3>
              <p className="text-gray-600">
                Certified professionals with years of experience and ongoing
                training in the latest technologies.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-8">
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">100% Guarantee</h3>
              <p className="text-gray-600">
                30-day satisfaction guarantee on all services. If you're not
                happy, we'll make it right.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Certifications Section */}
        <div className="relative rounded-2xl p-12 shadow-lg overflow-hidden my-12">
          {/* Soft gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 opacity-90 pointer-events-none" />
          <div className="relative z-10">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-gray-900 mb-2">
                Industry Certifications & Partnerships
              </h3>
              <div className="flex justify-center mb-4">
                <span className="inline-block w-16 h-1 rounded bg-gradient-to-r from-onassist-primary to-blue-500" />
              </div>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We maintain the highest industry standards through certified
                training and partnerships
              </p>
              <p className="text-sm text-gray-400 mt-2">
                Our partners and certifications ensure you get the best service
                possible
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
              {/* Real-world logos with glassmorphism cards and animation */}
              {[
                {
                  src: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
                  alt: "Google Certified",
                  label: "Google Certified",
                },
                {
                  src: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
                  alt: "Apple Authorized",
                  label: "Apple Authorized",
                },
                {
                  src: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
                  alt: "Microsoft Partner",
                  label: "Microsoft Partner",
                },
                {
                  src: "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg",
                  alt: "Samsung Certified",
                  label: "Samsung Certified",
                },
                {
                  src: "https://cdn.worldvectorlogo.com/logos/comptia-1.svg",
                  alt: "CompTIA Partner",
                  label: "CompTIA Partner",
                },
                {
                  src: "https://cdn-icons-png.flaticon.com/512/3062/3062634.png",
                  alt: "Cybersecurity Certified",
                  label: "Cybersecurity Certified",
                },
              ].map((item, idx) => (
                <div
                  key={item.label}
                  className={
                    "flex flex-col items-center bg-white/70 backdrop-blur-md rounded-xl shadow-lg p-4 hover:scale-105 hover:shadow-2xl transition-all duration-300 border border-gray-100 opacity-0 translate-y-6 animate-fadeinup"
                  }
                  style={{
                    animationDelay: `${idx * 120}ms`,
                    animationFillMode: "forwards",
                  }}
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-20 h-12 object-contain mb-2 drop-shadow-md bg-white rounded"
                    style={{ padding: "4px", maxHeight: "48px" }}
                  />
                  <p className="text-xs text-gray-700 font-semibold text-center">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h4 className="text-xl font-bold mb-2">Background Checked</h4>
            <p className="text-gray-600">
              All technicians undergo comprehensive background checks
            </p>
          </div>

          <div className="text-center">
            <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-yellow-600" />
            </div>
            <h4 className="text-xl font-bold mb-2">5-Star Rated</h4>
            <p className="text-gray-600">
              Consistently rated 5 stars by thousands of customers
            </p>
          </div>

          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
            <h4 className="text-xl font-bold mb-2">Privacy Protected</h4>
            <p className="text-gray-600">
              Your data and privacy are our top priority
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

/* Add this to the bottom of the file or in your global CSS if not present */
// @layer utilities {
//   @keyframes fadeinup {
//     0% { opacity: 0; transform: translateY(24px); }
//     100% { opacity: 1; transform: translateY(0); }
//   }
//   .animate-fadeinup {
//     animation: fadeinup 0.7s cubic-bezier(0.4,0,0.2,1) both;
//   }
// }
