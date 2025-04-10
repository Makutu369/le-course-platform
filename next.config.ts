import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-546db527047a487f9977fbd02e06ff08.r2.dev",
        port: "",
        pathname: "**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
