
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { countries } from '@/data/locations';

interface SitemapEntry {
  loc: string;
  changefreq: string;
  priority: string;
  lastmod?: string;
}

const Sitemap = () => {
  const [sitemapXml, setSitemapXml] = useState<string>('');

  const generateSitemap = async () => {
    const baseUrl = 'https://onassist.lovable.app';
    const currentDate = new Date().toISOString().split('T')[0];
    
    const entries: SitemapEntry[] = [];

    // Static pages with high priority
    const staticPages = [
      { path: '/', priority: '1.0', changefreq: 'daily' },
      { path: '/about', priority: '0.8', changefreq: 'monthly' },
      { path: '/contact', priority: '0.8', changefreq: 'monthly' },
      { path: '/services', priority: '0.9', changefreq: 'weekly' },
      { path: '/membership', priority: '0.7', changefreq: 'monthly' },
      { path: '/partner', priority: '0.7', changefreq: 'monthly' },
      { path: '/faq', priority: '0.6', changefreq: 'monthly' },
      { path: '/privacy', priority: '0.3', changefreq: 'yearly' },
      { path: '/terms', priority: '0.3', changefreq: 'yearly' },
      { path: '/returns', priority: '0.5', changefreq: 'monthly' },
    ];

    staticPages.forEach(page => {
      entries.push({
        loc: `${baseUrl}${page.path}`,
        changefreq: page.changefreq,
        priority: page.priority,
        lastmod: currentDate
      });
    });

    // Auth pages (lower priority)
    const authPages = [
      { path: '/auth/login', priority: '0.4', changefreq: 'monthly' },
      { path: '/auth/register', priority: '0.4', changefreq: 'monthly' },
    ];

    authPages.forEach(page => {
      entries.push({
        loc: `${baseUrl}${page.path}`,
        changefreq: page.changefreq,
        priority: page.priority,
        lastmod: currentDate
      });
    });

    try {
      // Fetch service categories from Supabase
      const { data: categories } = await supabase
        .from('service_categories')
        .select('*');

      // Fetch services from Supabase
      const { data: services } = await supabase
        .from('services')
        .select('*, service_categories(title)')
        .eq('active', true);

      // Add service category pages
      if (categories) {
        categories.forEach(category => {
          const categorySlug = category.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
          entries.push({
            loc: `${baseUrl}/services/${categorySlug}`,
            changefreq: 'weekly',
            priority: '0.8',
            lastmod: category.updated_at?.split('T')[0] || currentDate
          });
        });
      }

      // Add individual service pages
      if (services) {
        services.forEach(service => {
          const serviceSlug = service.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
          entries.push({
            loc: `${baseUrl}/service/${serviceSlug}`,
            changefreq: 'weekly',
            priority: '0.7',
            lastmod: service.updated_at?.split('T')[0] || currentDate
          });
        });
      }

      // Add location-based pages using the countries export
      countries.forEach(country => {
        const countrySlug = country.slug;
        
        // Country pages
        entries.push({
          loc: `${baseUrl}/${countrySlug}`,
          changefreq: 'monthly',
          priority: '0.6',
          lastmod: currentDate
        });

        country.states.forEach(state => {
          const stateSlug = state.slug;
          
          // State pages
          entries.push({
            loc: `${baseUrl}/${countrySlug}/${stateSlug}`,
            changefreq: 'monthly',
            priority: '0.5',
            lastmod: currentDate
          });

          // State + Service pages
          if (services) {
            services.forEach(service => {
              const serviceSlug = service.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
              entries.push({
                loc: `${baseUrl}/${countrySlug}/${stateSlug}/${serviceSlug}`,
                changefreq: 'monthly',
                priority: '0.4',
                lastmod: currentDate
              });
            });
          }

          state.cities.forEach(city => {
            const citySlug = city.slug;
            
            // City pages
            entries.push({
              loc: `${baseUrl}/${countrySlug}/${stateSlug}/${citySlug}`,
              changefreq: 'monthly',
              priority: '0.4',
              lastmod: currentDate
            });

            // City + Category pages
            if (categories) {
              categories.forEach(category => {
                const categorySlug = category.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
                entries.push({
                  loc: `${baseUrl}/${countrySlug}/${stateSlug}/${citySlug}/${categorySlug}`,
                  changefreq: 'monthly',
                  priority: '0.3',
                  lastmod: currentDate
                });
              });
            }

            // City + Service pages
            if (services) {
              services.forEach(service => {
                const serviceSlug = service.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
                entries.push({
                  loc: `${baseUrl}/${countrySlug}/${stateSlug}/${citySlug}/${serviceSlug}`,
                  changefreq: 'monthly',
                  priority: '0.3',
                  lastmod: currentDate
                });
              });
            }
          });
        });
      });

    } catch (error) {
      console.error('Error fetching data for sitemap:', error);
    }

    // Generate XML
    const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
    const xmlFooter = '</urlset>';
    
    const xmlBody = entries.map(entry => 
      `  <url>
    <loc>${entry.loc}</loc>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
    <lastmod>${entry.lastmod}</lastmod>
  </url>`
    ).join('\n');

    const fullXml = `${xmlHeader}\n${xmlBody}\n${xmlFooter}`;
    setSitemapXml(fullXml);
  };

  useEffect(() => {
    generateSitemap();
  }, []);

  // This component doesn't render anything visible
  // It's used to generate the sitemap data
  return null;
};

export default Sitemap;
