/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  compress: true,
  // Legacy root-level service URLs were consolidated under /services/*.
  // 301 the old paths so existing links and search rankings carry over.
  async redirects() {
    return [
      { source: "/hr", destination: "/services/hr-services", permanent: true },
      { source: "/finance", destination: "/services/finance-accounting", permanent: true },
      { source: "/service", destination: "/services/digital-marketing", permanent: true },
      {
        source: "/construction-estimation",
        destination: "/services/construction-estimation",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
