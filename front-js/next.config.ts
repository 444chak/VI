import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
};

module.exports = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  ...nextConfig,
};

export default nextConfig;
