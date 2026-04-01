/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@mui/x-charts'],
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  images: {
    remotePatterns: [{ protocol: 'https', hostname: '**' }],
  },
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },
};
module.exports = nextConfig;
