
import React from 'react';
import Layout from '@/components/layout/Layout';
import Hero from '@/components/home/Hero';
import FeatureServices from '@/components/home/FeatureServices';
import HowItWorks from '@/components/home/HowItWorks';
import Testimonials from '@/components/home/Testimonials';
import CTASection from '@/components/home/CTASection';
import { Helmet } from 'react-helmet-async';
import { siteConfig } from '@/config/site';

const Index = () => {
  return (
    <Layout>
      <Helmet>
        <title>{siteConfig.name} | Professional Tech Support Services</title>
        <meta name="description" content={siteConfig.description} />
        <meta property="og:title" content={`${siteConfig.name} | Professional Tech Support Services`} />
        <meta property="og:description" content={siteConfig.description} />
        <meta property="og:type" content="website" />
      </Helmet>
      
      <Hero />
      <FeatureServices />
      <HowItWorks />
      <Testimonials />
      <CTASection />
    </Layout>
  );
};

export default Index;
