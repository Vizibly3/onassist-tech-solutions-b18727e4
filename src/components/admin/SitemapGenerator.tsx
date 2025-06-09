
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { generateAndSaveSitemap } from '@/utils/sitemapGenerator';
import { toast } from 'sonner';
import { FileText, Download } from 'lucide-react';
import { usStates } from '@/data/locations';
import { serviceCategories, getAllServices } from '@/config/services';

const SitemapGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  // Calculate actual counts
  const totalCities = usStates.reduce((total, state) => total + state.cities.length, 0);
  const totalServices = getAllServices().length;
  const totalCategories = serviceCategories.length;
  const totalStates = usStates.length;
  
  // Calculate URL combinations
  const staticPages = 14;
  const countryPages = 1;
  const stateServiceCombinations = totalStates * totalServices;
  const cityCategoryCombinations = totalCities * totalCategories;
  const cityServiceCombinations = totalCities * totalServices;
  const totalUrls = staticPages + totalCategories + totalServices + countryPages + totalStates + totalCities + stateServiceCombinations + cityCategoryCombinations + cityServiceCombinations;

  const handleGenerateSitemap = async () => {
    setIsGenerating(true);
    try {
      await generateAndSaveSitemap();
      toast.success(`Complete sitemap.xml generated and downloaded successfully! This includes all ${totalServices} services, ${totalCategories} categories, ${totalStates} states, and ${totalCities} cities with full URL coverage.`);
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
            <li>All {totalServices} individual services</li>
            <li>All {totalCategories} service categories</li>
            <li>All {totalStates} US states</li>
            <li>All {totalCities}+ cities</li>
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
            <div>• Static pages ({staticPages} URLs)</div>
            <div>• Service categories ({totalCategories} URLs)</div>
            <div>• Individual services ({totalServices} URLs)</div>
            <div>• Country pages ({countryPages} URL)</div>
            <div>• State pages ({totalStates} URLs)</div>
            <div>• City pages ({totalCities}+ URLs)</div>
            <div>• State-service combinations ({stateServiceCombinations.toLocaleString()}+ URLs)</div>
            <div>• City-category combinations ({cityCategoryCombinations.toLocaleString()}+ URLs)</div>
            <div>• City-service combinations ({cityServiceCombinations.toLocaleString()}+ URLs)</div>
          </div>
          <p className="text-xs text-blue-600 mt-2 font-medium">
            Total: {totalUrls.toLocaleString()}+ URLs for complete SEO coverage
          </p>
        </div>
        <p className="text-sm text-muted-foreground mt-4">
          A dynamic sitemap.xml is available at <code>/sitemap.xml</code> for immediate SEO needs.
          Use this tool to generate the complete version for download and manual submission.
        </p>
      </CardContent>
    </Card>
  );
};

export default SitemapGenerator;
