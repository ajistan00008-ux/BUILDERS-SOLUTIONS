/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Local decorative images live in /public/img.
    // Product & project photography is served from the group's own Sanity CDN.
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io', pathname: '/**' },
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
    ],
  },
  // The storefront began life as a single-product rosemary shop. Keep the old
  // links working — the preview URL was shared before the rebrand.
  async redirects() {
    return [
      { source: '/rosemary', destination: '/daily', permanent: true },
      { source: '/rosemary/:path*', destination: '/daily/:path*', permanent: true },
    ];
  },
};

export default nextConfig;
