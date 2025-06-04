
import React, { useEffect, useState } from 'react';
import { generateSitemapXML } from '@/utils/sitemapGenerator';

const SitemapXML: React.FC = () => {
  const [xmlContent, setXmlContent] = useState<string>('');

  useEffect(() => {
    const loadSitemap = async () => {
      try {
        const xml = await generateSitemapXML();
        setXmlContent(xml);
      } catch (error) {
        console.error('Error loading sitemap:', error);
      }
    };

    loadSitemap();
  }, []);

  return (
    <div style={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>
      {xmlContent}
    </div>
  );
};

export default SitemapXML;
