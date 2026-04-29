/**
 * 상단 네비게이션바 컴포넌트입니다.
 */

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { icGnbMenu, icUserLarge, imgLogoSymbolLarge } from '@/assets';
import ProfileMenuDropdown from '@/components/layout/components/ProfileMenuDropdown';
import { getLayoutAuthState } from '@/components/layout/constants';
import MobileSidebarDrawer from '@/components/layout/header/components/MobileSidebarDrawer';
import useMobileSidebar from '@/components/layout/header/hooks/useMobileSidebar';
import { ROUTES } from '@/constants/ROUTES';

export default function Header() {
  const pathname = usePathname();
  const layoutAuthState = getLayoutAuthState(pathname);
  const { handleClose, handleToggle, isRendered, isVisible, menuButtonRef } =
    useMobileSidebar();

  return (
    <>
      <header className="md:hidden sticky top-0 z-40 flex h-13 w-full items-center border-b border-background-tertiary bg-background-inverse px-4">
        <div className="flex items-center gap-3">
          {layoutAuthState.isAuthenticated && (
            <button
              ref={menuButtonRef}
              type="button"
              aria-label={
                isVisible ? '사이드바 메뉴 닫기' : '사이드바 메뉴 열기'
              }
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
          )}

          <Link href={ROUTES.HOME} aria-label="랜딩 페이지로 이동">
            <Image
              src={imgLogoSymbolLarge}
              alt="Coworkers"
              width={35}
              height={24}
              className="h-6 w-auto"
              style={{ width: 'auto' }}
            />
          </Link>
        </div>

        {layoutAuthState.isAuthenticated ? (
          <ProfileMenuDropdown
            className="ml-auto"
            trigger={
              <span
                aria-label="프로필 메뉴 열기"
                className="flex size-7 shrink-0 items-center justify-center rounded-full bg-border-secondary"
              >
                <Image
                  src={icUserLarge}
                  alt=""
                  width={24}
                  height={24}
                  className="size-6"
                />
              </span>
            }
          />
        ) : (
          <Link
            href={ROUTES.LOGIN}
            className="ml-auto text-sm font-medium text-text-primary"
          >
            로그인
          </Link>
        )}
      </header>

      {layoutAuthState.isAuthenticated && (
        <MobileSidebarDrawer
          isRendered={isRendered}
          isVisible={isVisible}
          onClose={handleClose}
        />
      )}
    </>
  );
}
