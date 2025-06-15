import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";

// Use raw SQL table names and column names to bypass type issues.
export const fetchSiteSettings = async () => {
  // use `.maybeSingle()` for robustness if the row is missing
  const { data, error } = await supabase
    .from('site_settings' as any)
    .select('*')
    .eq('id', 1)
    .maybeSingle();
  if (error) throw error;
  return data;
};

export const updateSiteSettings = async (updates: any) => {
  // Ensure we're passing correct names for updates, and keep id=1
  const { error } = await supabase
    .from('site_settings' as any)
    .update(updates)
    .eq('id', 1); // Single row (id=1)
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

  return { ...query, updateSiteSettings: mutation.mutateAsync };
}
