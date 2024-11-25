import { NextConfig } from 'next';
import withPWA from 'next-pwa';
import withBundleAnalyzer from '@next/bundle-analyzer';

// Default Next.js configuration
const nextConfig: NextConfig = {
  reactStrictMode: true,
  async rewrites() {
    console.log('Rewrites function triggered');
    return [
      {
        source: '/s/:path*',
        destination: process.env.FLASK_API || '', // Rewrite to Flask API
      },
    ];
  },
};

// Apply PWA plugin
const pwaConfig = withPWA({
  dest: 'public',
});

// Apply Bundle Analyzer plugin
const bundleAnalyzerConfig = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

// Chain the plugins in the correct order
const finalConfig = { ...pwaConfig({}), ...bundleAnalyzerConfig(nextConfig) };

export default finalConfig;
