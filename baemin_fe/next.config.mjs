/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/dashboard",
        permanent: true, // Set to false if you want temporary redirects (HTTP 302)
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "inoxhungcuong.com",
        // Remove port and pathname if not needed
      },
      {
        protocol: "https",
        hostname: "channel.mediacdn.vn",
      },
    ],
  },
};

export default nextConfig;
