/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  images: {
    unoptimized: true, // Si no usas el componente <Image> de Next.js
    minimumCacheTTL: 60,
  },
};

export default nextConfig;
