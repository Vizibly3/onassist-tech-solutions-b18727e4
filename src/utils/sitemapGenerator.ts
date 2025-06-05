
import { supabase } from '@/integrations/supabase/client';
import { countries } from '@/data/locations';

export const generateSitemapXML = async (): Promise<string> => {
  const baseUrl = 'https://onassist.lovable.app';
  const currentDate = new Date().toISOString().split('T')[0];
  const entries: string[] = [];

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
    { path: '/cart', priority: '0.4', changefreq: 'monthly' },
    { path: '/checkout', priority: '0.4', changefreq: 'monthly' },
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
    // Fetch service categories from Supabase
    const { data: categories } = await supabase
      .from('service_categories')
      .select('*');

    // Fetch services from Supabase
    const { data: services } = await supabase
      .from('services')
      .select('*')
      .eq('active', true);

    // Add service category pages
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

    // Add individual service pages
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

    // Add location-based pages
    countries.forEach(country => {
      const countrySlug = country.slug;
      
      // Country pages
      entries.push(`  <url>
    <loc>${baseUrl}/${countrySlug}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
    <lastmod>${currentDate}</lastmod>
  </url>`);

      country.states.forEach(state => {
        const stateSlug = state.slug;
        
        // State pages
        entries.push(`  <url>
    <loc>${baseUrl}/${countrySlug}/${stateSlug}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
    <lastmod>${currentDate}</lastmod>
  </url>`);

        // State + Service pages
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
          
          // City pages
          entries.push(`  <url>
    <loc>${baseUrl}/${countrySlug}/${stateSlug}/${citySlug}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.4</priority>
    <lastmod>${currentDate}</lastmod>
  </url>`);

          // City + Category pages
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

          // City + Service pages
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
    console.error('Error fetching data for sitemap:', error);
  }

  // Generate final XML
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join('\n')}
</urlset>`;

  return sitemapXml;
};

export const generateAndSaveSitemap = async () => {
  try {
    const sitemapContent = await generateSitemapXML();
    
    // Create a blob with the sitemap content
    const blob = new Blob([sitemapContent], { type: 'application/xml' });
    
    // Create a download link and trigger it
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'sitemap.xml';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    console.log('Sitemap generated and downloaded successfully');
    return sitemapContent;
  } catch (error) {
    console.error('Error generating sitemap:', error);
    throw error;
  }
};
