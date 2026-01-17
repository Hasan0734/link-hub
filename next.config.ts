import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.production.linktr.ee",
        port: '',
        pathname: '/**'
      }
    ],
  },
};

export default nextConfig;
