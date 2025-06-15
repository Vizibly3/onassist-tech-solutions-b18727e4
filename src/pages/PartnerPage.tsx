import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Helmet } from 'react-helmet-async';
import { siteConfig } from '@/config/site';
import { 
  Handshake, 
  TrendingUp, 
  Users, 
  Award, 
  DollarSign, 
  Globe, 
  Phone, 
  Mail, 
  MapPin, 
  CheckCircle,
  Star,
  Zap,
  Shield,
  Target,
  Briefcase,
  Send
} from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface PartnerFormData {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  website?: string;
  partnershipType: string;
  companySize: string;
  experience: string;
  message: string;
}

const PartnerPage = () => {
  const { toast } = useToast();
  const [showThankYou, setShowThankYou] = useState(false);
  const { register, handleSubmit, reset, control, formState: { errors, isSubmitting } } = useForm<PartnerFormData>({
    defaultValues: {
      companyName: '',
      contactName: '',
      email: '',
      phone: '',
      website: '',
      partnershipType: '',
      companySize: '',
      experience: '',
      message: ''
    }
  });

  const onSubmit = async (data: PartnerFormData) => {
    try {
      console.log('Submitting partnership form with data:', data);
      
      // Ensure all required fields have values
      if (!data.partnershipType || !data.companySize || !data.experience) {
        toast({
          title: "❌ Missing Information",
          description: "Please fill in all required fields including Partnership Type, Company Size, and Experience.",
          variant: "destructive",
        });
        return;
      }
      
      const { error } = await supabase
        .from('contact_inquiries')
        .insert([{
          first_name: data.contactName.split(' ')[0] || data.contactName,
          last_name: data.contactName.split(' ').slice(1).join(' ') || '',
          email: data.email,
          phone_number: data.phone,
          subject: `Partnership Inquiry - ${data.partnershipType}`,
          message: `
Company: ${data.companyName}
Website: ${data.website || 'Not provided'}
Partnership Type: ${data.partnershipType}
Company Size: ${data.companySize}
Experience: ${data.experience}

Message:
${data.message}
          `.trim(),
          status: 'new'
        }]);
      
      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      // Show success message
      toast({
        title: "🎉 Thank You for Your Partnership Interest!",
        description: "Your partnership application has been submitted successfully! Our partnership team will review your application and get back to you within 48 hours with next steps.",
      });

      // Show thank you section
      setShowThankYou(true);

      // Reset form
      reset({
        companyName: '',
        contactName: '',
        email: '',
        phone: '',
        website: '',
        partnershipType: '',
        companySize: '',
        experience: '',
        message: ''
      });

      // Hide thank you message after 7 seconds
      setTimeout(() => {
        setShowThankYou(false);
      }, 7000);

    } catch (error) {
      console.error('Error submitting partnership form:', error);
      toast({
        title: "❌ Error Sending Application",
        description: "We're sorry, there was an issue submitting your application. Please try again or contact us directly at partnerships@onassist.com",
        variant: "destructive",
      });
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>Partner With Us | {siteConfig.name}</title>
        <meta name="description" content="Join our partner network and grow your business with OnAssist. Explore partnership opportunities and benefits." />
      </Helmet>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-onassist-primary via-blue-600 to-purple-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: "url('data:image/svg+xml;utf8,<svg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"><g fill=\"%23ffffff\" fill-opacity=\"0.3\"><circle cx=\"30\" cy=\"30\" r=\"8\"/><circle cx=\"10\" cy=\"10\" r=\"4\"/><circle cx=\"50\" cy=\"50\" r=\"6\"/></g></svg>')"
          }}></div>
        </div>

        <div className="relative container mx-auto px-4 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
              <Handshake className="w-5 h-5" />
              <span className="font-medium">Partnership Program</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Partner With <span className="text-yellow-300">OnAssist</span>
            </h1>
            <p className="text-2xl opacity-90 mb-12 leading-relaxed">
              Join our growing network of tech partners and unlock new revenue opportunities while delivering exceptional service to your customers.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-3xl font-bold mb-2">500+</div>
                <div className="text-lg opacity-80">Active Partners</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-3xl font-bold mb-2">50%</div>
                <div className="text-lg opacity-80">Revenue Share</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-3xl font-bold mb-2">24/7</div>
                <div className="text-lg opacity-80">Partner Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Partnership Types Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 rounded-full px-6 py-2 mb-4">
              <Target className="w-5 h-5" />
              <span className="font-medium">Partnership Opportunities</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Multiple Ways to <span className="text-onassist-primary">Partner</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the partnership model that best fits your business goals and capabilities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Briefcase,
                title: "Reseller Partner",
                description: "Sell our services under your brand and earn commission on every sale",
                benefits: ["40% commission", "Marketing support", "Dedicated portal"]
              },
              {
                icon: Users,
                title: "Referral Partner",
                description: "Refer clients to us and earn rewards for successful conversions",
                benefits: ["25% referral fee", "Easy tracking", "Monthly payouts"]
              },
              {
                icon: Globe,
                title: "Technology Partner",
                description: "Integrate our services into your platform or solution",
                benefits: ["API access", "Technical support", "Revenue sharing"]
              },
              {
                icon: Award,
                title: "Service Partner",
                description: "Provide OnAssist services directly to customers in your area",
                benefits: ["50% revenue share", "Training included", "Ongoing support"]
              },
              {
                icon: TrendingUp,
                title: "Growth Partner",
                description: "Help us expand into new markets and customer segments",
                benefits: ["Equity options", "Strategic planning", "Market development"]
              },
              {
                icon: Shield,
                title: "Enterprise Partner",
                description: "Deliver enterprise-level solutions to large organizations",
                benefits: ["Premium rates", "Dedicated support", "Custom solutions"]
              }
            ].map((type, index) => {
              const TypeIcon = type.icon;
              return (
                <Card key={index} className="shadow-xl hover:shadow-2xl transition-all duration-300 border-0 bg-white hover:-translate-y-2">
                  <CardContent className="p-8">
                    <div className="bg-gradient-to-br from-onassist-primary to-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                      <TypeIcon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-bold text-xl mb-4">{type.title}</h3>
                    <p className="text-gray-600 mb-6">{type.description}</p>
                    <div className="space-y-2">
                      {type.benefits.map((benefit, benefitIndex) => (
                        <div key={benefitIndex} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-gray-700">{benefit}</span>
                        </div>
                      ))}
                    </div>
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
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why Partner With <span className="text-onassist-primary">Us?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join a winning partnership that drives mutual success and growth
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: DollarSign,
                title: "Lucrative Returns",
                description: "Competitive commission rates and revenue sharing models"
              },
              {
                icon: Star,
                title: "Proven Success",
                description: "Track record of helping partners achieve their goals"
              },
              {
                icon: Zap,
                title: "Fast Onboarding",
                description: "Quick setup process to get you earning faster"
              },
              {
                icon: Users,
                title: "Dedicated Support",
                description: "Personal account manager for all your partnership needs"
              }
            ].map((benefit, index) => {
              const BenefitIcon = benefit.icon;
              return (
                <Card key={index} className="shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-gray-50 to-white">
                  <CardContent className="p-6 text-center">
                    <div className="bg-gradient-to-br from-onassist-primary to-blue-600 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <BenefitIcon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">{benefit.title}</h3>
                    <p className="text-gray-600 text-sm">{benefit.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Partner <span className="text-onassist-primary">Success Stories</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how our partners are thriving with OnAssist
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                company: "TechFlow Solutions",
                revenue: "$250K+",
                growth: "300%",
                testimonial: "Partnering with OnAssist has transformed our business. We've tripled our revenue in just 12 months."
              },
              {
                company: "Digital Bridge Inc",
                revenue: "$180K+",
                growth: "250%",
                testimonial: "The support and training provided by OnAssist made our transition seamless and profitable."
              },
              {
                company: "Metro IT Services",
                revenue: "$320K+",
                growth: "400%",
                testimonial: "Best partnership decision we've made. Our clients love the quality of service OnAssist provides."
              }
            ].map((story, index) => (
              <Card key={index} className="shadow-xl border-0 bg-white">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <h3 className="font-bold text-xl mb-2">{story.company}</h3>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="text-2xl font-bold text-onassist-primary">{story.revenue}</div>
                        <div className="text-sm text-gray-600">Annual Revenue</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-green-600">{story.growth}</div>
                        <div className="text-sm text-gray-600">Growth Rate</div>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">"{story.testimonial}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to <span className="text-onassist-primary">Get Started?</span>
              </h2>
              <p className="text-xl text-gray-600">
                Fill out the application form below and we'll get back to you within 24 hours
              </p>
            </div>

            <Card className="shadow-2xl border-0">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">Partnership Application</CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                {showThankYou ? (
                  <div className="text-center py-12">
                    <div className="bg-green-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-12 h-12 text-green-600" />
                    </div>
                    <h3 className="text-3xl font-bold text-green-800 mb-4">Application Submitted!</h3>
                    <p className="text-gray-600 mb-2 text-lg">
                      Thank you for your interest in partnering with OnAssist!
                    </p>
                    <p className="text-gray-600 mb-8">
                      Our partnership team will review your application and get back to you within 48 hours with next steps.
                    </p>
                    <div className="bg-blue-50 rounded-lg p-6 mb-8">
                      <h4 className="font-semibold text-blue-800 mb-2">What happens next?</h4>
                      <ul className="text-blue-700 text-sm space-y-1">
                        <li>• Partnership team review (24-48 hours)</li>
                        <li>• Initial consultation call</li>
                        <li>• Partnership agreement setup</li>
                        <li>• Training and onboarding</li>
                      </ul>
                    </div>
                    <Button
                      onClick={() => setShowThankYou(false)}
                      className="bg-onassist-primary hover:bg-onassist-dark text-white px-8 py-3"
                    >
                      Submit Another Application
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="companyName">Company Name *</Label>
                        <Input
                          id="companyName"
                          {...register('companyName', { required: 'Company name is required' })}
                          className="mt-2"
                        />
                        {errors.companyName && (
                          <p className="text-red-500 text-sm mt-1">{errors.companyName.message}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="contactName">Contact Name *</Label>
                        <Input
                          id="contactName"
                          {...register('contactName', { required: 'Contact name is required' })}
                          className="mt-2"
                        />
                        {errors.contactName && (
                          <p className="text-red-500 text-sm mt-1">{errors.contactName.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          {...register('email', { 
                            required: 'Email is required',
                            pattern: {
                              value: /^\S+@\S+$/i,
                              message: 'Invalid email address'
                            }
                          })}
                          className="mt-2"
                        />
                        {errors.email && (
                          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          {...register('phone', { required: 'Phone is required' })}
                          className="mt-2"
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        type="url"
                        {...register('website')}
                        className="mt-2"
                        placeholder="https://yourcompany.com"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="partnershipType">Partnership Type *</Label>
                        <Controller
                          name="partnershipType"
                          control={control}
                          rules={{ required: 'Partnership type is required' }}
                          render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value || ''}>
                              <SelectTrigger className="mt-2">
                                <SelectValue placeholder="Select partnership type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="reseller">Reseller Partner</SelectItem>
                                <SelectItem value="referral">Referral Partner</SelectItem>
                                <SelectItem value="technology">Technology Partner</SelectItem>
                                <SelectItem value="service">Service Partner</SelectItem>
                                <SelectItem value="growth">Growth Partner</SelectItem>
                                <SelectItem value="enterprise">Enterprise Partner</SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                        />
                        {errors.partnershipType && (
                          <p className="text-red-500 text-sm mt-1">{errors.partnershipType.message}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="companySize">Company Size *</Label>
                        <Controller
                          name="companySize"
                          control={control}
                          rules={{ required: 'Company size is required' }}
                          render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value || ''}>
                              <SelectTrigger className="mt-2">
                                <SelectValue placeholder="Select company size" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="1-10">1-10 employees</SelectItem>
                                <SelectItem value="11-50">11-50 employees</SelectItem>
                                <SelectItem value="51-200">51-200 employees</SelectItem>
                                <SelectItem value="201-500">201-500 employees</SelectItem>
                                <SelectItem value="500+">500+ employees</SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                        />
                        {errors.companySize && (
                          <p className="text-red-500 text-sm mt-1">{errors.companySize.message}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="experience">Experience in Tech Industry *</Label>
                      <Controller
                        name="experience"
                        control={control}
                        rules={{ required: 'Experience is required' }}
                        render={({ field }) => (
                          <Select onValueChange={field.onChange} value={field.value || ''}>
                            <SelectTrigger className="mt-2">
                              <SelectValue placeholder="Select your experience level" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="0-2">0-2 years</SelectItem>
                              <SelectItem value="3-5">3-5 years</SelectItem>
                              <SelectItem value="6-10">6-10 years</SelectItem>
                              <SelectItem value="10+">10+ years</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {errors.experience && (
                        <p className="text-red-500 text-sm mt-1">{errors.experience.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="message">Tell us about your business and partnership goals *</Label>
                      <Textarea
                        id="message"
                        rows={5}
                        {...register('message', { required: 'Message is required' })}
                        className="mt-2"
                        placeholder="Describe your business, current services, target market, and how you envision our partnership..."
                      />
                      {errors.message && (
                        <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-onassist-primary hover:bg-onassist-dark text-white py-4 text-lg font-bold"
                    >
                      {isSubmitting ? 'Submitting...' : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          Submit Partnership Application
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Questions About <span className="text-yellow-300">Partnership?</span>
              </h2>
              <p className="text-xl opacity-90 mb-8">
                Our partnership team is ready to discuss opportunities and answer any questions you may have.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="bg-white/20 p-3 rounded-xl">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Call Us</h4>
                    <p className="opacity-90">{siteConfig.contactPhone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-white/20 p-3 rounded-xl">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Email Us</h4>
                    <p className="opacity-90">partnerships@onassist.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-white/20 p-3 rounded-xl">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Visit Us</h4>
                    <p className="opacity-90">123 Business Ave, Tech City, TC 12345</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <Button 
                size="lg" 
                className="bg-white text-onassist-primary hover:bg-gray-100 font-bold px-10 py-5 rounded-full shadow-2xl text-lg"
                onClick={() => window.open(`tel:${siteConfig.contactPhone}`, '_self')}
              >
                <Phone className="w-6 h-6 mr-3" />
                Schedule Partnership Call
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PartnerPage;
