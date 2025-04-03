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
    env: {
      NEXT_PUBLIC_YOUTUBE_API_URL: process.env.NEXT_PUBLIC_YOUTUBE_API_URL,
      NEXT_PUBLIC_YOUTUBE_API_KEY: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
      NEXT_PUBLIC_YOUTUBE_PLAYLIST_ID: process.env.NEXT_PUBLIC_YOUTUBE_PLAYLIST_ID,
    },
  }),
};

module.exports = nextConfig;
