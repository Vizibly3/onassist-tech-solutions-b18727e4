import React from "react";
import { Shield, Award, Clock, Users, Star, CheckCircle2 } from "lucide-react";
import { useDynamicSiteConfig } from "@/hooks/useDynamicSiteConfig";

const WhyChooseUs = () => {
  const { config } = useDynamicSiteConfig();
  const features = [
    {
      icon: Shield,
      title: "Industry Certified",
      description:
        "Our technicians hold industry-leading certifications and undergo continuous training.",
    },
    {
      icon: Award,
      title: "Award-Winning Service",
      description:
        "Recognized for excellence in customer service and technical expertise.",
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description:
        "Round-the-clock support for urgent technical issues and emergencies.",
    },
    {
      icon: Users,
      title: "Expert Team",
      description:
        "Highly skilled professionals with years of experience in tech support.",
    },
  ];

  const certifications = [
    {
      name: "CompTIA A+",
      color: "from-blue-500 to-blue-700",
      textColor: "text-blue-700",
      bgColor: "bg-blue-50",
    },
    {
      name: "Microsoft Certified",
      color: "from-green-500 to-green-700",
      textColor: "text-green-700",
      bgColor: "bg-green-50",
    },
    {
      name: "Cisco Network Associate",
      color: "from-purple-500 to-purple-700",
      textColor: "text-purple-700",
      bgColor: "bg-purple-50",
    },
    {
      name: "Apple Certified Support",
      color: "from-gray-600 to-gray-800",
      textColor: "text-gray-700",
      bgColor: "bg-gray-50",
    },
    {
      name: "Google IT Support",
      color: "from-red-500 to-red-700",
      textColor: "text-red-700",
      bgColor: "bg-red-50",
    },
    {
      name: "Amazon AWS",
      color: "from-orange-500 to-orange-700",
      textColor: "text-orange-700",
      bgColor: "bg-orange-50",
    },
  ];

  const partnerships = [
    {
      name: "Best Buy Geek Squad Partner",
      color: "from-yellow-500 to-yellow-700",
      textColor: "text-yellow-700",
      bgColor: "bg-yellow-50",
    },
    {
      name: "Samsung Authorized Service",
      color: "from-indigo-500 to-indigo-700",
      textColor: "text-indigo-700",
      bgColor: "bg-indigo-50",
    },
    {
      name: "HP Premier Partner",
      color: "from-teal-500 to-teal-700",
      textColor: "text-teal-700",
      bgColor: "bg-teal-50",
    },
    {
      name: "Dell Technologies Partner",
      color: "from-cyan-500 to-cyan-700",
      textColor: "text-cyan-700",
      bgColor: "bg-cyan-50",
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Why Choose Us Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose {config.name}?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're committed to providing exceptional tech support with certified
            professionals and proven results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="w-16 h-16 bg-onassist-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-onassist-primary/20 transition-colors">
                <feature.icon className="w-8 h-8 text-onassist-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Industry Certifications & Partnerships */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Industry Certifications & Partnerships
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our team holds prestigious certifications and maintains strategic
              partnerships with leading technology companies.
            </p>
          </div>

          {/* Certifications */}
          <div className="mb-12">
            <h4 className="text-xl font-semibold text-gray-800 mb-6 text-center">
              Professional Certifications
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className={`${cert.bgColor} rounded-xl p-6 border-2 border-transparent hover:border-opacity-30 hover:border-current transition-all duration-300 group cursor-pointer`}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-3 h-3 rounded-full bg-gradient-to-r ${cert.color} group-hover:scale-110 transition-transform`}
                    ></div>
                    <div className="flex-1">
                      <h5
                        className={`font-semibold ${cert.textColor} group-hover:font-bold transition-all`}
                      >
                        {cert.name}
                      </h5>
                    </div>
                    <CheckCircle2
                      className={`w-5 h-5 ${cert.textColor} opacity-60 group-hover:opacity-100 transition-opacity`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Partnerships */}
          <div>
            <h4 className="text-xl font-semibold text-gray-800 mb-6 text-center">
              Strategic Partnerships
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {partnerships.map((partner, index) => (
                <div
                  key={index}
                  className={`${partner.bgColor} rounded-xl p-6 border-2 border-transparent hover:border-opacity-30 hover:border-current transition-all duration-300 group cursor-pointer`}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-4 h-4 rounded-full bg-gradient-to-r ${partner.color} group-hover:scale-110 transition-transform`}
                    ></div>
                    <div className="flex-1">
                      <h5
                        className={`font-semibold ${partner.textColor} group-hover:font-bold transition-all`}
                      >
                        {partner.name}
                      </h5>
                    </div>
                    <Star
                      className={`w-5 h-5 ${partner.textColor} opacity-60 group-hover:opacity-100 transition-opacity`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12 pt-8 border-t border-gray-200">
            <p className="text-gray-600 mb-4">
              Ready to experience certified excellence in Smart Doorstep
              Support?
            </p>
            <button className="bg-gradient-to-r from-onassist-primary to-onassist-secondary text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              Get Started Today
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
