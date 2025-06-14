
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, FileText, Globe } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { generateSitemap } from '@/utils/sitemapGenerator';
import { usStates } from '@/data/locations';
import { useServicesData } from '@/hooks/useServicesData';

const SitemapGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const { data: services } = useServicesData();

  const totalCities = usStates.reduce((total, state) => total + state.cities.length, 0);
  const totalStates = usStates.length;
  const totalServices = services?.length || 0;

  // Calculate total URLs
  const countryPages = 1; // /united-states
  const statePages = totalStates; // /united-states/california etc
  const cityPages = totalCities; // /united-states/california/los-angeles etc
  const servicePages = totalServices; // /services/computer-repair etc
  const categoryServicePages = totalServices; // /services/computer-support/computer-repair etc
  const locationServicePages = totalCities * totalServices; // /united-states/california/los-angeles/computer-repair etc
  const staticPages = 10; // home, about, contact, services, etc

  const totalUrls = countryPages + statePages + cityPages + servicePages + categoryServicePages + locationServicePages + staticPages;

  const handleGenerateAndDownload = async () => {
    setIsGenerating(true);
    try {
      const sitemapContent = await generateSitemap();
      
      // Create and download the file
      const blob = new Blob([sitemapContent], { type: 'application/xml' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'sitemap.xml';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast({
        title: 'Success',
        description: 'Sitemap generated and downloaded successfully!'
      });
    } catch (error) {
      console.error('Error generating sitemap:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate sitemap. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5" />
          Sitemap Generator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{totalStates}</div>
            <div className="text-sm text-gray-600">States</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{totalCities}</div>
            <div className="text-sm text-gray-600">Cities</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">{totalServices}</div>
            <div className="text-sm text-gray-600">Services</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">{totalUrls.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Total URLs</div>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-semibold">URL Breakdown:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <div className="flex justify-between">
              <span>Static Pages:</span>
              <span className="font-medium">{staticPages}</span>
            </div>
            <div className="flex justify-between">
              <span>Country Pages:</span>
              <span className="font-medium">{countryPages}</span>
            </div>
            <div className="flex justify-between">
              <span>State Pages:</span>
              <span className="font-medium">{statePages}</span>
            </div>
            <div className="flex justify-between">
              <span>City Pages:</span>
              <span className="font-medium">{totalCities}</span>
            </div>
            <div className="flex justify-between">
              <span>Service Pages:</span>
              <span className="font-medium">{servicePages}</span>
            </div>
            <div className="flex justify-between">
              <span>Location + Service:</span>
              <span className="font-medium">{locationServicePages.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <Button 
          onClick={handleGenerateAndDownload}
          disabled={isGenerating}
          className="w-full"
        >
          {isGenerating ? (
            <>
              <FileText className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Download className="mr-2 h-4 w-4" />
              Generate & Download Sitemap
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default SitemapGenerator;
