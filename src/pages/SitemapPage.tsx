
import React, { useEffect } from 'react';
import { generateSitemapXML } from '@/utils/sitemapGenerator';

const SitemapPage = () => {
  useEffect(() => {
    const serveSitemap = async () => {
      try {
        const xmlContent = await generateSitemapXML();
        
        // Set the content type to XML
        document.contentType = 'application/xml';
        
        // Clear the document and write XML content
        document.open();
        document.write(xmlContent);
        document.close();
        
      } catch (error) {
        console.error('Error generating sitemap:', error);
        document.open();
        document.write('<?xml version="1.0" encoding="UTF-8"?><error>Failed to generate sitemap</error>');
        document.close();
      }
    };

    serveSitemap();
  }, []);

  return null;
};

export default SitemapPage;
