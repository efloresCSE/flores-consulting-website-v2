/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',
  basePath: isProd ? '/flores-consulting-website-v2' : '',
  assetPrefix: isProd ? '/flores-consulting-website-v2/' : '',
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
