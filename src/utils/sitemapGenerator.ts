
import { services, categories } from '@/config/services';
import { countries, usStates } from '@/data/locations';

const baseURL = 'https://onassist.lovable.app';

export const generateSitemapXML = async (): Promise<string> => {
  const currentDate = new Date().toISOString().split('T')[0];
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  // Static pages
  const staticPages = [
    { url: '', priority: '1.0', changefreq: 'daily' },
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
    { url: '/auth/register', priority: '0.5', changefreq: 'monthly' }
  ];

  staticPages.forEach(page => {
    xml += `
  <url>
    <loc>${baseURL}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    <lastmod>${currentDate}</lastmod>
  </url>`;
  });

  // Service categories
  categories.forEach(category => {
    xml += `
  <url>
    <loc>${baseURL}/services/${category.slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <lastmod>${currentDate}</lastmod>
  </url>`;
  });

  // Individual services
  services.forEach(service => {
    xml += `
  <url>
    <loc>${baseURL}/service/${service.slug}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
    <lastmod>${currentDate}</lastmod>
  </url>`;
  });

  // Location-based URLs - Countries
  countries.forEach(country => {
    xml += `
  <url>
    <loc>${baseURL}/${country.slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <lastmod>${currentDate}</lastmod>
  </url>`;

    // States within each country
    country.states.forEach(state => {
      xml += `
  <url>
    <loc>${baseURL}/${country.slug}/${state.slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
    <lastmod>${currentDate}</lastmod>
  </url>`;

      // Cities within each state
      state.cities.forEach(city => {
        xml += `
  <url>
    <loc>${baseURL}/${country.slug}/${state.slug}/${city.slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
    <lastmod>${currentDate}</lastmod>
  </url>`;

        // Service categories for each city
        categories.forEach(category => {
          xml += `
  <url>
    <loc>${baseURL}/${country.slug}/${state.slug}/${city.slug}/services/${category.slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
    <lastmod>${currentDate}</lastmod>
  </url>`;
        });

        // Individual services for each city
        services.forEach(service => {
          xml += `
  <url>
    <loc>${baseURL}/${country.slug}/${state.slug}/${city.slug}/service/${service.slug}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
    <lastmod>${currentDate}</lastmod>
  </url>`;
        });
      });

      // State-level services
      services.forEach(service => {
        xml += `
  <url>
    <loc>${baseURL}/${country.slug}/${state.slug}/${service.slug}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
    <lastmod>${currentDate}</lastmod>
  </url>`;
      });
    });
  });

  xml += `
</urlset>`;

  return xml;
};

export const generateAndSaveSitemap = async (): Promise<void> => {
  const xml = await generateSitemapXML();
  
  // Create a downloadable file
  const blob = new Blob([xml], { type: 'application/xml' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'sitemap.xml';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
