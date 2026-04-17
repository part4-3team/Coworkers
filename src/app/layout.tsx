/**
 * 애플리케이션의 루트 레이아웃을 정의하는 파일입니다.
 */

import type { Metadata } from 'next';
import localFont from 'next/font/local';

import Providers from '@/app/providers';
import { cn } from '@/utils/cn';

import '@/styles/globals.css';

const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  variable: '--font-pretendard',
  weight: '45 920',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Coworkers',
  description: '협업을 위한 프로젝트 관리 도구',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={cn(pretendard.variable, 'h-full antialiased')}>
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
