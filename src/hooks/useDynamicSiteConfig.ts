
import { useQuery } from '@tanstack/react-query';
import { fetchSiteSettings } from './useSiteSettings';
import { siteConfig } from '@/config/site';

export const useDynamicSiteConfig = () => {
  const { data: dbSettings, isLoading } = useQuery({
    queryKey: ['site_settings'],
    queryFn: fetchSiteSettings,
  });

  // Merge database settings with static config, preferring database values
  const dynamicConfig = {
    ...siteConfig,
    name: dbSettings?.name || siteConfig.name,
    description: dbSettings?.description || siteConfig.description,
    email: dbSettings?.email || siteConfig.email,
    contactPhone: dbSettings?.contactphone || siteConfig.contactPhone,
    address: dbSettings?.address || siteConfig.address,
  };

  return {
    config: dynamicConfig,
    isLoading,
  };
};
