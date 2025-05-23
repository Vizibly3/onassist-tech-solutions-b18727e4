
import React from 'react';
import Layout from '@/components/layout/Layout';
import CategorySection from '@/components/services/CategorySection';
import { Helmet } from 'react-helmet-async';
import { siteConfig } from '@/config/site';
import { useCategoriesWithServices } from '@/hooks/useServices';
import { Skeleton } from '@/components/ui/skeleton';

const ServicesPage = () => {
  const { data: categoriesWithServices, isLoading, error } = useCategoriesWithServices();

  if (error) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Error loading services</h1>
            <p className="text-gray-600">Please try again later.</p>
          </div>
        </div>
      </Layout>
    );
  }

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
      
      {isLoading ? (
        <div className="bg-gray-100 py-8 sticky top-16 z-30 shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex overflow-x-auto gap-4 pb-1">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-8 w-32 rounded-full flex-shrink-0" />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gray-100 py-8 sticky top-16 z-30 shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex overflow-x-auto gap-4 pb-1 hide-scrollbar">
              {categoriesWithServices?.map((category) => (
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
      )}
      
      {isLoading ? (
        <div className="container mx-auto px-4 py-16 space-y-16">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="space-y-8">
              <Skeleton className="h-8 w-64" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 3 }).map((_, j) => (
                  <Skeleton key={j} className="h-96 rounded-xl" />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        categoriesWithServices?.map((category) => (
          <CategorySection key={category.id} category={category} showAll />
        ))
      )}
    </Layout>
  );
};

export default ServicesPage;
