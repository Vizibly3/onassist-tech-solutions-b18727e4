import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Helmet } from 'react-helmet-async';
import { siteConfig } from '@/config/site';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  subject: string;
  message: string;
}

const ContactPage = () => {
  const location = useLocation();
  const { toast } = useToast();
  const [showThankYou, setShowThankYou] = useState(false);
  const { register, handleSubmit, reset, setValue, formState: { errors, isSubmitting } } = useForm<ContactFormData>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      subject: '',
      message: ''
    }
  });

  // Pre-fill form if data is passed via navigation state
  useEffect(() => {
    if (location.state) {
      const { selectedService, subject } = location.state as any;
      if (selectedService) {
        setValue('subject', subject || `Service Inquiry: ${selectedService}`);
        setValue('message', `I'm interested in your ${selectedService} service. Please provide more information and schedule a consultation.`);
      }
    }
  }, [location.state, setValue]);

  const onSubmit = async (data: ContactFormData) => {
    try {
      console.log('Submitting contact form with data:', data);
      
      const { error } = await supabase
        .from('contact_inquiries')
        .insert([{
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          phone_number: data.phoneNumber || null,
          subject: data.subject,
          message: data.message,
          status: 'new'
        }]);

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      // Show success message
      toast({
        title: "🎉 Thank You for Reaching Out!",
        description: "Your message has been sent successfully! Our expert team will review your inquiry and get back to you within 24 hours with personalized assistance.",
      });

      // Show thank you section
      setShowThankYou(true);

      // Reset form
      reset({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        subject: '',
        message: ''
      });

      // Hide thank you message after 5 seconds
      setTimeout(() => {
        setShowThankYou(false);
      }, 5000);

    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast({
        title: "❌ Error Sending Message",
        description: "We're sorry, there was an issue sending your message. Please try again or call us directly at " + siteConfig.contactPhone,
        variant: "destructive",
      });
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>Contact Us | {siteConfig.name}</title>
        <meta name="description" content="Get in touch with our tech support team. We're here to help with all your technology needs." />
      </Helmet>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-onassist-primary via-blue-600 to-onassist-dark text-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Get In Touch</h1>
            <p className="text-xl mb-8 opacity-90 leading-relaxed">
              Ready to solve your tech problems? Our expert team is here to help you get back on track.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="shadow-xl border-0">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Send us a message</CardTitle>
              <p className="text-gray-600">Fill out the form below and we'll get back to you within 24 hours.</p>
            </CardHeader>
            <CardContent>
              {showThankYou ? (
                <div className="text-center py-12">
                  <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-green-800 mb-4">Thank You!</h3>
                  <p className="text-gray-600 mb-6">
                    Your message has been sent successfully! Our expert team will review your inquiry and get back to you within 24 hours.
                  </p>
                  <Button
                    onClick={() => setShowThankYou(false)}
                    className="bg-onassist-primary hover:bg-onassist-dark text-white"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        {...register('firstName', { required: 'First name is required' })}
                        className="mt-1"
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        {...register('lastName', { required: 'Last name is required' })}
                        className="mt-1"
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
                      )}
                    </div>
                  </div>

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
                      className="mt-1"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <Input
                      id="phoneNumber"
                      type="tel"
                      {...register('phoneNumber')}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      {...register('subject', { required: 'Subject is required' })}
                      className="mt-1"
                    />
                    {errors.subject && (
                      <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      rows={5}
                      {...register('message', { required: 'Message is required' })}
                      className="mt-1"
                    />
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-onassist-primary hover:bg-onassist-dark text-white py-3"
                  >
                    {isSubmitting ? 'Sending...' : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="shadow-xl border-0">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-onassist-primary/10 p-3 rounded-xl">
                      <Phone className="w-6 h-6 text-onassist-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Call Us</h4>
                      <p className="text-gray-600">{siteConfig.contactPhone}</p>
                      <p className="text-sm text-gray-500">Available 24/7 for emergencies</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-onassist-primary/10 p-3 rounded-xl">
                      <Mail className="w-6 h-6 text-onassist-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Email Us</h4>
                      <p className="text-gray-600">{siteConfig.email}</p>
                      <p className="text-sm text-gray-500">We'll respond within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-onassist-primary/10 p-3 rounded-xl">
                      <MapPin className="w-6 h-6 text-onassist-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Service Area</h4>
                      <p className="text-gray-600">Nationwide Coverage</p>
                      <p className="text-sm text-gray-500">On-site and remote support available</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-onassist-primary/10 p-3 rounded-xl">
                      <Clock className="w-6 h-6 text-onassist-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Business Hours</h4>
                      <p className="text-gray-600">Mon - Fri: 8:00 AM - 8:00 PM</p>
                      <p className="text-gray-600">Sat - Sun: 9:00 AM - 6:00 PM</p>
                      <p className="text-sm text-gray-500">Emergency support available 24/7</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-xl border-0 bg-gradient-to-br from-onassist-primary to-blue-600 text-white">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Need Immediate Help?</h3>
                <p className="mb-6 opacity-90">
                  For urgent tech issues, call us directly for immediate assistance.
                </p>
                <Button
                  className="bg-white text-onassist-primary hover:bg-gray-100 font-bold px-8 py-3"
                  onClick={() => window.open(`tel:${siteConfig.contactPhone}`, '_self')}
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now: {siteConfig.contactPhone}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactPage;
