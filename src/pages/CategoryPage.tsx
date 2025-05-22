
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { getCategoryById } from '@/config/services';
import CategorySection from '@/components/services/CategorySection';
import { Button } from '@/components/ui/button';
import { Helmet } from 'react-helmet-async';
import { siteConfig } from '@/config/site';
import { ChevronLeft } from 'lucide-react';

const CategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const category = getCategoryById(categoryId || '');
  
  if (!category) {
    return (
      <Layout>
        <div className="min-h-[50vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Category not found</h1>
            <p className="text-gray-600 mb-6">The service category you're looking for doesn't exist.</p>
            <Button asChild>
              <Link to="/services">View All Services</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <Helmet>
        <title>{category.title} Services | {siteConfig.name}</title>
        <meta name="description" content={category.description} />
      </Helmet>
      
      <div className="bg-gradient-to-r from-onassist-primary to-onassist-dark text-white py-16">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <Button 
              asChild
              variant="outline" 
              size="sm"
              className="border-white/40 text-white hover:bg-white/10"
            >
              <Link to="/services" className="flex items-center gap-1">
                <ChevronLeft className="h-4 w-4" />
                All Services
              </Link>
            </Button>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{category.title}</h1>
          <p className="text-xl max-w-3xl opacity-90">
            {category.description}
          </p>
        </div>
      </div>
      
      <CategorySection category={category} showAll />
    </Layout>
  );
};

export default CategoryPage;
