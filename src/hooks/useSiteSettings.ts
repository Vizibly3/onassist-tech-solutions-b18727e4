
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";

export const fetchSiteSettings = async () => {
  try {
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .eq('id', 1)
      .maybeSingle();
    
    if (error) {
      console.error('Error fetching site settings:', error);
      throw error;
    }
    
    // Return default values if no settings found
    if (!data) {
      return {
        id: 1,
        name: 'OnAssist',
        description: 'Professional tech support services for your home and business',
        email: 'support@onassist.com',
        contactphone: '+1 (888) 970-1698',
        address: '123 Tech Avenue, Suite 100, San Francisco, CA 94107'
      };
    }
    
    return data;
  } catch (error) {
    console.error('Error in fetchSiteSettings:', error);
    throw error;
  }
};

export const updateSiteSettings = async (updates: any) => {
  try {
    const { error } = await supabase
      .from('site_settings')
      .upsert({
        id: 1,
        ...updates
      });
    
    if (error) {
      console.error('Error updating site settings:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error in updateSiteSettings:', error);
    throw error;
  }
};

export function useSiteSettings() {
  const queryClient = useQueryClient();
  
  const query = useQuery({
    queryKey: ['site_settings'],
    queryFn: fetchSiteSettings,
    retry: 2,
    refetchOnWindowFocus: false,
  });

  const mutation = useMutation({
    mutationFn: updateSiteSettings,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['site_settings'] });
    },
    onError: (error) => {
      console.error('Site settings mutation error:', error);
    },
  });

  return { 
    ...query, 
    updateSiteSettings: mutation.mutateAsync,
    isUpdating: mutation.isPending 
  };
}
