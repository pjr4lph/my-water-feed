import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'xxxxxx.cloudfront.net', // will replace URL
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
