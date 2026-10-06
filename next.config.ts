import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { unoptimized: true },
  async redirects() {
    return [
      { source: "/grill", destination: "/qa", permanent: true },
      { source: "/grill/:slug", destination: "/qa/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
