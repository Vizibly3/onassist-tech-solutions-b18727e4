
import { useEffect, useState } from 'react';
import { useCategoriesWithServices } from '@/hooks/useServices';
import { countries } from '@/data/locations';
import { slugify } from '@/utils/slugify';

export const useSitemapData = () => {
  const { data: categoriesWithServices } = useCategoriesWithServices();
  const [sitemapXml, setSitemapXml] = useState<string>('');

  useEffect(() => {
    if (categoriesWithServices) {
      generateSitemapXml();
    }
  }, [categoriesWithServices]);

  const generateSitemapXml = () => {
    const baseUrl = 'https://your-domain.com'; // Replace with your actual domain
    const currentDate = new Date().toISOString().split('T')[0];
    
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    // Static pages
    const staticPages = [
      { path: '/', priority: '1.0', changefreq: 'daily' },
      { path: '/services', priority: '0.9', changefreq: 'weekly' },
      { path: '/about', priority: '0.7', changefreq: 'monthly' },
      { path: '/contact', priority: '0.8', changefreq: 'monthly' },
      { path: '/faq', priority: '0.6', changefreq: 'monthly' },
      { path: '/privacy-policy', priority: '0.5', changefreq: 'yearly' },
      { path: '/terms', priority: '0.5', changefreq: 'yearly' },
      { path: '/returns', priority: '0.5', changefreq: 'yearly' }
    ];

    staticPages.forEach(page => {
      sitemap += `
  <url>
    <loc>${baseUrl}${page.path}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
    });

    // Service category pages
    if (categoriesWithServices) {
      categoriesWithServices.forEach(category => {
        const categorySlug = slugify(category.title);
        sitemap += `
  <url>
    <loc>${baseUrl}/services/${categorySlug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;

        // Individual service pages
        category.services.forEach(service => {
          const serviceSlug = slugify(service.title);
          sitemap += `
  <url>
    <loc>${baseUrl}/service/${serviceSlug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
        });
      });
    }

    // Location-based pages
    countries.forEach(country => {
      // Country pages
      sitemap += `
  <url>
    <loc>${baseUrl}/${country.slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;

      country.states.forEach(state => {
        // State pages
        sitemap += `
  <url>
    <loc>${baseUrl}/${country.slug}/${state.slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;

        state.cities.forEach(city => {
          // City pages
          sitemap += `
  <url>
    <loc>${baseUrl}/${country.slug}/${state.slug}/${city.slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`;

          // Location + service category pages
          if (categoriesWithServices) {
            categoriesWithServices.forEach(category => {
              const categorySlug = slugify(category.title);
              sitemap += `
  <url>
    <loc>${baseUrl}/${country.slug}/${state.slug}/${city.slug}/services/${categorySlug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
  </url>`;

              // Location + individual service pages
              category.services.forEach(service => {
                const serviceSlug = slugify(service.title);
                sitemap += `
  <url>
    <loc>${baseUrl}/${country.slug}/${state.slug}/${city.slug}/service/${serviceSlug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.4</priority>
  </url>`;
              });
            });
          }
        });
      });
    });

    sitemap += `
</urlset>`;

    setSitemapXml(sitemap);
  };

  return { sitemapXml };
};
