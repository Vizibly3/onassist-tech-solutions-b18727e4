
import { serviceCategories, getAllServices } from '@/config/services';
import { countries, usStates } from '@/data/locations';
import { useServiceCategories, useServices } from '@/hooks/useServices';

export const generateSitemapXML = async (): Promise<string> => {
  const baseUrl = 'https://onassist.lovable.app';
  const currentDate = new Date().toISOString().split('T')[0];
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  // Static pages
  const staticPages = [
    { url: '/', priority: '1.0', changefreq: 'daily' },
    { url: '/about', priority: '0.7', changefreq: 'weekly' },
    { url: '/contact', priority: '0.7', changefreq: 'weekly' },
    { url: '/services', priority: '0.9', changefreq: 'weekly' },
    { url: '/cart', priority: '0.5', changefreq: 'monthly' },
    { url: '/checkout', priority: '0.5', changefreq: 'monthly' },
    { url: '/membership', priority: '0.7', changefreq: 'weekly' },
    { url: '/partner', priority: '0.7', changefreq: 'weekly' },
    { url: '/faq', priority: '0.7', changefreq: 'weekly' },
    { url: '/privacy', priority: '0.3', changefreq: 'yearly' },
    { url: '/terms', priority: '0.3', changefreq: 'yearly' },
    { url: '/returns', priority: '0.7', changefreq: 'weekly' },
    { url: '/auth/login', priority: '0.5', changefreq: 'monthly' },
    { url: '/auth/register', priority: '0.5', changefreq: 'monthly' },
  ];

  staticPages.forEach(page => {
    sitemap += `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    <lastmod>${currentDate}</lastmod>
  </url>`;
  });

  // Service categories
  serviceCategories.forEach(category => {
    sitemap += `
  <url>
    <loc>${baseUrl}/services/${category.id}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <lastmod>${currentDate}</lastmod>
  </url>`;
  });

  // Individual services
  const allServices = getAllServices();
  allServices.forEach(service => {
    sitemap += `
  <url>
    <loc>${baseUrl}/service/${service.id}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
    <lastmod>${currentDate}</lastmod>
  </url>`;
  });

  // Location-based URLs - COMPLETE COVERAGE
  countries.forEach(country => {
    // Country pages - Route: /:country
    sitemap += `
  <url>
    <loc>${baseUrl}/${country.slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <lastmod>${currentDate}</lastmod>
  </url>`;

    // For US, generate all state and city combinations
    if (country.slug === 'us') {
      usStates.forEach(state => {
        // State pages - Route: /:country/:state
        sitemap += `
  <url>
    <loc>${baseUrl}/${country.slug}/${state.slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
    <lastmod>${currentDate}</lastmod>
  </url>`;

        // State-level service detail pages - Route: /:country/:state/:serviceSlug
        allServices.forEach(service => {
          sitemap += `
  <url>
    <loc>${baseUrl}/${country.slug}/${state.slug}/${service.id}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
    <lastmod>${currentDate}</lastmod>
  </url>`;
        });

        // Cities for this state
        state.cities.forEach(city => {
          // City pages - Route: /:country/:state/:city
          sitemap += `
  <url>
    <loc>${baseUrl}/${country.slug}/${state.slug}/${city.slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
    <lastmod>${currentDate}</lastmod>
  </url>`;

          // City-level category pages - Route: /:country/:state/:city/:categorySlug
          serviceCategories.forEach(category => {
            sitemap += `
  <url>
    <loc>${baseUrl}/${country.slug}/${state.slug}/${city.slug}/services/${category.id}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
    <lastmod>${currentDate}</lastmod>
  </url>`;
          });

          // City-level service detail pages - Route: /:country/:state/:city/:serviceSlug
          allServices.forEach(service => {
            sitemap += `
  <url>
    <loc>${baseUrl}/${country.slug}/${state.slug}/${city.slug}/service/${service.id}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
    <lastmod>${currentDate}</lastmod>
  </url>`;
          });
        });
      });
    }
  });

  sitemap += `
</urlset>`;

  return sitemap;
};

export const generateAndSaveSitemap = async (): Promise<void> => {
  const sitemapContent = await generateSitemapXML();
  
  // Create a blob and download
  const blob = new Blob([sitemapContent], { type: 'application/xml' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'sitemap.xml';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
