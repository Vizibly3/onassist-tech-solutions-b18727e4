import React, { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe, Download, RefreshCw, FileText } from "lucide-react";
import { generateAllUrls } from "@/utils/sitemapIndexGenerator";
import { usStates, countries } from "@/data/locations";
import { serviceCategories, getAllServices } from "@/config/services";
import { supabase } from "@/integrations/supabase/client";
import { slugify } from "@/utils/slugify";
import type { ServiceCategory, Service } from "@/hooks/useServices";

const URLS_PER_CHUNK = 10000;

const AdminSitemap = () => {
  // Compute static statssss
  const [allUrls, setAllUrls] = useState<string[]>([]);
  const [linksLoading, setLinksLoading] = useState(true);

  const totalStates = usStates.length;
  const totalCountries = countries.length;
  const totalCities = usStates.reduce(
    (sum, state) => sum + state.cities.length,
    0
  );
  const totalChunks = Math.ceil(allUrls.length / URLS_PER_CHUNK);

  // Dynamic stats
  const [categoryCount, setCategoryCount] = useState<number | null>(null);
  const [serviceCount, setServiceCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    const fetchCounts = async () => {
      setLoading(true);
      const { count: categoryCount, data: categories } = await supabase
        .from("service_categories")
        .select("id, title", { count: "exact" });
      const { count: serviceCount, data: services } = await supabase
        .from("services")
        .select("id, title", { count: "exact" });
      setCategoryCount(categoryCount ?? 0);
      setServiceCount(serviceCount ?? 0);
      setLoading(false);

      // Generate all URLs dynamically (mimic backend script)
      const currentDate = new Date().toISOString().split("T")[0];
      const urls: string[] = [];
      // Static Pages
      const staticPages = [
        "",
        "/about",
        "/contact",
        "/services",
        "/cart",
        "/checkout",
        "/membership",
        "/partner",
        "/faq",
        "/privacy-policy",
        "/terms",
        "/returns",
        "/auth/login",
        "/auth/register",
        "/profile",
        "/payment-success",
        "/payment-cancelled",
        "/my-orders",
        "/admin",
        "/admin/dashboard",
        "/admin/services",
        "/admin/categories",
        "/admin/orders",
        "/admin/users",
        "/admin/contacts",
        "/admin/analytics",
        "/admin/site-settings",
        "/admin/sitemap",
        "/admin/add-service",
        "/admin/add-category",
        "/admin-category-leads",
        "/admin-service-leads",
      ];
      staticPages.forEach((page) => {
        urls.push(page);
      });
      // Service Categories
      categories?.forEach((category: ServiceCategory) => {
        const slug = slugify(category.title);
        urls.push(`/services/${slug}`);
      });
      // Individual Services
      services?.forEach((service: Service) => {
        const slug = slugify(service.title);
        urls.push(`/service/${slug}`);
      });
      // Country Pages
      countries.forEach((country) => {
        urls.push(`/${country.slug}`);
      });
      // All State Pages
      usStates.forEach((state) => {
        urls.push(`/us/${state.slug}`);
      });
      // All City Pages
      usStates.forEach((state) => {
        state.cities.forEach((city) => {
          urls.push(`/us/${state.slug}/${city.slug}`);
        });
      });
      // City-Level Category Pages
      usStates.forEach((state) => {
        state.cities.forEach((city) => {
          categories?.forEach((category: ServiceCategory) => {
            const categorySlug = slugify(category.title);
            urls.push(
              `/us/${state.slug}/${city.slug}/services/${categorySlug}`
            );
          });
        });
      });
      // City-Level Service Detail Pages
      usStates.forEach((state) => {
        state.cities.forEach((city) => {
          services?.forEach((service: Service) => {
            const serviceSlug = slugify(service.title);
            urls.push(`/us/${state.slug}/${city.slug}/service/${serviceSlug}`);
          });
        });
      });
      // State-Level Service Detail Pages
      usStates.forEach((state) => {
        services?.forEach((service: Service) => {
          const serviceSlug = slugify(service.title);
          urls.push(`/us/${state.slug}/service/${serviceSlug}`);
        });
      });
      setAllUrls(urls);
      setLinksLoading(false);
    };
    fetchCounts();
  }, []);

  const handleGenerateSitemap = async () => {
    setGenerating(true);
    try {
      // TODO: Replace with actual API call to trigger backend sitemap generation
      await fetch("/api/generate-sitemap", { method: "POST" });
      // Optionally show a toast or notification here
    } catch (e) {
      // Optionally show error toast
      console.error(e);
    }
    setGenerating(false);
  };

  const handleDownloadSitemap = () => {
    // Programmatically download sitemap.xml
    const link = document.createElement("a");
    link.href = "/sitemap.xml";
    link.download = "sitemap.xml";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Globe className="w-8 h-8 text-onassist-primary" />
            <h1 className="text-3xl font-bold">Sitemap Management</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Main Sitemap
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  The main sitemap contains all the primary pages of your
                  website.
                </p>
                <div className="space-y-2">
                  <Button
                    onClick={handleDownloadSitemap}
                    variant="outline"
                    className="w-full"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download sitemap.xml
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Sitemap Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Last Generated:</span>
                    <span className="font-medium">Just now</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Links:</span>
                    <span className="font-medium">
                      {linksLoading ? "Loading..." : allUrls.length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Countries:</span>
                    <span className="font-medium">{totalCountries}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total States:</span>
                    <span className="font-medium">{totalStates}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Cities:</span>
                    <span className="font-medium">{totalCities}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Categories:</span>
                    <span className="font-medium">
                      {loading ? "Loading..." : categoryCount}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Services:</span>
                    <span className="font-medium">
                      {loading ? "Loading..." : serviceCount}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Chunks:</span>
                    <span className="font-medium">
                      {linksLoading ? "Loading..." : totalChunks}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Status:</span>
                    <span className="text-green-600 font-medium">Active</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Sitemap Chunks</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Large sitemaps are split into chunks for better performance and
                SEO.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {linksLoading ? (
                  <div>Loading chunks...</div>
                ) : (
                  Array.from({ length: totalChunks }, (_, i) => (
                    <div
                      key={i}
                      className="border rounded-lg p-4 flex flex-col gap-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-base">
                          Chunk {i + 1}
                        </span>
                        <div className="flex gap-2 items-center">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="hover:bg-onassist-primary/10"
                            title="Download XML"
                            onClick={() => {
                              const link = document.createElement("a");
                              link.href = `/sitemap_${i + 1}.xml`;
                              link.download = `sitemap_${i + 1}.xml`;
                              document.body.appendChild(link);
                              link.click();
                              document.body.removeChild(link);
                            }}
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="hover:bg-onassist-primary/10"
                            title="Open XML in new tab"
                            onClick={() =>
                              window.open(`/sitemap_${i + 1}.xml`, "_blank")
                            }
                          >
                            <FileText className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="border-t mt-2 pt-2">
                        <p className="text-xs text-gray-500 truncate">
                          sitemap_{i + 1}.xml
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default AdminSitemap;
