
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MapPin, Phone, Mail, Clock, Send, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useDynamicSiteConfig } from '@/hooks/useDynamicSiteConfig';

const ContactPage = () => {
  const { config } = useDynamicSiteConfig();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error } = await supabase
        .from('contact_inquiries')
        .insert([{
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone_number: formData.phoneNumber,
          subject: formData.subject,
          message: formData.message
        }]);

      if (error) throw error;

      toast.success('Thank you for your message! We\'ll get back to you soon.');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        subject: '',
        message: ''
      });
    } catch (error: any) {
      console.error('Error submitting form:', error);
      setError('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6 text-onassist-primary" />,
      title: "Our Office",
      content: config.address,
      link: `https://maps.google.com/?q=${encodeURIComponent(config.address)}`
    },
    {
      icon: <Phone className="w-6 h-6 text-onassist-primary" />,
      title: "Phone Number",
      content: config.contactPhone,
      link: `tel:${config.contactPhone}`
    },
    {
      icon: <Mail className="w-6 h-6 text-onassist-primary" />,
      title: "Email Address",
      content: config.email,
      link: `mailto:${config.email}`
    },
    {
      icon: <Clock className="w-6 h-6 text-onassist-primary" />,
      title: "Business Hours",
      content: "24/7 Support Available",
      link: null
    }
  ];

  return (
    <>
      <Helmet>
        <title>Contact Us - {config.name}</title>
        <meta name="description" content={`Get in touch with ${config.name} for professional tech support services. Contact us via phone, email, or our contact form.`} />
      </Helmet>
      
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-onassist-primary to-blue-600 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Contact {config.name}
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                Get in touch with our team for exceptional tech support services
              </p>
              <Button size="lg" className="bg-white text-onassist-primary hover:bg-gray-100 text-lg px-8 py-3">
                Email Us
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {contactInfo.map((info, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-center mb-4">
                      {info.icon}
                    </div>
                    <CardTitle className="text-xl">{info.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {info.link ? (
                      <a 
                        href={info.link}
                        className="text-gray-600 hover:text-onassist-primary transition-colors"
                        target={info.link.startsWith('http') ? '_blank' : undefined}
                        rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                      >
                        {info.content}
                      </a>
                    ) : (
                      <p className="text-gray-600">{info.content}</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Send Us a Message
                </h2>
                <p className="text-xl text-gray-600">
                  Fill out the form below and we'll get back to you within 24 hours
                </p>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-12">
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl">Get In Touch</CardTitle>
                    <CardDescription>
                      We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {error && (
                      <Alert className="mb-6 border-red-200 bg-red-50">
                        <AlertDescription className="text-red-800">
                          {error}
                        </AlertDescription>
                      </Alert>
                    )}
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input
                            id="firstName"
                            name="firstName"
                            type="text"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required
                            className="focus:ring-2 focus:ring-onassist-primary"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input
                            id="lastName"
                            name="lastName"
                            type="text"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required
                            className="focus:ring-2 focus:ring-onassist-primary"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="focus:ring-2 focus:ring-onassist-primary"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phoneNumber">Phone Number</Label>
                        <Input
                          id="phoneNumber"
                          name="phoneNumber"
                          type="tel"
                          value={formData.phoneNumber}
                          onChange={handleInputChange}
                          className="focus:ring-2 focus:ring-onassist-primary"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input
                          id="subject"
                          name="subject"
                          type="text"
                          value={formData.subject}
                          onChange={handleInputChange}
                          required
                          className="focus:ring-2 focus:ring-onassist-primary"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          rows={5}
                          required
                          className="focus:ring-2 focus:ring-onassist-primary"
                        />
                      </div>
                      
                      <Button 
                        type="submit" 
                        size="lg" 
                        className="w-full bg-gradient-to-r from-onassist-primary to-blue-600 hover:from-onassist-primary/90 hover:to-blue-600/90 text-white"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
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
                
                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Choose {config.name}?</h3>
                    <ul className="space-y-4 text-gray-600">
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-onassist-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span>{config.response_time_stat} average response time</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-onassist-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span>Certified and experienced technicians</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-onassist-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span>{config.satisfaction_guarantee_percent}% satisfaction guarantee</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-onassist-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span>24/7 customer support available</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Need Immediate Help?</h4>
                    <p className="text-gray-600 mb-4">
                      For urgent technical issues, call us directly at:
                    </p>
                    <a 
                      href={`tel:${config.contactPhone}`}
                      className="text-2xl font-bold text-onassist-primary hover:text-onassist-primary/80"
                    >
                      {config.contactPhone}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ContactPage;
