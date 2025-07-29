
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
  Phone, 
  Mail, 
  MapPin,
  CheckCircle,
  Star,
  DollarSign,
  Shield,
  Clock
} from 'lucide-react';

const PartnerPage = () => {
  const { config } = useDynamicSiteConfig();

  return (
    <Layout>
      <Helmet>
        <title>Partner With Us | {config.name}</title>
        <meta name="description" content={`Join our partner network and grow your business with ${config.name}. Exclusive benefits, training, and support for qualified partners.`} />
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
              Partnership Opportunities
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Partner with <span className="text-yellow-300">{config.name}</span>
            </h1>
            <p className="text-2xl opacity-90 mb-8 leading-relaxed">
              Join our growing network of trusted partners and expand your business opportunities in the tech support industry.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="bg-white text-onassist-primary hover:bg-gray-100 font-bold px-8 py-4 rounded-full shadow-2xl">
                <Phone className="w-5 h-5 mr-2" />
                Become a Partner
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-onassist-primary font-bold px-8 py-4 rounded-full backdrop-blur-sm">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Partnership Benefits */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              Why Partner with <span className="text-onassist-primary">{config.name}</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide everything you need to succeed as our partner
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: TrendingUp,
                title: "Growing Market",
                description: "Tech support industry is expanding rapidly with increasing demand for professional services"
              },
              {
                icon: DollarSign,
                title: "Competitive Revenue",
                description: "Attractive commission structure with performance bonuses and recurring revenue opportunities"
              },
              {
                icon: Award,
                title: "Brand Recognition",
                description: `Leverage the trusted ${config.name} brand to attract more customers and build credibility`
              },
              {
                icon: Users,
                title: "Training & Support",
                description: "Comprehensive training programs and ongoing support to ensure your success"
              },
              {
                icon: Shield,
                title: "Marketing Resources",
                description: "Access to professional marketing materials, campaigns, and lead generation tools"
              },
              {
                icon: Clock,
                title: "Flexible Partnership",
                description: "Multiple partnership models to fit your business needs and growth objectives"
              }
            ].map((benefit, index) => {
              const BenefitIcon = benefit.icon;
              return (
                <Card key={index} className="shadow-lg hover:shadow-2xl transition-all duration-300 border-0 bg-white hover:-translate-y-2">
                  <CardContent className="p-8 text-center">
                    <div className="bg-gradient-to-br from-onassist-primary to-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <BenefitIcon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-bold text-xl mb-4">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Partnership Types */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Partnership Programs</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the partnership model that best fits your business
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Referral Partner",
                subtitle: "Earn commissions",
                features: [
                  "Earn up to 15% commission",
                  "No upfront investment",
                  "Marketing support included",
                  "Online tracking dashboard",
                  "Quick approval process"
                ],
                popular: false,
                color: "from-blue-500 to-blue-600"
              },
              {
                title: "Authorized Reseller",
                subtitle: "Sell our services",
                features: [
                  "Up to 25% profit margins",
                  "Exclusive territory rights",
                  "Complete training program",
                  "Technical support included",
                  "Co-branded materials",
                  "Lead generation support"
                ],
                popular: true,
                color: "from-purple-600 to-purple-700"
              },
              {
                title: "Franchise Partner",
                subtitle: "Own your market",
                features: [
                  "Protected territory",
                  "Full business model",
                  "Ongoing operational support",
                  "National advertising benefits",
                  "Established brand recognition",
                  "Comprehensive training"
                ],
                popular: false,
                color: "from-green-500 to-green-600"
              }
            ].map((program, index) => (
              <Card key={index} className={`relative overflow-hidden shadow-2xl border-0 ${program.popular ? 'transform scale-105' : ''} hover:shadow-3xl transition-all duration-300`}>
                {program.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-yellow-400 to-orange-400 text-center py-3">
                    <span className="text-yellow-900 font-bold text-sm uppercase tracking-wide">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <CardHeader className={`bg-gradient-to-br ${program.color} text-white ${program.popular ? 'pt-16' : 'pt-8'} pb-8`}>
                  <div className="text-center">
                    <CardTitle className="text-3xl font-bold mb-2">{program.title}</CardTitle>
                    <p className="text-white/90 text-lg">{program.subtitle}</p>
                  </div>
                </CardHeader>

                <CardContent className="p-8">
                  <div className="space-y-4 mb-8">
                    {program.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-3">
                        <div className={`bg-gradient-to-br ${program.color} w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0`}>
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button 
                    className={`w-full py-4 text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300 ${
                      program.popular 
                        ? 'bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-yellow-900' 
                        : `bg-gradient-to-br ${program.color} hover:opacity-90 text-white`
                    }`}
                  >
                    {program.popular ? 'Get Started' : 'Learn More'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">What Our Partners Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from successful partners who've grown their business with us
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Mike Johnson",
                role: "Authorized Reseller",
                company: "Tech Solutions Pro",
                content: `Partnering with ${config.name} has been the best business decision I've made. The support and training they provide is exceptional.`,
                rating: 5
              },
              {
                name: "Sarah Williams",
                role: "Franchise Partner",
                company: "Bay Area Tech Support",
                content: "The franchise model gave me everything I needed to start and grow my business. Revenue has increased 300% in just 18 months.",
                rating: 5
              },
              {
                name: "David Chen",
                role: "Referral Partner",
                company: "Digital Marketing Agency",
                content: "The referral program is fantastic. Easy to implement and the commissions are paid on time, every time.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <Card key={index} className="shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-white">
                <CardContent className="p-8">
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }, (_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <blockquote className="text-gray-700 mb-6 italic">
                    "{testimonial.content}"
                  </blockquote>
                  <div>
                    <div className="font-bold text-lg">{testimonial.name}</div>
                    <div className="text-onassist-primary font-medium">{testimonial.role}</div>
                    <div className="text-gray-500 text-sm">{testimonial.company}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-onassist-dark to-blue-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: "url('data:image/svg+xml;utf8,<svg width=\"40\" height=\"40\" viewBox=\"0 0 40 40\" xmlns=\"http://www.w3.org/2000/svg\"><g fill=\"%23ffffff\" fill-opacity=\"0.3\"><path d=\"M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z\"/></g></svg>')"
          }}></div>
        </div>
        
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to <span className="text-yellow-300">Partner</span> with Us?
            </h2>
            <p className="text-xl md:text-2xl opacity-90 mb-12 leading-relaxed">
              Let's discuss how we can grow together and create a successful partnership.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="flex flex-col items-center">
                <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-4 backdrop-blur-sm">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Call Us</h3>
                <p className="opacity-90">{config.contactPhone}</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-4 backdrop-blur-sm">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Email Us</h3>
                <p className="opacity-90">{config.email}</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-4 backdrop-blur-sm">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Visit Us</h3>
                <p className="opacity-90">{config.address}</p>
              </div>
            </div>
            
            <Button 
              size="lg" 
              className="bg-white text-onassist-primary hover:bg-gray-100 font-bold px-12 py-6 rounded-full shadow-2xl text-xl"
            >
              <Handshake className="w-6 h-6 mr-3" />
              Start Your Partnership Journey
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PartnerPage;
