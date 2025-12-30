import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: 'export',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
      },
      {
        protocol: 'https',
        hostname: 'www.thiings.co',
      },
      {
        protocol: 'https',
        hostname: 'lftz25oez4aqbxpq.public.blob.vercel-storage.com',
      }
    ],
  },
};

export default nextConfig;

