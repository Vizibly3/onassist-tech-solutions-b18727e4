
import React from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe, Download, RefreshCw, FileText } from "lucide-react";

const AdminSitemap = () => {
  const handleGenerateSitemap = () => {
    // This would typically trigger sitemap generation
    console.log("Generating sitemap...");
  };

  const handleDownloadSitemap = () => {
    // This would download the sitemap
    window.open('/sitemap.xml', '_blank');
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
                  The main sitemap contains all the primary pages of your website.
                </p>
                <div className="space-y-2">
                  <Button onClick={handleGenerateSitemap} className="w-full">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Generate Sitemap
                  </Button>
                  <Button onClick={handleDownloadSitemap} variant="outline" className="w-full">
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
                    <span className="text-gray-600">Total Pages:</span>
                    <span className="font-medium">150+</span>
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
                Large sitemaps are split into chunks for better performance and SEO.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {Array.from({ length: 16 }, (_, i) => (
                  <div key={i} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Chunk {i + 1}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => window.open(`/sitemap_${i + 1}.xml`, '_blank')}
                      >
                        <Download className="w-3 h-3 mr-1" />
                        XML
                      </Button>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      sitemap_{i + 1}.xml
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default AdminSitemap;
