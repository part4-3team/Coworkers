/**
 * 사이드바 레이아웃 컴포넌트입니다.
 */

import Image from 'next/image';
import Link from 'next/link';

import { icGnbMenu, icUserLarge } from '@/assets';
import Logo from '@/components/common/logo/Logo';
import { ROUTES } from '@/constants/ROUTES';

export default function Sidebar() {
  return (
    <aside className="sticky top-0 flex h-screen w-67.5 min-w-67.5 flex-col justify-between bg-background-inverse text-text-default">
      <div>
        <div className="flex h-24 items-center justify-between pl-14 pr-7">
          <Link href={ROUTES.HOME} aria-label="랜딩 페이지로 이동">
            <Logo size="small" className="h-4 w-auto" />
          </Link>

          <button
            type="button"
            aria-label="사이드바 메뉴 접기"
            className="flex size-6 items-center justify-center"
          >
            <Image src={icGnbMenu} alt="" width={24} height={24} />
          </button>
        </div>
      </div>

      <div className="mx-4 border-t border-text-tertiary py-4">
        <Link
          href={ROUTES.LOGIN}
          className="flex h-12 items-center gap-3 text-sm font-medium text-background-primary"
        >
          <span className="flex size-10 items-center justify-center rounded-lg bg-text-tertiary">
            <Image src={icUserLarge} alt="" width={24} height={24} />
          </span>
          <span>로그인</span>
        </Link>
      </div>
    </aside>
  );
}
