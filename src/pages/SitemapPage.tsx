
import { useEffect } from 'react';
import { useCategoriesWithServices } from '@/hooks/useServices';
import { countries } from '@/data/locations';
import { slugify } from '@/utils/slugify';

const SitemapPage = () => {
  const { data: categoriesWithServices } = useCategoriesWithServices();

  useEffect(() => {
    if (categoriesWithServices) {
      generateAndServeSitemap();
    }
  }, [categoriesWithServices]);

  const generateAndServeSitemap = () => {
    const baseUrl = window.location.origin;
    const currentDate = new Date().toISOString().split('T')[0];
    
    let sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
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
      sitemapContent += `
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
        sitemapContent += `
  <url>
    <loc>${baseUrl}/services/${categorySlug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;

        // Individual service pages
        category.services.forEach(service => {
          const serviceSlug = slugify(service.title);
          sitemapContent += `
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
      sitemapContent += `
  <url>
    <loc>${baseUrl}/${country.slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;

      country.states.forEach(state => {
        // State pages
        sitemapContent += `
  <url>
    <loc>${baseUrl}/${country.slug}/${state.slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;

        state.cities.forEach(city => {
          // City pages
          sitemapContent += `
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
              sitemapContent += `
  <url>
    <loc>${baseUrl}/${country.slug}/${state.slug}/${city.slug}/services/${categorySlug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
  </url>`;

              // Location + individual service pages
              category.services.forEach(service => {
                const serviceSlug = slugify(service.title);
                sitemapContent += `
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

    sitemapContent += `
</urlset>`;

    // Set the response headers and content
    const blob = new Blob([sitemapContent], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    
    // Create a download for the sitemap or display it
    document.body.innerHTML = `<pre>${sitemapContent.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>`;
    document.title = 'Sitemap';
    
    // Set proper content type
    const meta = document.createElement('meta');
    meta.httpEquiv = 'Content-Type';
    meta.content = 'application/xml; charset=utf-8';
    document.head.appendChild(meta);
  };

  return (
    <div>
      <div>Loading sitemap...</div>
    </div>
  );
};

export default SitemapPage;
