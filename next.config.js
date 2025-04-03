/**** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  ...(isProd && {
    output: 'export',
    basePath: '/seungyeon',
    assetPrefix: '/seungyeon/',
    images: {
      unoptimized: true,
    },
  }),
};

module.exports = nextConfig;
