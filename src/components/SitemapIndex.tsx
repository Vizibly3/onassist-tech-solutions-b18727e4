
import React, { useEffect, useState } from 'react';
import { generateSitemapIndex, generateSitemapChunk } from '@/utils/sitemapIndexGenerator';

interface SitemapIndexProps {
  chunkIndex?: number;
}

const SitemapIndex: React.FC<SitemapIndexProps> = ({ chunkIndex }) => {
  const [xmlContent, setXmlContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSitemap = async () => {
      try {
        setIsLoading(true);
        let xml: string;
        
        if (chunkIndex !== undefined) {
          // Load specific chunk
          xml = await generateSitemapChunk(chunkIndex);
        } else {
          // Load sitemap index
          xml = await generateSitemapIndex();
        }
        
        setXmlContent(xml);
      } catch (error) {
        console.error('Error loading sitemap:', error);
        setXmlContent('<?xml version="1.0" encoding="UTF-8"?><error>Error loading sitemap</error>');
      } finally {
        setIsLoading(false);
      }
    };

    loadSitemap();
  }, [chunkIndex]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading sitemap...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold mb-4">Sitemap XML</h1>
          <div className="bg-gray-100 p-4 rounded-lg overflow-auto max-h-96">
            <pre style={{ 
              whiteSpace: 'pre-wrap', 
              fontFamily: 'monospace',
              fontSize: '12px',
              lineHeight: '1.4'
            }}>
              {xmlContent}
            </pre>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            <p>This sitemap includes all pages, services, categories, states, and cities.</p>
            <p>For better performance, the sitemap is split into multiple chunks when needed.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SitemapIndex;
