import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
      hostname: 'dtvefelcmslgpnctdpsb.supabase.co',
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true
  }
};

export default nextConfig;
