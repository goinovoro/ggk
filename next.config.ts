import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    if (process.env.NGROK_URL) {
      return [
        {
          source: '/api/validate-file',
          destination: `${process.env.NGROK_URL}/api/validate-file`,
        },
      ];
    }
    return [];
  },
};

export default nextConfig;
