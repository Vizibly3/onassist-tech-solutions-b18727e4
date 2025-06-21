import { useQuery } from "@tanstack/react-query";
import { fetchSiteSettings } from "./useSiteSettings";
import { siteConfig } from "@/config/site";

export const useDynamicSiteConfig = () => {
  const { data: dbSettings, isLoading } = useQuery({
    queryKey: ["site_settings"],
    queryFn: fetchSiteSettings,
    refetchOnWindowFocus: false,
  });

  // Merge database settings with static config, preferring database values
  const dynamicConfig = {
    ...siteConfig,
    name: dbSettings?.name || siteConfig.name,
    description: dbSettings?.description || siteConfig.description,
    email: dbSettings?.email || siteConfig.email,
    contactPhone: dbSettings?.contactphone || siteConfig.contactPhone,
    address: dbSettings?.address || siteConfig.address,
    response_time_stat:
      dbSettings?.response_time_stat || siteConfig.response_time_stat,
    rating_stat: dbSettings?.rating_stat || siteConfig.rating_stat,
    satisfaction_stat:
      dbSettings?.satisfaction_stat || siteConfig.satisfaction_stat,
    happy_customers_stat:
      dbSettings?.happy_customers_stat || siteConfig.happy_customers_stat,
  };

  return {
    config: dynamicConfig,
    isLoading,
  };
};
