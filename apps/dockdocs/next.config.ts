import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  transpilePackages: ["@dock/shared"],
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
