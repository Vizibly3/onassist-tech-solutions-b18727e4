
import { serviceCategories, getAllServices } from '@/config/services';
import { countries, usStates } from '@/data/locations';

export const generateSitemapXML = (): string => {
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

  // Location-based URLs
  countries.forEach(country => {
    // Country pages
    sitemap += `
  <url>
    <loc>${baseUrl}/${country.slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <lastmod>${currentDate}</lastmod>
  </url>`;

    // State pages for this country
    if (country.slug === 'united-states') {
      usStates.forEach(state => {
        // State page
        sitemap += `
  <url>
    <loc>${baseUrl}/${country.slug}/${state.slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
    <lastmod>${currentDate}</lastmod>
  </url>`;

        // Cities for this state
        state.cities.forEach(city => {
          // City page
          sitemap += `
  <url>
    <loc>${baseUrl}/${country.slug}/${state.slug}/${city.slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
    <lastmod>${currentDate}</lastmod>
  </url>`;

          // Service categories for this city
          serviceCategories.forEach(category => {
            sitemap += `
  <url>
    <loc>${baseUrl}/${country.slug}/${state.slug}/${city.slug}/services/${category.id}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
    <lastmod>${currentDate}</lastmod>
  </url>`;
          });

          // Individual services for this city
          allServices.slice(0, 3).forEach(service => { // Sample services to avoid too many URLs
            sitemap += `
  <url>
    <loc>${baseUrl}/${country.slug}/${state.slug}/${city.slug}/service/${service.id}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
    <lastmod>${currentDate}</lastmod>
  </url>`;
          });
        });

        // State-level services (sample)
        allServices.slice(0, 2).forEach(service => {
          sitemap += `
  <url>
    <loc>${baseUrl}/${country.slug}/${state.slug}/${service.id}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
    <lastmod>${currentDate}</lastmod>
  </url>`;
        });
      });
    }
  });

  sitemap += `
</urlset>`;

  return sitemap;
};

export const generateAndSaveSitemap = async (): Promise<void> => {
  const sitemapContent = generateSitemapXML();
  
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
