
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { siteConfig } from '@/config/site';
import { Helmet } from 'react-helmet-async';

const ContactPage = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent successfully!", {
      description: "We'll get back to you as soon as possible.",
    });
  };
  
  return (
    <Layout>
      <Helmet>
        <title>Contact Us | {siteConfig.name}</title>
        <meta name="description" content="Get in touch with our tech support team for help with all your technology needs." />
      </Helmet>
      
      <div className="bg-gradient-to-r from-onassist-primary to-onassist-dark text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl max-w-3xl opacity-90">
            Have questions or need assistance? Our team is here to help you with all your tech support needs.
          </p>
        </div>
      </div>
      
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="block font-medium">First Name</label>
                    <Input 
                      id="firstName" 
                      placeholder="John" 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="lastName" className="block font-medium">Last Name</label>
                    <Input 
                      id="lastName" 
                      placeholder="Doe" 
                      required 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="block font-medium">Email Address</label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="john.doe@example.com" 
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="phone" className="block font-medium">Phone Number</label>
                  <Input 
                    id="phone" 
                    type="tel" 
                    placeholder="(555) 123-4567" 
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="subject" className="block font-medium">Subject</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Inquiry</SelectItem>
                      <SelectItem value="support">Technical Support</SelectItem>
                      <SelectItem value="booking">Service Booking</SelectItem>
                      <SelectItem value="feedback">Feedback</SelectItem>
                      <SelectItem value="career">Career Opportunities</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="block font-medium">Message</label>
                  <Textarea 
                    id="message" 
                    placeholder="How can we help you today?" 
                    rows={5} 
                    required 
                  />
                </div>
                
                <Button 
                  type="submit"
                  className="w-full bg-onassist-primary hover:bg-onassist-dark"
                >
                  Send Message
                </Button>
              </form>
            </div>
            
            {/* Contact Information */}
            <div>
              <div className="bg-gray-50 p-8 rounded-xl mb-8 border border-gray-100">
                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-onassist-primary/10 p-3 rounded-lg text-onassist-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Phone</h3>
                      <p className="text-gray-600 mb-2">{siteConfig.contactPhone}</p>
                      <p className="text-sm text-onassist-primary">{siteConfig.support.hours}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-onassist-primary/10 p-3 rounded-lg text-onassist-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Email</h3>
                      <p className="text-gray-600">{siteConfig.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-onassist-primary/10 p-3 rounded-lg text-onassist-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Address</h3>
                      <p className="text-gray-600">{siteConfig.address}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-8 rounded-xl border border-gray-100">
                <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-1">How soon can a technician come to my home?</h3>
                    <p className="text-gray-600">In most areas, we can have a technician at your location within 1-2 hours for urgent issues, or you can schedule a visit at your convenience.</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-lg mb-1">What areas do you service?</h3>
                    <p className="text-gray-600">We provide service in most major metropolitan areas across the United States. Enter your zip code when booking to check availability.</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Are your technicians background checked?</h3>
                    <p className="text-gray-600">Yes, all our technicians undergo thorough background checks and are fully trained and certified.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactPage;
