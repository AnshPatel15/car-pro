/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "cdn.imagin.studio",
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config, { isServer }) => {
    // Add html-loader rule
    config.module.rules.push({
      test: /\.html$/,
      use: "html-loader",
    });

    return config;
  },
};

module.exports = nextConfig;
