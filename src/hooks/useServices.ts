
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { slugify } from '@/utils/slugify';

export interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  image_url: string;
  category_id: string;
  popular: boolean;
  active: boolean;
  slug?: string;
}

export interface ServiceCategory {
  id: string;
  title: string;
  description: string;
  image_url: string;
  services?: Service[];
  slug?: string;
}

export const useServiceCategories = () => {
  return useQuery({
    queryKey: ['service-categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('service_categories')
        .select('*')
        .order('title');
      
      if (error) throw error;
      
      // Add slugs to categories
      const categoriesWithSlugs = data?.map(category => ({
        ...category,
        slug: slugify(category.title)
      })) || [];
      
      return categoriesWithSlugs as ServiceCategory[];
    },
  });
};

export const useServices = () => {
  return useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('active', true)
        .order('title');
      
      if (error) throw error;
      
      // Add slugs to services
      const servicesWithSlugs = data?.map(service => ({
        ...service,
        slug: slugify(service.title)
      })) || [];
      
      return servicesWithSlugs as Service[];
    },
  });
};

export const useServicesByCategory = (categorySlug: string) => {
  return useQuery({
    queryKey: ['services', 'category', categorySlug],
    queryFn: async () => {
      // First get the category by slug
      const { data: categories, error: categoryError } = await supabase
        .from('service_categories')
        .select('id, title')
        .order('title');
      
      if (categoryError) throw categoryError;
      
      const category = categories?.find(cat => slugify(cat.title) === categorySlug);
      if (!category) throw new Error('Category not found');
      
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('category_id', category.id)
        .eq('active', true)
        .order('title');
      
      if (error) throw error;
      
      // Add slugs to services
      const servicesWithSlugs = data?.map(service => ({
        ...service,
        slug: slugify(service.title)
      })) || [];
      
      return servicesWithSlugs as Service[];
    },
    enabled: !!categorySlug,
  });
};

export const useServiceBySlug = (serviceSlug: string) => {
  return useQuery({
    queryKey: ['service', 'slug', serviceSlug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('active', true);
      
      if (error) throw error;
      
      // Find service by matching slug
      const service = data?.find(s => slugify(s.title) === serviceSlug);
      if (!service) throw new Error('Service not found');
      
      return {
        ...service,
        slug: slugify(service.title)
      } as Service;
    },
    enabled: !!serviceSlug,
  });
};

export const useCategoryBySlug = (categorySlug: string) => {
  return useQuery({
    queryKey: ['category', 'slug', categorySlug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('service_categories')
        .select('*')
        .order('title');
      
      if (error) throw error;
      
      // Find category by matching slug
      const category = data?.find(cat => slugify(cat.title) === categorySlug);
      if (!category) throw new Error('Category not found');
      
      return {
        ...category,
        slug: slugify(category.title)
      } as ServiceCategory;
    },
    enabled: !!categorySlug,
  });
};

export const useCategoriesWithServices = () => {
  return useQuery({
    queryKey: ['categories-with-services'],
    queryFn: async () => {
      const { data: categories, error: categoriesError } = await supabase
        .from('service_categories')
        .select('*')
        .order('title');
      
      if (categoriesError) throw categoriesError;

      const { data: services, error: servicesError } = await supabase
        .from('services')
        .select('*')
        .eq('active', true)
        .order('title');
      
      if (servicesError) throw servicesError;

      // Group services by category and add slugs
      const categoriesWithServices = categories.map(category => ({
        ...category,
        slug: slugify(category.title),
        services: services
          .filter(service => service.category_id === category.id)
          .map(service => ({
            ...service,
            slug: slugify(service.title)
          }))
      }));

      return categoriesWithServices as (ServiceCategory & { services: Service[] })[];
    },
  });
};
