import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useDynamicSiteConfig } from '@/hooks/useDynamicSiteConfig';
import { 
  Handshake, 
  TrendingUp, 
  Users, 
  Award, 
  CheckCircle,
  ArrowRight,
  Star,
  Building,
  Lightbulb,
  Target
} from 'lucide-react';

const PartnerPage = () => {
  const { config } = useDynamicSiteConfig();

  return (
    <Layout>
      <Helmet>
        <title>Partner With Us | {config.name}</title>
        <meta name="description" content={`Join ${config.name}'s partner network and grow your business with our premium tech support services. Exclusive partnership opportunities available.`} />
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
              <Handshake className="w-4 h-4 mr-2" />
              Partnership Program
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Partner With <span className="text-yellow-300">{config.name}</span>
            </h1>
            <p className="text-2xl opacity-90 mb-8 leading-relaxed">
              Join our exclusive network of partners and unlock new revenue streams with premium tech support services.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="bg-white text-onassist-primary hover:bg-gray-100 font-bold px-8 py-4 rounded-full shadow-2xl">
                <Users className="w-5 h-5 mr-2" />
                Become a Partner
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-onassist-primary font-bold px-8 py-4 rounded-full backdrop-blur-sm">
                <Lightbulb className="w-5 h-5 mr-2" />
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Why Partner with <span className="text-onassist-primary">{config.name}</span>?
            </h2>
            <p className="text-xl text-gray-600">
              Empower your business with our trusted tech support solutions and expand your service offerings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: TrendingUp,
                title: "Revenue Growth",
                description: "Unlock new revenue streams by offering our premium tech support services to your clients."
              },
              {
                icon: Award,
                title: "Trusted Brand",
                description: "Partner with a recognized and respected brand in the tech support industry."
              },
              {
                icon: Handshake,
                title: "Mutual Success",
                description: "Benefit from a partnership built on shared goals and collaborative growth strategies."
              },
              {
                icon: Building,
                title: "Comprehensive Support",
                description: "Gain access to our full suite of support resources, training, and marketing materials."
              },
              {
                icon: Target,
                title: "Expanded Reach",
                description: "Extend your market presence and reach new customers with our proven solutions."
              },
              {
                icon: Star,
                title: "Exclusive Benefits",
                description: "Enjoy exclusive partner benefits, including priority support and customized solutions."
              }
            ].map((feature, index) => {
              const FeatureIcon = feature.icon;
              return (
                <Card key={index} className="shadow-lg hover:shadow-2xl transition-all duration-300 border-0 bg-white hover:-translate-y-2">
                  <CardContent className="p-6">
                    <div className="bg-gradient-to-br from-onassist-primary to-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <FeatureIcon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-bold text-xl mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-center">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">
              Partner Program <span className="text-onassist-primary">Benefits</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold mb-4">
                  <CheckCircle className="w-6 h-6 mr-2 inline-block align-middle text-green-500" />
                  Increased Revenue
                </h3>
                <p className="text-gray-600">
                  Generate new income streams by offering our tech support services to your existing customer base.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4">
                  <CheckCircle className="w-6 h-6 mr-2 inline-block align-middle text-green-500" />
                  Enhanced Customer Loyalty
                </h3>
                <p className="text-gray-600">
                  Provide added value to your customers with reliable tech support, increasing their satisfaction and loyalty.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4">
                  <CheckCircle className="w-6 h-6 mr-2 inline-block align-middle text-green-500" />
                  Marketing Support
                </h3>
                <p className="text-gray-600">
                  Access a range of marketing materials and resources to promote your partnership with {config.name}.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4">
                  <CheckCircle className="w-6 h-6 mr-2 inline-block align-middle text-green-500" />
                  Technical Training
                </h3>
                <p className="text-gray-600">
                  Receive comprehensive training on our services to ensure your team is well-equipped to support your customers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-24 bg-gradient-to-br from-blue-700 to-purple-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8">
            Ready to Elevate Your Business?
          </h2>
          <p className="text-xl mb-12">
            Join the {config.name} partner program today and start offering top-notch tech support services to your clients.
          </p>
          <Button size="lg" className="bg-yellow-400 text-blue-800 hover:bg-yellow-500 font-bold px-8 py-4 rounded-full shadow-2xl">
            Get Started Now <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default PartnerPage;
