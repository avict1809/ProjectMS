import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['supabase.com'], // Add google.com to the domains list
  },
};

export default nextConfig;
