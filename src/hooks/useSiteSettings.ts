
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Define a type for site settings
export type SiteSettings = {
  id: number;
  name: string;
  description?: string | null;
  email?: string | null;
  contactphone?: string | null;
  address?: string | null;
  response_time_stat?: string | null;
  rating_stat?: string | null;
  satisfaction_stat?: string | null;
  happy_customers_stat?: string | null;
  certified_experts_stat?: string | null;
  customer_satisfaction_stat?: string | null;
  cities_covered_stat?: string | null;
  service_warranty_days?: string | null;
  satisfaction_guarantee_percent?: string | null;
  followup_support_text?: string | null;
};

export const fetchSiteSettings = async (): Promise<SiteSettings> => {
  try {
    console.log("Fetching site settings...");
    const { data, error } = await supabase
      .from("site_settings")
      .select("*")
      .eq("id", 1)
      .maybeSingle();

    if (error) {
      console.error("Error fetching site settings:", error);
      throw error;
    }

    console.log("Site settings fetched:", data);

    // Return default values if no settings found
    if (!data) {
      const defaultSettings: SiteSettings = {
        id: 1,
        name: "Smart Doorstep",
        description:
          "Professional Smart Doorstep services for your home and business",
        email: "support@smartdoorstep.com",
        contactphone: "+1 (888) 970-1698",
        address: "123 Tech Avenue, Suite 100, San Francisco, CA 94107",
        response_time_stat: "15 Min",
        rating_stat: "4.9/5",
        satisfaction_stat: "100%",
        happy_customers_stat: "10K+",
        certified_experts_stat: "50+",
        customer_satisfaction_stat: "4.9/5",
        cities_covered_stat: "100+",
        service_warranty_days: "30",
        satisfaction_guarantee_percent: "100",
        followup_support_text: "Free follow-up support",
      };
      console.log("No settings found, returning defaults:", defaultSettings);
      return defaultSettings;
    }

    return data;
  } catch (error) {
    console.error("Error in fetchSiteSettings:", error);
    throw error;
  }
};

export const updateSiteSettings = async (
  updates: Partial<SiteSettings> & { name: string }
) => {
  try {
    console.log("Updating site settings with:", updates);
    // First check if record exists
    const { data: existingData } = await supabase
      .from("site_settings")
      .select("id")
      .eq("id", 1)
      .maybeSingle();

    let result;
    if (existingData) {
      // Update existing record
      const { data, error } = await supabase
        .from("site_settings")
        .update(updates)
        .eq("id", 1)
        .select()
        .single();
      if (error) {
        console.error("Error updating site settings:", error);
        throw error;
      }
      result = data;
    } else {
      // Insert new record
      const { data, error } = await supabase
        .from("site_settings")
        .insert({
          id: 1,
          ...updates,
        })
        .select()
        .single();
      if (error) {
        console.error("Error inserting site settings:", error);
        throw error;
      }
      result = data;
    }
    console.log("Site settings updated successfully:", result);
    return result;
  } catch (error) {
    console.error("Error in updateSiteSettings:", error);
    throw error;
  }
};

export function useSiteSettings() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["site_settings"],
    queryFn: fetchSiteSettings,
    retry: 3,
    refetchOnWindowFocus: false,
  });

  const mutation = useMutation({
    mutationFn: updateSiteSettings,
    onSuccess: (data) => {
      console.log("Site settings mutation successful:", data);
      // Invalidate and refetch all related queries
      queryClient.invalidateQueries({ queryKey: ["site_settings"] });
      // Also update the cache immediately
      queryClient.setQueryData(["site_settings"], data);
      toast.success("Site settings updated successfully!");
    },
    onError: (error: unknown) => {
      console.error("Site settings mutation error:", error);
      const errorMessage =
        (error as { message?: string })?.message || "Please try again.";
      toast.error(`Failed to update site settings: ${errorMessage}`);
    },
  });

  return {
    ...query,
    updateSiteSettings: mutation.mutateAsync,
    isUpdating: mutation.isPending,
  };
}
