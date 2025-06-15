
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import { toast } from 'sonner';

export const fetchSiteSettings = async () => {
  try {
    console.log('Fetching site settings...');
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .eq('id', 1)
      .maybeSingle();
    
    if (error) {
      console.error('Error fetching site settings:', error);
      throw error;
    }
    
    console.log('Site settings fetched:', data);
    
    // Return default values if no settings found
    if (!data) {
      const defaultSettings = {
        id: 1,
        name: 'OnAssist',
        description: 'Professional tech support services for your home and business',
        email: 'support@onassist.com',
        contactphone: '+1 (888) 970-1698',
        address: '123 Tech Avenue, Suite 100, San Francisco, CA 94107'
      };
      console.log('No settings found, returning defaults:', defaultSettings);
      return defaultSettings;
    }
    
    return data;
  } catch (error) {
    console.error('Error in fetchSiteSettings:', error);
    throw error;
  }
};

export const updateSiteSettings = async (updates: any) => {
  try {
    console.log('Updating site settings with:', updates);
    
    // First check if record exists
    const { data: existingData } = await supabase
      .from('site_settings')
      .select('id')
      .eq('id', 1)
      .maybeSingle();

    let result;
    
    if (existingData) {
      // Update existing record
      const { data, error } = await supabase
        .from('site_settings')
        .update(updates)
        .eq('id', 1)
        .select()
        .single();
      
      if (error) {
        console.error('Error updating site settings:', error);
        throw error;
      }
      result = data;
    } else {
      // Insert new record
      const { data, error } = await supabase
        .from('site_settings')
        .insert({
          id: 1,
          ...updates
        })
        .select()
        .single();
      
      if (error) {
        console.error('Error inserting site settings:', error);
        throw error;
      }
      result = data;
    }
    
    console.log('Site settings updated successfully:', result);
    return result;
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
    retry: 3,
    refetchOnWindowFocus: false,
  });

  const mutation = useMutation({
    mutationFn: updateSiteSettings,
    onSuccess: (data) => {
      console.log('Site settings mutation successful:', data);
      // Invalidate and refetch all related queries
      queryClient.invalidateQueries({ queryKey: ['site_settings'] });
      // Also update the cache immediately
      queryClient.setQueryData(['site_settings'], data);
      toast.success('Site settings updated successfully!');
    },
    onError: (error: any) => {
      console.error('Site settings mutation error:', error);
      toast.error(`Failed to update site settings: ${error.message || 'Please try again.'}`);
    },
  });

  return { 
    ...query, 
    updateSiteSettings: mutation.mutateAsync,
    isUpdating: mutation.isPending 
  };
}
