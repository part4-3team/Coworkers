/**
 * 사이드바가 필요한 서비스 화면의 공통 레이아웃을 정의하는 파일입니다.
 */

import type { ReactNode } from 'react';

import Sidebar from '@/components/layout/Sidebar';

export default function ServiceLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="flex min-h-screen bg-background-secondary">
      <Sidebar />
      <main className="min-w-0 flex-1">{children}</main>
    </div>
  );
}
