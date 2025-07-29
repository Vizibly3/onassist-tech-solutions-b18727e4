import React from "react";
import DynamicHeader from "@/components/layout/DynamicHeader";
import Footer from "@/components/layout/Footer";
import NewHero from "@/components/home/NewHero";
import FeatureServices from "@/components/home/FeatureServices";
import MeetOurTechnicians from "@/components/home/MeetOurTechnicians";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import HowItWorks from "@/components/home/HowItWorks";
import Testimonials from "@/components/home/Testimonials";
import CTASection from "@/components/home/CTASection";
import { Helmet } from "react-helmet-async";
import { useDynamicSiteConfig } from "@/hooks/useDynamicSiteConfig";

const Index = () => {
  const { config } = useDynamicSiteConfig();

  return (
    <>
      <Helmet>
        <title>Smart Doorstep | Your Smart Doorstep Support </title>
        <meta
          name="description"
          content="Professional Smart Doorstep support services for smart homes, computers, networks, and more. Fast, reliable solutions from certified technicians."
        />
      </Helmet>

      <div className="min-h-screen">
        <DynamicHeader />

        <main className="pt-16">
          <NewHero />
          <FeatureServices />
          <WhyChooseUs />
          <MeetOurTechnicians />
          <HowItWorks />
          <Testimonials />
          <CTASection />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Index;
