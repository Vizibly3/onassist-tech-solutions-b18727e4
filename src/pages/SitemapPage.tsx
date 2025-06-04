
import React, { useEffect, useState } from 'react';
import { generateSitemapXML } from '@/utils/sitemapGenerator';

const SitemapPage = () => {
  const [sitemapContent, setSitemapContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const generateAndServeSitemap = async () => {
      try {
        const xmlContent = await generateSitemapXML();
        setSitemapContent(xmlContent);
        
        // Replace the entire page content with XML
        document.open();
        document.write(xmlContent);
        document.close();
        
      } catch (error) {
        console.error('Error generating sitemap:', error);
        // Fallback: display XML content in pre tag
        setSitemapContent('Error generating sitemap');
      } finally {
        setIsLoading(false);
      }
    };

    generateAndServeSitemap();
  }, []);

  // This component serves XML content directly
  return null;
};

export default SitemapPage;
