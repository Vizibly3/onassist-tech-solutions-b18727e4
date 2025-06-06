
import React, { useEffect, useState } from 'react';
import { generateSitemapXML } from '@/utils/sitemapGenerator';

const SitemapPage = () => {
  const [xmlContent, setXmlContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSitemap = async () => {
      try {
        const xmlContent = await generateSitemapXML();
        setXmlContent(xmlContent);
      } catch (error) {
        console.error('Error generating sitemap:', error);
        setXmlContent('<?xml version="1.0" encoding="UTF-8"?><error>Failed to generate sitemap</error>');
      } finally {
        setIsLoading(false);
      }
    };

    loadSitemap();
  }, []);

  if (isLoading) {
    return <div>Loading sitemap...</div>;
  }

  return (
    <pre style={{ 
      whiteSpace: 'pre-wrap', 
      fontFamily: 'monospace',
      fontSize: '12px',
      padding: '20px',
      backgroundColor: '#f5f5f5',
      overflow: 'auto'
    }}>
      {xmlContent}
    </pre>
  );
};

export default SitemapPage;
