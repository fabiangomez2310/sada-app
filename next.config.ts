import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* otras opciones que tengas */
  async rewrites() {
    return [
      {
        source: '/api/constitucion/:path*',
        destination: 'https://sada-api.onrender.com/api/constitucion/:path*', // tu API real
      },
      {
        source: '/api/compraventa/:path*',
        destination: 'https://sada-api.onrender.com/api/compraventa/:path*',
      },
      {
        source: '/api/renovacion/:path*',
        destination: 'https://sada-api.onrender.com/api/renovacion/:path*',
      },
    ];
  },
};

export default nextConfig;
