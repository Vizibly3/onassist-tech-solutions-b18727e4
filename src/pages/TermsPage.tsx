import React from "react";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import { siteConfig } from "@/config/site";

const TermsPage = () => {
  return (
    <Layout>
      <Helmet>
        <title>Terms of Service | {siteConfig.name}</title>
        <meta
          name="description"
          content="Smart Doorstep Terms of Service - Rules and regulations for using our services"
        />
      </Helmet>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
          <p className="text-gray-600 mb-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <div className="prose max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">
                Acceptance of Terms
              </h2>
              <p className="text-gray-700 leading-relaxed">
                By accessing and using Smart Doorstep services, you accept and
                agree to be bound by the terms and provision of this agreement.
                If you do not agree to these terms, you may not use our
                services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                Service Description
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Smart Doorstep provides professional technology support services
                including but not limited to computer repair, software
                installation, network setup, and technical consulting.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                User Responsibilities
              </h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>
                  Provide accurate and complete information when requesting
                  services
                </li>
                <li>
                  Ensure access to the equipment or systems requiring service
                </li>
                <li>Back up important data before service appointments</li>
                <li>Pay for services as agreed upon</li>
                <li>Treat our technicians with respect and professionalism</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Payment Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                Payment is due upon completion of services unless otherwise
                agreed upon. We accept various payment methods including credit
                cards and bank transfers. Late payments may incur additional
                fees.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                Limitation of Liability
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Smart Doorstep shall not be liable for any indirect, incidental,
                special, consequential, or punitive damages, including without
                limitation, loss of profits, data, use, goodwill, or other
                intangible losses.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                Contact Information
              </h2>
              <p className="text-gray-700 leading-relaxed">
                For questions about these Terms of Service, please contact us at{" "}
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-onassist-primary hover:underline"
                >
                  {siteConfig.email}
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TermsPage;
