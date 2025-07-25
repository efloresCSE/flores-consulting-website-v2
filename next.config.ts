/**
 * @type {import('next').NextConfig}
 */

const isProduction = process.env.NODE_ENV === 'production';


const nextConfig = {
  output: 'export',
  basePath: isProduction ? '/flores-consulting-website-v2' : '',
  // Optional: Change the output directory `out` -> `dist`
  // distDir: 'dist',
  images: {
    unoptimized: true, // Disable image optimization
  },
}

module.exports = nextConfig