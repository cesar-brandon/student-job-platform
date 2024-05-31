/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
});

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/a/*",
      },
      {
        protocol: "https",
        hostname: "uploadthing.com",
        port: "",
        pathname: "/f/*",
      },
      {
        protocol: "https",
        hostname: "i.pinimg.com",
        pathname: "/564x/42/dc/3d/*",
      },
      {
        protocol: "https",
        hostname: "utfs.io",
      },
      {
        protocol: "https",
        hostname: "cdn.dribbble.com",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
    ],
  },
};

module.exports = withPWA(nextConfig);
