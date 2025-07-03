
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { siteConfig } from '@/config/site';

const AboutPage = () => {
  return (
    <Layout>
      <Helmet>
        <title>About Us | {siteConfig.name}</title>
        <meta name="description" content="Learn about our company, mission, and expert tech support team." />
      </Helmet>

      <div className="bg-gradient-to-r from-onassist-primary to-onassist-dark text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About OnAssist</h1>
          <p className="text-xl max-w-3xl opacity-90">
            Professional tech support services delivered by experts who care about solving your technology problems.
          </p>
        </div>
      </div>
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Founded in 2020, OnAssist was created with a simple mission: to make technology accessible and stress-free for everyone. We recognized that as technology becomes more integral to our daily lives, the complexity of maintaining and troubleshooting these systems increases.
              </p>
              <p className="text-gray-600 mb-4">
                What started as a small team of passionate tech enthusiasts has grown into a nationwide network of certified professionals, ready to solve any tech challenge you might face.
              </p>
              <p className="text-gray-600">
                Our approach combines technical expertise with clear communication, ensuring that you not only get your problem solved but also understand how to prevent similar issues in the future.
              </p>
            </div>
            <div className="bg-gray-100 rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-4">Our Values</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="bg-onassist-primary rounded-full p-1 mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold">Customer-First Approach</h4>
                    <p className="text-gray-600">We prioritize your needs and ensure every interaction leaves you satisfied and empowered.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-onassist-primary rounded-full p-1 mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold">Technical Excellence</h4>
                    <p className="text-gray-600">Our technicians undergo rigorous training and certification to ensure top-quality service.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-onassist-primary rounded-full p-1 mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold">Transparent Communication</h4>
                    <p className="text-gray-600">We explain complex issues in simple terms and provide clear pricing with no hidden fees.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-onassist-primary rounded-full p-1 mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold">Continuous Improvement</h4>
                    <p className="text-gray-600">We constantly update our skills and knowledge to stay ahead of technological advancements.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Michael Johnson",
                position: "Founder & CEO",
                image: "/placeholder.svg",
                bio: "With over 15 years in IT solutions, Michael founded OnAssist to make tech support accessible to everyone."
              },
              {
                name: "Sarah Chen",
                position: "Technical Director",
                image: "/placeholder.svg",
                bio: "Sarah leads our technical team, ensuring our technicians have the skills and tools to solve any tech problem."
              },
              {
                name: "David Rodriguez",
                position: "Customer Experience Manager",
                image: "/placeholder.svg",
                bio: "David ensures every customer interaction exceeds expectations and builds lasting relationships."
              },
              {
                name: "Emily Wilson",
                position: "Training Specialist",
                image: "/placeholder.svg",
                bio: "Emily develops our training programs, keeping our team updated on the latest technology solutions."
              }
            ].map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="aspect-square">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-1">{member.name}</h3>
                  <p className="text-onassist-primary font-medium mb-3">{member.position}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;
