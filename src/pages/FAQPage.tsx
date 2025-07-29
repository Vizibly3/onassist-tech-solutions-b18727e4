import React from "react";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import { siteConfig } from "@/config/site";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQPage = () => {
  const faqs = [
    {
      question: "What services do you offer?",
      answer:
        "We offer comprehensive tech support services including computer repair, software installation, virus removal, network setup, data recovery, hardware upgrades, and more. Our certified technicians can help with both residential and business needs.",
    },
    {
      question: "How do I schedule a service appointment?",
      answer:
        "You can schedule an appointment by browsing our services, adding them to your cart, and completing the checkout process. We'll contact you within 24 hours to confirm your appointment time.",
    },
    {
      question: "Do you offer on-site services?",
      answer:
        "Yes, we provide both on-site and remote support services. For hardware issues and complex setups, we'll come to your location. For software issues, we often can help remotely.",
    },
    {
      question: "What are your service hours?",
      answer:
        "We're available Monday through Saturday from 9 AM to 6 PM. Emergency services are available for critical business issues outside regular hours.",
    },
    {
      question: "How much do your services cost?",
      answer:
        "Our pricing varies depending on the service required. You can view specific pricing for each service on our website. We provide transparent pricing with no hidden fees.",
    },
    {
      question: "Do you offer warranties on your work?",
      answer:
        "Yes, we provide a 30-day warranty on all our repair services. If the same issue occurs within 30 days, we'll fix it at no additional charge.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, debit cards, and bank transfers. Payment is typically due upon completion of service.",
    },
    {
      question: "Do I need to backup my data before service?",
      answer:
        "We always recommend backing up your important data before any service. While we take every precaution, it's always best to have your data safely backed up.",
    },
    {
      question: "Can you help with both Windows and Mac computers?",
      answer:
        "Absolutely! Our technicians are certified in both Windows and macOS systems, as well as Linux and other operating systems.",
    },
    {
      question: "How quickly can you respond to service requests?",
      answer:
        "For standard requests, we typically respond within 24 hours. Emergency business services can often be addressed the same day or within a few hours.",
    },
  ];

  return (
    <Layout>
      <Helmet>
        <title>Frequently Asked Questions | {siteConfig.name}</title>
        <meta
          name="description"
          content="Find answers to common questions about Smart Doorstep tech support services"
        />
      </Helmet>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-600">
              Find answers to the most common questions about our services
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border rounded-lg px-6"
              >
                <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-onassist-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-12 p-8 bg-gray-50 rounded-lg text-center">
            <h2 className="text-2xl font-semibold mb-4">
              Still have questions?
            </h2>
            <p className="text-gray-600 mb-6">
              Can't find the answer you're looking for? Our friendly customer
              support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex items-center justify-center px-6 py-3 bg-onassist-primary text-white font-semibold rounded-lg hover:bg-onassist-dark transition-colors"
              >
                Email Support
              </a>
              <a
                href={`tel:${siteConfig.contactPhone}`}
                className="inline-flex items-center justify-center px-6 py-3 border border-onassist-primary text-onassist-primary font-semibold rounded-lg hover:bg-onassist-primary hover:text-white transition-colors"
              >
                Call Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FAQPage;
