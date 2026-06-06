/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Local decorative images live in /public/img.
    // Product & project photography is served from the group's own Sanity CDN.
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io', pathname: '/**' },
    ],
  },
};

export default nextConfig;
