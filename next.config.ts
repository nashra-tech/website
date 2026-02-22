import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.laravel.cloud',
      },
    ],
  },
};

export default nextConfig;
