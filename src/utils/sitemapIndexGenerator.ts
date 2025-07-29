import { countries, usStates } from "@/data/locations";
import { serviceCategories, getAllServices } from "@/config/services";

const BASE_URL = "https://smartdoorstep.com";
const URLS_PER_CHUNK = 10000; // Split into chunks of 10k URLs for better performance

interface SitemapUrl {
  loc: string;
  changefreq: string;
  priority: string;
  lastmod: string;
}

const generateAllUrls = (): SitemapUrl[] => {
  const currentDate = new Date().toISOString().split("T")[0];
  const urls: SitemapUrl[] = [];

  // Static Pages
  const staticPages = [
    { url: "", priority: "1.0", changefreq: "daily" },
    { url: "/about", priority: "0.7", changefreq: "weekly" },
    { url: "/contact", priority: "0.7", changefreq: "weekly" },
    { url: "/services", priority: "0.9", changefreq: "weekly" },
    { url: "/cart", priority: "0.5", changefreq: "monthly" },
    { url: "/checkout", priority: "0.5", changefreq: "monthly" },
    { url: "/membership", priority: "0.7", changefreq: "weekly" },
    { url: "/partner", priority: "0.7", changefreq: "weekly" },
    { url: "/faq", priority: "0.7", changefreq: "weekly" },
    { url: "/privacy", priority: "0.3", changefreq: "yearly" },
    { url: "/terms", priority: "0.3", changefreq: "yearly" },
    { url: "/returns", priority: "0.7", changefreq: "weekly" },
    { url: "/auth/login", priority: "0.5", changefreq: "monthly" },
    { url: "/auth/register", priority: "0.5", changefreq: "monthly" },
  ];

  staticPages.forEach((page) => {
    urls.push({
      loc: `${BASE_URL}${page.url}`,
      changefreq: page.changefreq,
      priority: page.priority,
      lastmod: currentDate,
    });
  });

  // Service Categories
  serviceCategories.forEach((category) => {
    urls.push({
      loc: `${BASE_URL}/services/${category.id}`,
      changefreq: "weekly",
      priority: "0.8",
      lastmod: currentDate,
    });
  });

  // Individual Services
  const allServices = getAllServices();
  allServices.forEach((service) => {
    urls.push({
      loc: `${BASE_URL}/service/${service.id}`,
      changefreq: "monthly",
      priority: "0.7",
      lastmod: currentDate,
    });
  });

  // Country Pages
  countries.forEach((country) => {
    urls.push({
      loc: `${BASE_URL}/${country.slug}`,
      changefreq: "weekly",
      priority: "0.8",
      lastmod: currentDate,
    });
  });

  // All State Pages
  usStates.forEach((state) => {
    urls.push({
      loc: `${BASE_URL}/us/${state.slug}`,
      changefreq: "weekly",
      priority: "0.7",
      lastmod: currentDate,
    });
  });

  // All City Pages
  usStates.forEach((state) => {
    state.cities.forEach((city) => {
      urls.push({
        loc: `${BASE_URL}/us/${state.slug}/${city.slug}`,
        changefreq: "weekly",
        priority: "0.7",
        lastmod: currentDate,
      });
    });
  });

  // State-Level Service Detail Pages
  usStates.forEach((state) => {
    allServices.forEach((service) => {
      urls.push({
        loc: `${BASE_URL}/us/${state.slug}/${service.id}`,
        changefreq: "monthly",
        priority: "0.6",
        lastmod: currentDate,
      });
    });
  });

  // City-Level Category Pages
  usStates.forEach((state) => {
    state.cities.forEach((city) => {
      serviceCategories.forEach((category) => {
        urls.push({
          loc: `${BASE_URL}/us/${state.slug}/${city.slug}/services/${category.id}`,
          changefreq: "weekly",
          priority: "0.6",
          lastmod: currentDate,
        });
      });
    });
  });

  // City-Level Service Detail Pages
  usStates.forEach((state) => {
    state.cities.forEach((city) => {
      allServices.forEach((service) => {
        urls.push({
          loc: `${BASE_URL}/us/${state.slug}/${city.slug}/service/${service.id}`,
          changefreq: "monthly",
          priority: "0.6",
          lastmod: currentDate,
        });
      });
    });
  });

  return urls;
};

export const generateSitemapIndex = async (): Promise<string> => {
  const allUrls = generateAllUrls();
  const totalChunks = Math.ceil(allUrls.length / URLS_PER_CHUNK);
  const currentDate = new Date().toISOString().split("T")[0];

  if (totalChunks <= 1) {
    // If we have less than the chunk limit, return a regular sitemap
    return generateSitemapFromUrls(allUrls);
  }

  // Generate sitemap index
  let sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  for (let i = 0; i < totalChunks; i++) {
    sitemapIndex += `
  <sitemap>
    <loc>${BASE_URL}/sitemap/${i + 1}.xml</loc>
    <lastmod>${currentDate}</lastmod>
  </sitemap>`;
  }

  sitemapIndex += `
</sitemapindex>`;

  return sitemapIndex;
};

export const generateSitemapChunk = async (
  chunkIndex: number
): Promise<string> => {
  const allUrls = generateAllUrls();
  const startIndex = chunkIndex * URLS_PER_CHUNK;
  const endIndex = startIndex + URLS_PER_CHUNK;
  const chunkUrls = allUrls.slice(startIndex, endIndex);

  return generateSitemapFromUrls(chunkUrls);
};

const generateSitemapFromUrls = (urls: SitemapUrl[]): string => {
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  urls.forEach((url) => {
    sitemap += `
  <url>
    <loc>${url.loc}</loc>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
    <lastmod>${url.lastmod}</lastmod>
  </url>`;
  });

  sitemap += `
</urlset>`;

  return sitemap;
};
