/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        port: "",
        pathname: "/HybridShivam/Pokemon/master/assets/images/**",
      },
    ],
  },
};

export default nextConfig;
