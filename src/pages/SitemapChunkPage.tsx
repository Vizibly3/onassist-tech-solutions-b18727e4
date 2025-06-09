
import React from 'react';
import { useParams } from 'react-router-dom';
import SitemapIndex from '@/components/SitemapIndex';

const SitemapChunkPage = () => {
  const { chunkIndex } = useParams<{ chunkIndex: string }>();
  const index = chunkIndex ? parseInt(chunkIndex) - 1 : 0; // Convert to 0-based index
  
  return <SitemapIndex chunkIndex={index} />;
};

export default SitemapChunkPage;
