'use client';

/**
 * 모바일 헤더에서 여는 사이드바 드로어를 렌더링하는 컴포넌트입니다.
 */

import Image from 'next/image';
import Link from 'next/link';

import { icCloseLarge, imgLogoSymbolLarge } from '@/assets';
import SidebarNav from '@/components/layout/sidebar/components/SidebarNav';
import { ROUTES } from '@/constants/ROUTES';
import { cn } from '@/utils/cn';

type MobileSidebarDrawerProps = {
  isRendered: boolean;
  isVisible: boolean;
  onClose: () => void;
};

export default function MobileSidebarDrawer({
  isRendered,
  isVisible,
  onClose,
}: MobileSidebarDrawerProps) {
  if (!isRendered) {
    return null;
  }

  return (
    <>
      <div
        className={cn(
          'md:hidden fixed inset-0 z-50 bg-text-primary/45 transition-opacity duration-300',
          isVisible ? 'opacity-100' : 'opacity-0',
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="모바일 사이드바 메뉴"
        className={cn(
          'md:hidden fixed inset-y-0 left-0 z-50 flex h-dvh w-56 flex-col bg-background-inverse text-text-default shadow-2xl transition-transform duration-300 will-change-transform',
          isVisible ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="flex items-center justify-between px-4 py-7">
          <Link
            href={ROUTES.HOME}
            aria-label="랜딩 페이지로 이동"
            onClick={onClose}
          >
            <Image
              src={imgLogoSymbolLarge}
              alt="Coworkers"
              className="h-6 w-auto"
              priority
            />
          </Link>

          <button
            type="button"
            onClick={onClose}
            aria-label="사이드바 메뉴 닫기"
            className="flex size-8 items-center justify-center"
          >
            <Image
              src={icCloseLarge}
              alt=""
              width={24}
              height={24}
              className="size-6"
            />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto">
          <SidebarNav isExpanded isMobileDrawer />
        </div>
      </aside>
    </>
  );
}
