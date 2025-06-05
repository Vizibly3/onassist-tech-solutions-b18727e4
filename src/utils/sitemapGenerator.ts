
import { locations } from '@/data/locations';

// Base URL for the site
const BASE_URL = 'https://onassist.lovable.app';

// Static routes that don't change
const STATIC_ROUTES = [
  '/',
  '/about',
  '/contact',
  '/services',
  '/cart',
  '/checkout',
  '/membership',
  '/partner',
  '/faq',
  '/privacy',
  '/terms',
  '/returns',
  '/auth/login',
  '/auth/register',
];

// Mock data for services and categories - in a real app, this would come from your database
const MOCK_SERVICES = [
  { slug: 'computer-repair', categorySlug: 'computer-services' },
  { slug: 'smart-home-setup', categorySlug: 'smart-home' },
  { slug: 'network-troubleshooting', categorySlug: 'network-services' },
  { slug: 'phone-repair', categorySlug: 'mobile-services' },
  { slug: 'laptop-upgrade', categorySlug: 'computer-services' },
  { slug: 'wifi-installation', categorySlug: 'network-services' },
];

const MOCK_CATEGORIES = [
  'computer-services',
  'smart-home',
  'network-services',
  'mobile-services',
  'home-automation',
  'tech-support',
];

interface SitemapUrl {
  loc: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: string;
  lastmod: string;
}

const getCurrentDate = (): string => {
  return new Date().toISOString().split('T')[0];
};

const generateSitemapUrls = (): SitemapUrl[] => {
  const urls: SitemapUrl[] = [];
  const currentDate = getCurrentDate();

  // Add static routes
  STATIC_ROUTES.forEach(route => {
    let priority = '0.7';
    let changefreq: SitemapUrl['changefreq'] = 'weekly';
    
    if (route === '/') {
      priority = '1.0';
      changefreq = 'daily';
    } else if (route === '/services') {
      priority = '0.9';
      changefreq = 'weekly';
    } else if (route.includes('auth') || route === '/cart' || route === '/checkout') {
      priority = '0.5';
      changefreq = 'monthly';
    } else if (route === '/privacy' || route === '/terms') {
      priority = '0.3';
      changefreq = 'yearly';
    }

    urls.push({
      loc: `${BASE_URL}${route}`,
      changefreq,
      priority,
      lastmod: currentDate
    });
  });

  // Add service category routes (/services/:categorySlug)
  MOCK_CATEGORIES.forEach(categorySlug => {
    urls.push({
      loc: `${BASE_URL}/services/${categorySlug}`,
      changefreq: 'weekly',
      priority: '0.8',
      lastmod: currentDate
    });
  });

  // Add individual service routes (/service/:serviceSlug)
  MOCK_SERVICES.forEach(service => {
    urls.push({
      loc: `${BASE_URL}/service/${service.slug}`,
      changefreq: 'monthly',
      priority: '0.7',
      lastmod: currentDate
    });
  });

  // Add location-based routes
  locations.forEach(country => {
    // Country pages (/:country)
    urls.push({
      loc: `${BASE_URL}/${country.slug}`,
      changefreq: 'weekly',
      priority: '0.8',
      lastmod: currentDate
    });

    country.states.forEach(state => {
      // State pages (/:country/:state)
      urls.push({
        loc: `${BASE_URL}/${country.slug}/${state.slug}`,
        changefreq: 'weekly',
        priority: '0.7',
        lastmod: currentDate
      });

      // State service detail pages (/:country/:state/:serviceSlug)
      MOCK_SERVICES.forEach(service => {
        urls.push({
          loc: `${BASE_URL}/${country.slug}/${state.slug}/${service.slug}`,
          changefreq: 'monthly',
          priority: '0.6',
          lastmod: currentDate
        });
      });

      state.cities.forEach(city => {
        // City pages (/:country/:state/:city)
        urls.push({
          loc: `${BASE_URL}/${country.slug}/${state.slug}/${city.slug}`,
          changefreq: 'weekly',
          priority: '0.7',
          lastmod: currentDate
        });

        // City category pages (/:country/:state/:city/:categorySlug)
        MOCK_CATEGORIES.forEach(categorySlug => {
          urls.push({
            loc: `${BASE_URL}/${country.slug}/${state.slug}/${city.slug}/services/${categorySlug}`,
            changefreq: 'weekly',
            priority: '0.6',
            lastmod: currentDate
          });
        });

        // City service detail pages (/:country/:state/:city/:serviceSlug)
        MOCK_SERVICES.forEach(service => {
          urls.push({
            loc: `${BASE_URL}/${country.slug}/${state.slug}/${city.slug}/service/${service.slug}`,
            changefreq: 'monthly',
            priority: '0.6',
            lastmod: currentDate
          });
        });
      });
    });
  });

  return urls;
};

export const generateSitemapXML = (): string => {
  const urls = generateSitemapUrls();
  
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  urls.forEach(url => {
    xml += '  <url>\n';
    xml += `    <loc>${url.loc}</loc>\n`;
    xml += `    <changefreq>${url.changefreq}</changefreq>\n`;
    xml += `    <priority>${url.priority}</priority>\n`;
    xml += `    <lastmod>${url.lastmod}</lastmod>\n`;
    xml += '  </url>\n';
  });
  
  xml += '</urlset>';
  
  return xml;
};

export const generateAndSaveSitemap = async (): Promise<void> => {
  const sitemapContent = generateSitemapXML();
  
  // Create a downloadable file
  const blob = new Blob([sitemapContent], { type: 'application/xml' });
  const url = URL.createObjectURL(blob);
  
  // Create download link
  const link = document.createElement('a');
  link.href = url;
  link.download = 'sitemap.xml';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // Clean up
  URL.revokeObjectURL(url);
};
