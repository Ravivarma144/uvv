/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  basePath: isProd ? "" : "",
  assetPrefix: isProd ? "" : "",
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;