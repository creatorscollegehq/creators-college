import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Trim response headers and ship modern image formats so phones download less.
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 2678400,
    deviceSizes: [360, 420, 640, 768, 1024, 1280, 1920],
  },
  experimental: {
    // Icon and animation libraries ship hundreds of modules; only bundle what is used.
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
