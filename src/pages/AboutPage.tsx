import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useDynamicSiteConfig } from '@/hooks/useDynamicSiteConfig';
import { 
  Shield, 
  Users, 
  Award, 
  CheckCircle,
  ArrowRight,
  Target,
  Lightbulb,
  Heart
} from 'lucide-react';

const AboutPage = () => {
  const { config } = useDynamicSiteConfig();

  return (
    <Layout>
      <Helmet>
        <title>About Us | {config.name}</title>
        <meta name="description" content={`Learn about ${config.name} - your trusted partner for professional tech support services. Discover our mission, values, and commitment to excellence.`} />
      </Helmet>
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-onassist-primary via-blue-600 to-purple-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: "url('data:image/svg+xml;utf8,<svg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"><g fill=\"%23ffffff\" fill-opacity=\"0.3\"><circle cx=\"30\" cy=\"30\" r=\"8\"/><circle cx=\"10\" cy=\"10\" r=\"4\"/><circle cx=\"50\" cy=\"50\" r=\"6\"/></g></svg>')"
          }}></div>
        </div>

        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-white/20 text-white mb-6 px-6 py-2 backdrop-blur-sm">
              <Shield className="w-4 h-4 mr-2" />
              About {config.name}
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Your Trusted <span className="text-yellow-300">Tech Partner</span>
            </h1>
            <p className="text-2xl opacity-90 mb-8 leading-relaxed">
              Delivering exceptional technology support services with a commitment to excellence, reliability, and customer satisfaction.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="bg-white text-onassist-primary hover:bg-gray-100 font-bold px-8 py-4 rounded-full shadow-2xl">
                <Users className="w-5 h-5 mr-2" />
                Meet Our Team
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-onassist-primary font-bold px-8 py-4 rounded-full backdrop-blur-sm">
                <Target className="w-5 h-5 mr-2" />
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Core Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600">
              These values guide everything we do, ensuring we deliver the best possible service to our clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Integrity",
                description: "We uphold the highest standards of honesty and ethical conduct in all our interactions."
              },
              {
                icon: Heart,
                title: "Customer Focus",
                description: "We are dedicated to understanding and meeting the needs of our customers with personalized solutions."
              },
              {
                icon: Award,
                title: "Excellence",
                description: "We strive for excellence in every aspect of our service, ensuring top-quality support and solutions."
              }
            ].map((value, index) => {
              const ValueIcon = value.icon;
              return (
                <Card key={index} className="shadow-lg hover:shadow-2xl transition-all duration-300 border-0 bg-white hover:-translate-y-2">
                  <CardContent className="p-8 text-center">
                    <div className="bg-gradient-to-br from-onassist-primary to-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <ValueIcon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-bold text-xl mb-2">{value.title}</h3>
                    <p className="text-gray-600 text-sm">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Content */}
              <div>
                <h2 className="text-4xl font-bold mb-6">
                  Why Choose <span className="text-onassist-primary">{config.name}</span>?
                </h2>
                <p className="text-xl text-gray-600 mb-8">
                  We offer more than just tech support - we provide peace of mind. Our commitment to quality, reliability, and customer satisfaction sets us apart.
                </p>

                <ul className="space-y-4">
                  {[
                    "24/7 Expert Support",
                    "Fast Response Times",
                    "Certified Technicians",
                    "Secure & Confidential Service",
                    "100% Satisfaction Guarantee"
                  ].map((benefit, index) => (
                    <li key={index} className="flex items-center text-lg text-gray-700">
                      <CheckCircle className="w-5 h-5 mr-3 text-green-500" />
                      {benefit}
                    </li>
                  ))}
                </ul>

                <Button className="bg-gradient-to-r from-onassist-primary to-blue-600 hover:from-onassist-primary/90 hover:to-blue-600/90 text-white font-bold py-4 px-8 rounded-full mt-8 shadow-lg">
                  Get Started Today <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>

              {/* Stats */}
              <div>
                <Card className="bg-gradient-to-br from-onassist-primary to-blue-600 text-white shadow-2xl">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold mb-6 text-center">Our Track Record</h3>
                    <div className="grid grid-cols-2 gap-6 text-center">
                      <div>
                        <div className="text-3xl font-bold mb-2">{config.rating_stat || "4.9/5"}</div>
                        <div className="text-white/90">Customer Rating</div>
                      </div>
                      <div>
                        <div className="text-3xl font-bold mb-2">{config.happy_customers_stat || "10K+"}</div>
                        <div className="text-white/90">Happy Customers</div>
                      </div>
                    </div>
                    <div className="mt-6 text-center">
                      <Star className="w-6 h-6 inline-block mr-2 text-yellow-300" />
                      <Star className="w-6 h-6 inline-block mr-2 text-yellow-300" />
                      <Star className="w-6 h-6 inline-block mr-2 text-yellow-300" />
                      <Star className="w-6 h-6 inline-block mr-2 text-yellow-300" />
                      <Star className="w-6 h-6 inline-block text-yellow-300" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-50 shadow-lg mt-8 border-0">
                  <CardContent className="p-8">
                    <h3 className="text-xl font-bold mb-4 text-onassist-primary">Our Mission</h3>
                    <p className="text-gray-700">
                      To provide reliable, efficient, and friendly tech support services that empower our customers to thrive in a digital world.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Information Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">
              More About <span className="text-onassist-primary">{config.name}</span>
            </h2>
            <p className="text-xl text-gray-600 mb-12">
              Learn about our history, our team, and our commitment to the community.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Building,
                  title: "Our History",
                  description: "Founded in 2015, we've grown from a small startup to a leading tech support provider, serving thousands of customers."
                },
                {
                  icon: Users,
                  title: "Our Team",
                  description: "Our team of certified technicians and support staff are dedicated to providing exceptional service and expertise."
                },
                {
                  icon: Target,
                  title: "Our Vision",
                  description: "To be the most trusted and reliable tech support partner, empowering individuals and businesses to achieve their goals."
                }
              ].map((info, index) => {
                const InfoIcon = info.icon;
                return (
                  <Card key={index} className="shadow-lg hover:shadow-2xl transition-all duration-300 border-0 bg-white hover:-translate-y-2">
                    <CardContent className="p-8 text-center">
                      <div className="bg-gradient-to-br from-onassist-primary to-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <InfoIcon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="font-bold text-xl mb-2">{info.title}</h3>
                      <p className="text-gray-600 text-sm">{info.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;
