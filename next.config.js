// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    // GitHub Pages는 하위 경로에서 호스팅되므로 basePath와 assetPrefix를 설정해야 함
    basePath: '/seungyeon',
    assetPrefix: '/seungyeon/',
  };
  
  module.exports = nextConfig;