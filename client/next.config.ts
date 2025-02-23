import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ppppwffeiuaabvrukckb.supabase.co',
      },
    ],
  },
};

export default nextConfig;
