
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { generateAndSaveSitemap } from '@/utils/sitemapGenerator';
import { toast } from 'sonner';

const SitemapGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateSitemap = async () => {
    setIsGenerating(true);
    try {
      await generateAndSaveSitemap();
      toast.success('Sitemap generated and downloaded successfully!');
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
        <CardTitle>Sitemap Generator</CardTitle>
        <CardDescription>
          Generate and download a dynamic sitemap.xml file for SEO purposes.
          The sitemap includes all static pages, services, categories, and location-based pages.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button 
          onClick={handleGenerateSitemap} 
          disabled={isGenerating}
          className="w-full"
        >
          {isGenerating ? 'Generating...' : 'Generate & Download Sitemap.xml'}
        </Button>
        <p className="text-sm text-muted-foreground mt-2">
          A static sitemap.xml is available at <code>/sitemap.xml</code> for immediate SEO needs.
          Use this tool to generate an updated version with dynamic content.
        </p>
      </CardContent>
    </Card>
  );
};

export default SitemapGenerator;
