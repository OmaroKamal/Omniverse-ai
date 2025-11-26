import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Turn off Next.js dev CORS blocking completely
  experimental: {
    // Allow ANY dev origin (including Replit dynamic URLs)
    allowedDevOrigins: ["*"],
  },

  // Disable strict origin checking internally
  poweredByHeader: false,
  reactStrictMode: false,
};

export default nextConfig;
