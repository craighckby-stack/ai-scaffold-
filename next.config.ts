import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  transpilePackages: ['z-ai-web-dev-sdk'],
};

export default nextConfig;