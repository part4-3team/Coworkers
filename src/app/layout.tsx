/**
 * 애플리케이션의 루트 레이아웃을 정의하는 파일입니다.
 */

import localFont from 'next/font/local';

import GlobalLoader from '@/app/globalLoader';
import Providers from '@/app/providers';
import { cn } from '@/utils/cn';
import { resolvePublicAppBaseUrl } from '@/utils/publicAppUrl';

import type { Metadata } from 'next';

import '@/styles/globals.css';

const APP_BASE_URL = resolvePublicAppBaseUrl();
const APP_TITLE = 'Coworkers';
const APP_DESCRIPTION = '함께 만들어가는 To do list';

const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  variable: '--font-pretendard',
  weight: '45 920',
  display: 'swap',
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(APP_BASE_URL),
  title: APP_TITLE,
  description: APP_DESCRIPTION,
  applicationName: APP_TITLE,
  openGraph: {
    title: APP_TITLE,
    description: APP_DESCRIPTION,
    siteName: APP_TITLE,
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: APP_TITLE,
    description: APP_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={cn(pretendard.variable, 'h-full antialiased')}>
      <body className="min-h-full flex flex-col">
        <GlobalLoader />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
