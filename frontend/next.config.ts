import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Image optimization for better performance */
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  /* Compression and optimization */
  compress: true,

  /* Generate static pages early */
  reactStrictMode: true,

  /* Experimental performance features */
  experimental: {
    optimizePackageImports: [
      "@radix-ui/react-dialog",
      "date-fns",
      "lodash-es",
    ],
  },
};

export default nextConfig;
