
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useDynamicSiteConfig } from '@/hooks/useDynamicSiteConfig';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  MessageCircle,
  Headphones,
  Shield
} from 'lucide-react';

const ContactPage = () => {
  const { config } = useDynamicSiteConfig();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    subject: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from('contact_inquiries').insert({
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone_number: formData.phoneNumber,
        subject: formData.subject,
        message: formData.message,
      });

      if (error) throw error;

      toast.success('Your message has been sent successfully! We\'ll get back to you soon.');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <Layout>
      <Helmet>
        <title>Contact Us | {config.name}</title>
        <meta name="description" content={`Get in touch with ${config.name} for professional tech support. Available 24/7 to help with all your technology needs.`} />
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
              <MessageCircle className="w-4 h-4 mr-2" />
              Contact {config.name}
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Get In <span className="text-yellow-300">Touch</span>
            </h1>
            <p className="text-2xl opacity-90 mb-8 leading-relaxed">
              Have a question or need tech support? We're here to help 24/7.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="bg-white text-onassist-primary hover:bg-gray-100 font-bold px-8 py-4 rounded-full shadow-2xl">
                <Phone className="w-5 h-5 mr-2" />
                Call Now: {config.contactPhone}
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-onassist-primary font-bold px-8 py-4 rounded-full backdrop-blur-sm">
                <Mail className="w-5 h-5 mr-2" />
                Email Us
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Info Cards */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: Phone,
                title: "Call Us",
                info: config.contactPhone,
                description: "Available 24/7 for immediate support",
                action: `tel:${config.contactPhone}`
              },
              {
                icon: Mail,
                title: "Email Us",
                info: config.email,
                description: "Get detailed responses to your questions",
                action: `mailto:${config.email}`
              },
              {
                icon: MapPin,
                title: "Visit Us",
                info: config.address,
                description: "Our main office location",
                action: `https://maps.google.com/?q=${encodeURIComponent(config.address)}`
              },
              {
                icon: Clock,
                title: "Support Hours",
                info: "24/7 Available",
                description: "Round-the-clock technical support",
                action: null
              }
            ].map((contact, index) => {
              const ContactIcon = contact.icon;
              return (
                <Card 
                  key={index} 
                  className={`shadow-lg hover:shadow-2xl transition-all duration-300 border-0 bg-white hover:-translate-y-2 ${contact.action ? 'cursor-pointer' : ''}`}
                  onClick={contact.action ? () => window.open(contact.action, '_blank') : undefined}
                >
                  <CardContent className="p-8 text-center">
                    <div className="bg-gradient-to-br from-onassist-primary to-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <ContactIcon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-bold text-xl mb-2">{contact.title}</h3>
                    <p className="text-onassist-primary font-medium mb-2">{contact.info}</p>
                    <p className="text-gray-600 text-sm">{contact.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form & Features */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Contact Form */}
              <div>
                <Card className="shadow-2xl border-0 bg-white">
                  <CardHeader className="bg-gradient-to-br from-onassist-primary to-blue-600 text-white rounded-t-lg">
                    <CardTitle className="text-2xl font-bold text-center">
                      Send Us a Message
                    </CardTitle>
                    <p className="text-white/90 text-center">
                      Fill out the form below and we'll get back to you shortly
                    </p>
                  </CardHeader>
                  <CardContent className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">First Name *</label>
                          <Input
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                            className="focus:ring-2 focus:ring-onassist-primary"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Last Name *</label>
                          <Input
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                            className="focus:ring-2 focus:ring-onassist-primary"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Email *</label>
                          <Input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="focus:ring-2 focus:ring-onassist-primary"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Phone Number</label>
                          <Input
                            type="tel"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            className="focus:ring-2 focus:ring-onassist-primary"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Subject *</label>
                        <Input
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="focus:ring-2 focus:ring-onassist-primary"
                          placeholder="Brief description of your issue"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Message *</label>
                        <Textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={5}
                          className="focus:ring-2 focus:ring-onassist-primary"
                          placeholder="Describe your tech issue or question in detail"
                        />
                      </div>
                      
                      <Button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-onassist-primary to-blue-600 hover:from-onassist-primary/90 hover:to-blue-600/90 text-white font-bold py-4 text-lg shadow-lg"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5 mr-2" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Features */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-4xl font-bold mb-6">
                    Why Contact <span className="text-onassist-primary">{config.name}</span>?
                  </h2>
                  <p className="text-xl text-gray-600 mb-8">
                    We're committed to providing exceptional support that resolves your tech issues quickly and effectively.
                  </p>
                </div>

                <div className="space-y-6">
                  {[
                    {
                      icon: Headphones,
                      title: "24/7 Expert Support",
                      description: "Our certified technicians are available round-the-clock to assist you with any technical challenge."
                    },
                    {
                      icon: Shield,
                      title: "Secure & Confidential",
                      description: "All your information is handled with the highest level of security and privacy protection."
                    },
                    {
                      icon: Phone,
                      title: "Multiple Contact Options",
                      description: "Reach us via phone, email, chat, or visit our office - whatever works best for you."
                    }
                  ].map((feature, index) => {
                    const FeatureIcon = feature.icon;
                    return (
                      <Card key={index} className="shadow-lg border-0 bg-gradient-to-r from-gray-50 to-white">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div className="bg-gradient-to-br from-onassist-primary to-blue-600 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                              <FeatureIcon className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <h3 className="font-bold text-xl mb-2">{feature.title}</h3>
                              <p className="text-gray-600">{feature.description}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>

                {/* Quick Stats */}
                <Card className="bg-gradient-to-br from-onassist-primary to-blue-600 text-white shadow-2xl">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold mb-6 text-center">Our Response Times</h3>
                    <div className="grid grid-cols-2 gap-6 text-center">
                      <div>
                        <div className="text-3xl font-bold mb-2">{config.response_time_stat || "15 Min"}</div>
                        <div className="text-white/90">Average Response</div>
                      </div>
                      <div>
                        <div className="text-3xl font-bold mb-2">{config.satisfaction_stat || "100%"}</div>
                        <div className="text-white/90">Customer Satisfaction</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ContactPage;
