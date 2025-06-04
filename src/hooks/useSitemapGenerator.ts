
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { countries } from '@/data/locations';

export const useSitemapGenerator = () => {
  const generateSitemap = async () => {
    const baseUrl = 'https://onassist.lovable.app';
    const currentDate = new Date().toISOString().split('T')[0];
    const entries: string[] = [];

    // Static pages
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
      entries.push(`  <url>
    <loc>${baseUrl}${page.path}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    <lastmod>${currentDate}</lastmod>
  </url>`);
    });

    try {
      // Fetch dynamic data
      const { data: categories } = await supabase
        .from('service_categories')
        .select('*');

      const { data: services } = await supabase
        .from('services')
        .select('*')
        .eq('active', true);

      // Add category pages
      if (categories) {
        categories.forEach(category => {
          const categorySlug = category.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
          entries.push(`  <url>
    <loc>${baseUrl}/services/${categorySlug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <lastmod>${category.updated_at?.split('T')[0] || currentDate}</lastmod>
  </url>`);
        });
      }

      // Add service pages
      if (services) {
        services.forEach(service => {
          const serviceSlug = service.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
          entries.push(`  <url>
    <loc>${baseUrl}/service/${serviceSlug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
    <lastmod>${service.updated_at?.split('T')[0] || currentDate}</lastmod>
  </url>`);
        });
      }

      // Add location-based pages using the countries export
      countries.forEach(country => {
        const countrySlug = country.slug;
        
        entries.push(`  <url>
    <loc>${baseUrl}/${countrySlug}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
    <lastmod>${currentDate}</lastmod>
  </url>`);

        country.states.forEach(state => {
          const stateSlug = state.slug;
          
          entries.push(`  <url>
    <loc>${baseUrl}/${countrySlug}/${stateSlug}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
    <lastmod>${currentDate}</lastmod>
  </url>`);

          if (services) {
            services.forEach(service => {
              const serviceSlug = service.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
              entries.push(`  <url>
    <loc>${baseUrl}/${countrySlug}/${stateSlug}/${serviceSlug}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.4</priority>
    <lastmod>${currentDate}</lastmod>
  </url>`);
            });
          }

          state.cities.forEach(city => {
            const citySlug = city.slug;
            
            entries.push(`  <url>
    <loc>${baseUrl}/${countrySlug}/${stateSlug}/${citySlug}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.4</priority>
    <lastmod>${currentDate}</lastmod>
  </url>`);

            if (categories) {
              categories.forEach(category => {
                const categorySlug = category.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
                entries.push(`  <url>
    <loc>${baseUrl}/${countrySlug}/${stateSlug}/${citySlug}/${categorySlug}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.3</priority>
    <lastmod>${currentDate}</lastmod>
  </url>`);
              });
            }

            if (services) {
              services.forEach(service => {
                const serviceSlug = service.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
                entries.push(`  <url>
    <loc>${baseUrl}/${countrySlug}/${stateSlug}/${citySlug}/${serviceSlug}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.3</priority>
    <lastmod>${currentDate}</lastmod>
  </url>`);
              });
            }
          });
        });
      });

    } catch (error) {
      console.error('Error generating sitemap:', error);
    }

    const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join('\n')}
</urlset>`;

    return sitemapXml;
  };

  const setupRealtimeUpdates = () => {
    // Listen for changes in service_categories table
    const categoriesSubscription = supabase
      .channel('categories-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'service_categories' },
        () => {
          console.log('Service categories changed, regenerating sitemap...');
          generateSitemap();
        }
      )
      .subscribe();

    // Listen for changes in services table
    const servicesSubscription = supabase
      .channel('services-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'services' },
        () => {
          console.log('Services changed, regenerating sitemap...');
          generateSitemap();
        }
      )
      .subscribe();

    return () => {
      categoriesSubscription.unsubscribe();
      servicesSubscription.unsubscribe();
    };
  };

  useEffect(() => {
    const cleanup = setupRealtimeUpdates();
    return cleanup;
  }, []);

  return { generateSitemap };
};
