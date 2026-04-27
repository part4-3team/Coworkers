/**
 * 사이드바가 필요한 서비스 화면의 공통 레이아웃을 정의하는 파일입니다.
 */

import type { ReactNode } from 'react';

import ServiceLayoutClient from '@/components/layout/components/ServiceLayoutClient';

export default function ServiceLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <ServiceLayoutClient>{children}</ServiceLayoutClient>;
}
