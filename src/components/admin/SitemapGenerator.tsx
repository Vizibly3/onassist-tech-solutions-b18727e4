
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { generateAndSaveSitemap } from '@/utils/sitemapGenerator';
import { toast } from 'sonner';
import { FileText, Download } from 'lucide-react';

const SitemapGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateSitemap = async () => {
    setIsGenerating(true);
    try {
      await generateAndSaveSitemap();
      toast.success('Complete sitemap.xml generated and downloaded successfully! This includes all 89 services, 12 categories, 50 states, and 250+ cities with full URL coverage.');
    } catch (error) {
      console.error('Error generating sitemap:', error);
      toast.error('Failed to generate sitemap. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Complete Sitemap Generator
        </CardTitle>
        <CardDescription>
          Generate a comprehensive sitemap.xml with ALL services, categories, states, and cities.
          This will include:
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>All 89 individual services</li>
            <li>All 12 service categories</li>
            <li>All 50 US states</li>
            <li>All 250+ cities</li>
            <li>Complete location-based service URLs</li>
            <li>All dynamic route combinations</li>
          </ul>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button 
          onClick={handleGenerateSitemap} 
          disabled={isGenerating}
          className="w-full"
          size="lg"
        >
          {isGenerating ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Generating Complete Sitemap...
            </>
          ) : (
            <>
              <Download className="h-4 w-4 mr-2" />
              Generate & Download Complete Sitemap.xml
            </>
          )}
        </Button>
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800 font-medium">
            ⚡ This will generate a comprehensive sitemap with thousands of URLs covering:
          </p>
          <div className="text-xs text-blue-700 mt-2 grid grid-cols-2 gap-2">
            <div>• Static pages (14 URLs)</div>
            <div>• Service categories (12 URLs)</div>
            <div>• Individual services (89 URLs)</div>
            <div>• Country pages (1 URL)</div>
            <div>• State pages (50 URLs)</div>
            <div>• City pages (250+ URLs)</div>
            <div>• State-service combinations (4,450+ URLs)</div>
            <div>• City-category combinations (3,000+ URLs)</div>
            <div>• City-service combinations (22,250+ URLs)</div>
          </div>
          <p className="text-xs text-blue-600 mt-2 font-medium">
            Total: 30,000+ URLs for complete SEO coverage
          </p>
        </div>
        <p className="text-sm text-muted-foreground mt-4">
          A static sitemap.xml is available at <code>/sitemap.xml</code> for immediate SEO needs.
          Use this tool to generate the complete dynamic version with all URL combinations.
        </p>
      </CardContent>
    </Card>
  );
};

export default SitemapGenerator;
