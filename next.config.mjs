/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/PGOURHOME",
  assetPrefix: "/PGOURHOME/",
  trailingSlash: true,
  images: {
    unoptimized: true, // GitHub Pages does not support Next.js image optimization
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
};

export default nextConfig;
