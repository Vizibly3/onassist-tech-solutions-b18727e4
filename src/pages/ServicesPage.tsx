
import React from 'react';
import Layout from '@/components/layout/Layout';
import { serviceCategories } from '@/config/services';
import CategorySection from '@/components/services/CategorySection';
import { Helmet } from 'react-helmet-async';
import { siteConfig } from '@/config/site';

const ServicesPage = () => {
  return (
    <Layout>
      <Helmet>
        <title>Services | {siteConfig.name}</title>
        <meta name="description" content="Browse our comprehensive tech support services for all your technology needs." />
      </Helmet>
      
      <div className="bg-gradient-to-r from-onassist-primary to-onassist-dark text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Tech Support Services</h1>
          <p className="text-xl max-w-3xl opacity-90">
            From computer issues to smart home setup, our tech experts are ready to solve your tech problems.
          </p>
        </div>
      </div>
      
      <div className="bg-gray-100 py-8 sticky top-16 z-30 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto gap-4 pb-1 hide-scrollbar">
            {serviceCategories.map((category) => (
              <a 
                key={category.id} 
                href={`#category-${category.id}`}
                className="bg-white px-5 py-2 rounded-full shadow-sm whitespace-nowrap text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                {category.title}
              </a>
            ))}
          </div>
        </div>
      </div>
      
      {serviceCategories.map((category) => (
        <CategorySection key={category.id} category={category} showAll />
      ))}
    </Layout>
  );
};

export default ServicesPage;
