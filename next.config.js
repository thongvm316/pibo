/**
 * @type {import('next').NextConfig}
 **/
const path = require('path');
const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  trailingSlash: true,
  reactStrictMode: true,
  poweredByHeader: false,
  env: {
    SERVER_API: process.env.SERVER_API,
  },
  staticPageGenerationTimeout: 1000,
};

module.exports = nextConfig;
