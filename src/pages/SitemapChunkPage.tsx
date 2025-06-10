import React from "react";
import { useParams } from "react-router-dom";
import SitemapIndex from "@/components/SitemapIndex";

const SitemapChunkPage = () => {
  const { chunkId } = useParams<{ chunkId: string }>();

  const chunkNumber = parseInt(chunkId || "1", 10);
  const chunkIndex = isNaN(chunkNumber) ? 0 : chunkNumber - 1;

  return <SitemapIndex chunkIndex={chunkIndex} />;
};

export default SitemapChunkPage;
