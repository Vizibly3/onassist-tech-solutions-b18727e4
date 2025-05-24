
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { siteConfig } from '@/config/site';

const ReturnsPage = () => {
  return (
    <Layout>
      <Helmet>
        <title>Returns & Refunds | {siteConfig.name}</title>
        <meta name="description" content="OnAssist Returns and Refunds Policy - Information about our service guarantees and refund process" />
      </Helmet>
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Returns & Refunds Policy</h1>
          <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>
          
          <div className="prose max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Service Satisfaction Guarantee</h2>
              <p className="text-gray-700 leading-relaxed">
                We stand behind the quality of our services. If you're not completely satisfied with 
                our work, we'll make it right. Our goal is to ensure every customer is happy with 
                the service they receive.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Refund Eligibility</h2>
              <p className="text-gray-700 leading-relaxed mb-4">You may be eligible for a refund if:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>The service was not performed as described</li>
                <li>Technical issues were not resolved as promised</li>
                <li>You're unsatisfied with the quality of work within 7 days of service completion</li>
                <li>Our technician failed to show up for a scheduled appointment without notice</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Refund Process</h2>
              <p className="text-gray-700 leading-relaxed mb-4">To request a refund:</p>
              <ol className="list-decimal list-inside text-gray-700 space-y-2">
                <li>Contact our customer service team within 7 days of service completion</li>
                <li>Provide your order number and detailed explanation of the issue</li>
                <li>Allow us the opportunity to resolve the issue first</li>
                <li>If resolution isn't possible, we'll process your refund within 5-10 business days</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Non-Refundable Services</h2>
              <p className="text-gray-700 leading-relaxed mb-4">The following are generally non-refundable:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Services completed successfully as described</li>
                <li>Consultation fees for diagnostic services</li>
                <li>Third-party software licenses or hardware purchases</li>
                <li>Services where data loss occurred due to pre-existing hardware failure</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Contact Us for Refunds</h2>
              <p className="text-gray-700 leading-relaxed">
                To request a refund or discuss any service concerns, please contact us at{' '}
                <a href={`mailto:${siteConfig.email}`} className="text-onassist-primary hover:underline">
                  {siteConfig.email}
                </a>{' '}
                or call us at{' '}
                <a href={`tel:${siteConfig.contactPhone}`} className="text-onassist-primary hover:underline">
                  {siteConfig.contactPhone}
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ReturnsPage;
