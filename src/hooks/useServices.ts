
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

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
}

export interface ServiceCategory {
  id: string;
  title: string;
  description: string;
  image_url: string;
  services?: Service[];
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
      return data as ServiceCategory[];
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
      return data as Service[];
    },
  });
};

export const useServicesByCategory = (categoryId: string) => {
  return useQuery({
    queryKey: ['services', 'category', categoryId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('category_id', categoryId)
        .eq('active', true)
        .order('title');
      
      if (error) throw error;
      return data as Service[];
    },
    enabled: !!categoryId,
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

      // Group services by category
      const categoriesWithServices = categories.map(category => ({
        ...category,
        services: services.filter(service => service.category_id === category.id)
      }));

      return categoriesWithServices as (ServiceCategory & { services: Service[] })[];
    },
  });
};
