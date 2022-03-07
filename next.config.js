const path = require('path');
const { i18n } = require('./next-i18next.config');
const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  i18n,
  trailingSlash: true,
  reactStrictMode: true,
  poweredByHeader: false,
};

module.exports = nextConfig;
