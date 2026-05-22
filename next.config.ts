import type { NextConfig } from "next";
const CLOUDFRONT_URL = process.env.NEXT_PUBLIC_CLOUDFRONT_URL;

const nextConfig: NextConfig = {
    images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'CLOUDFRONT_URL',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
