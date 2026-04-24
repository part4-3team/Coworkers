import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      '*.svg': [
        {
          condition: {
            query: /[?&]url(?=&|$)/,
          },
          type: 'asset',
        },
        {
          condition: {
            not: {
              query: /[?&]url(?=&|$)/,
            },
          },
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      ],
    },
  },
};

export default nextConfig;
