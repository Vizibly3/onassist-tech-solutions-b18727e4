
import React from 'react';
import DynamicHeader from './DynamicHeader';
import Footer from './Footer';
import { Toaster } from "@/components/ui/sonner";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <DynamicHeader />
      <main className="flex-grow pt-16">
        {children}
      </main>
      <Footer />
      <Toaster position="top-right" />
    </div>
  );
};

export default Layout;
