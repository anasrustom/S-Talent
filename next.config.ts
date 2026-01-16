import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Optimize images for Netlify
  images: {
    unoptimized: true, // Netlify doesn't support Next.js Image Optimization
  },
  // Ensure trailing slashes are handled correctly
  trailingSlash: false,
  // Enable React strict mode for better development experience
  reactStrictMode: true,
  // Suppress hydration warnings during development
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

export default nextConfig;
