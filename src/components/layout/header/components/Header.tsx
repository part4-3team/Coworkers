/**
 * 상단 네비게이션바 컴포넌트입니다.
 */

'use client';

import Image from 'next/image';
import Link from 'next/link';

import { icGnbMenu, icUserLarge, imgLogoSymbolLarge } from '@/assets';
import { LAYOUT_AUTH_STATE } from '@/components/layout/constants';
import MobileSidebarDrawer from '@/components/layout/header/components/MobileSidebarDrawer';
import useMobileSidebar from '@/components/layout/header/hooks/useMobileSidebar';
import { ROUTES } from '@/constants/ROUTES';

export default function Header() {
  const { handleClose, handleToggle, isRendered, isVisible, menuButtonRef } =
    useMobileSidebar();

  return (
    <>
      <header className="md:hidden sticky top-0 z-40 flex h-13 w-full items-center bg-background-inverse px-4">
        <div className="flex items-center gap-3">
          <button
            ref={menuButtonRef}
            type="button"
            aria-label={isVisible ? '사이드바 메뉴 닫기' : '사이드바 메뉴 열기'}
            onClick={handleToggle}
            className="flex size-6 shrink-0 items-center"
          >
            <Image
              src={icGnbMenu}
              alt=""
              width={24}
              height={24}
              className="size-6"
            />
          </button>

          <Link href={ROUTES.HOME} aria-label="랜딩 페이지로 이동">
            <Image
              src={imgLogoSymbolLarge}
              alt="Coworkers"
              className="h-6 w-auto"
              priority
            />
          </Link>
        </div>

        {LAYOUT_AUTH_STATE.isAuthenticated ? (
          <Link
            href={ROUTES.MY_PAGE}
            aria-label="계정 설정으로 이동"
            className="ml-auto flex size-7 shrink-0 items-center justify-center rounded-full bg-border-secondary"
          >
            <Image
              src={icUserLarge}
              alt=""
              width={24}
              height={24}
              className="size-6"
            />
          </Link>
        ) : (
          <Link
            href={ROUTES.LOGIN}
            className="ml-auto text-sm font-medium text-text-primary"
          >
            로그인
          </Link>
        )}
      </header>

      <MobileSidebarDrawer
        isRendered={isRendered}
        isVisible={isVisible}
        onClose={handleClose}
      />
    </>
  );
}
