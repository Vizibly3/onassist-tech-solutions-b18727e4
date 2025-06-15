
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";

export const fetchSiteSettings = async () => {
  const { data, error } = await supabase
    .from('site_settings')
    .select('*')
    .eq('id', 1)
    .single();
  
  if (error) throw error;
  return data;
};

export const updateSiteSettings = async (updates: any) => {
  const { error } = await supabase
    .from('site_settings')
    .update(updates)
    .eq('id', 1);
  
  if (error) throw error;
};

export function useSiteSettings() {
  const queryClient = useQueryClient();
  
  const query = useQuery({
    queryKey: ['site_settings'],
    queryFn: fetchSiteSettings,
  });

  const mutation = useMutation({
    mutationFn: updateSiteSettings,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['site_settings'] });
    },
  });

  return { 
    ...query, 
    updateSiteSettings: mutation.mutateAsync,
    isUpdating: mutation.isPending 
  };
}
