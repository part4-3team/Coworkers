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
  /* TODO: 게시글 목업 데이터 없어지면 삭제 */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
