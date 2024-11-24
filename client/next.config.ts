import { NextConfig } from 'next';
import withPWA from 'next-pwa';
import withBundleAnalyzer from '@next/bundle-analyzer';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/s/:path*',
        destination: process.env.FLASK_API || '', // Rewrite to Flask API
      },
    ];
  },
};

const pwaConfig = withPWA({
  dest: 'public',
});

const bundleAnalyzerConfig = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const finalConfig = bundleAnalyzerConfig(() => pwaConfig(() => nextConfig));

export default finalConfig;
