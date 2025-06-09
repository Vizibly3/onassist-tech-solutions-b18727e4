
import React from 'react';
import { useLocation } from 'react-router-dom';
import SitemapIndex from '@/components/SitemapIndex';

const SitemapChunkPage = () => {
  const location = useLocation();
  
  // Extract chunk number from pathname like /sitemap1.xml, /sitemap2.xml, etc.
  const match = location.pathname.match(/\/sitemap(\d+)\.xml/);
  const chunkNumber = match ? parseInt(match[1]) : 1;
  const chunkIndex = chunkNumber - 1; // Convert to 0-based index
  
  console.log('SitemapChunkPage - pathname:', location.pathname, 'chunkNumber:', chunkNumber, 'chunkIndex:', chunkIndex);
  
  return <SitemapIndex chunkIndex={chunkIndex} />;
};

export default SitemapChunkPage;
