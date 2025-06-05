
import { countries, usStates } from '@/data/locations';
import { serviceCategories, getAllServices } from '@/config/services';

const BASE_URL = 'https://onassist.lovable.app';

export const generateSitemapXML = async (): Promise<string> => {
  const currentDate = new Date().toISOString().split('T')[0];
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  // Static Pages
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
    sitemap += `
  <url>
    <loc>${BASE_URL}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    <lastmod>${currentDate}</lastmod>
  </url>`;
  });

  // Service Categories
  serviceCategories.forEach(category => {
    sitemap += `
  <url>
    <loc>${BASE_URL}/services/${category.id}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <lastmod>${currentDate}</lastmod>
  </url>`;
  });

  // Individual Services
  const allServices = getAllServices();
  allServices.forEach(service => {
    sitemap += `
  <url>
    <loc>${BASE_URL}/service/${service.id}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
    <lastmod>${currentDate}</lastmod>
  </url>`;
  });

  // Country Pages
  countries.forEach(country => {
    sitemap += `
  <url>
    <loc>${BASE_URL}/${country.slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <lastmod>${currentDate}</lastmod>
  </url>`;
  });

  // All State Pages
  usStates.forEach(state => {
    sitemap += `
  <url>
    <loc>${BASE_URL}/us/${state.slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
    <lastmod>${currentDate}</lastmod>
  </url>`;
  });

  // All City Pages
  usStates.forEach(state => {
    state.cities.forEach(city => {
      sitemap += `
  <url>
    <loc>${BASE_URL}/us/${state.slug}/${city.slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
    <lastmod>${currentDate}</lastmod>
  </url>`;
    });
  });

  // State-Level Service Detail Pages (ALL services for ALL states)
  usStates.forEach(state => {
    allServices.forEach(service => {
      sitemap += `
  <url>
    <loc>${BASE_URL}/us/${state.slug}/${service.id}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
    <lastmod>${currentDate}</lastmod>
  </url>`;
    });
  });

  // City-Level Category Pages (ALL categories for ALL cities)
  usStates.forEach(state => {
    state.cities.forEach(city => {
      serviceCategories.forEach(category => {
        sitemap += `
  <url>
    <loc>${BASE_URL}/us/${state.slug}/${city.slug}/services/${category.id}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
    <lastmod>${currentDate}</lastmod>
  </url>`;
      });
    });
  });

  // City-Level Service Detail Pages (ALL services for ALL cities)
  usStates.forEach(state => {
    state.cities.forEach(city => {
      allServices.forEach(service => {
        sitemap += `
  <url>
    <loc>${BASE_URL}/us/${state.slug}/${city.slug}/service/${service.id}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
    <lastmod>${currentDate}</lastmod>
  </url>`;
      });
    });
  });

  sitemap += `
</urlset>`;

  return sitemap;
};

export const generateAndSaveSitemap = async (): Promise<void> => {
  const xmlContent = await generateSitemapXML();
  
  // Create a blob and download
  const blob = new Blob([xmlContent], { type: 'application/xml' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'sitemap.xml';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
