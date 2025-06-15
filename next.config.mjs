/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  basePath: isProd ? "/johnny-v1" : "",
  reactStrictMode: true,
  trailingSlash: false,
};

export default nextConfig;
