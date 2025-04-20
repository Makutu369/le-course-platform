import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.r2.dev",
        port: "",
        pathname: "**",
        search: "",
      },
    ],
  },
  env: {
    "DATABASE_URL": "postgresql://neondb_owner:npg_jnkbTK1I2QiZ@ep-sweet-sea-a56c1axw-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require",
  }
};

export default nextConfig;
