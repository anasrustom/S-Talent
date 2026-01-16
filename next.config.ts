import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    // Configure image optimization for Netlify
    unoptimized: process.env.NETLIFY === 'true',
  },
  // Ensure trailing slashes are handled correctly
  trailingSlash: false,
  // Enable React strict mode for better development experience
  reactStrictMode: true,
};

export default nextConfig;
