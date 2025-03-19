import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-6b8d0af5d9e0460383b2cbe128ef5b1c.r2.dev",
        port: "",
        pathname: "**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
