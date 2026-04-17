/**
 * 상단 네비게이션바 컴포넌트입니다.
 */

import Image from 'next/image';
import Link from 'next/link';

import { imgLogoFullSmall } from '@/assets';
import { ROUTES } from '@/constants/ROUTES';

export default function Header() {
  return (
    <header className="md:hidden sticky top-0 z-50 flex h-12 w-full items-center justify-between bg-background-inverse px-4">
      <Link href={ROUTES.HOME} aria-label="랜딩 페이지로 이동">
        <Image
          src={imgLogoFullSmall}
          alt="Coworkers"
          className="h-5 w-auto"
          priority
        />
      </Link>
      <Link
        href={ROUTES.LOGIN}
        className="text-sm font-medium text-text-primary"
      >
        로그인
      </Link>
    </header>
  );
}
