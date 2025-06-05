
import React, { useEffect, useState } from 'react';
import { generateSitemapXML } from '@/utils/sitemapGenerator';

const SitemapXML: React.FC = () => {
  const [xmlContent, setXmlContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSitemap = async () => {
      try {
        setIsLoading(true);
        const xml = await generateSitemapXML();
        setXmlContent(xml);
      } catch (error) {
        console.error('Error loading sitemap:', error);
        setXmlContent('Error loading sitemap');
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
    <div style={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>
      {xmlContent}
    </div>
  );
};

export default SitemapXML;
