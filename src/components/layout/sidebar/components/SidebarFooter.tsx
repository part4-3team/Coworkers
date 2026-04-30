'use client';

/**
 * 사이드바 하단 유저 정보와 로그인 링크 영역입니다.
 */

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { IcUserLarge } from '@/assets';
import ProfileMenuDropdown from '@/components/layout/components/ProfileMenuDropdown';
import useLayoutAuthState from '@/components/layout/hooks/useLayoutAuthState';
import useSidebar from '@/components/layout/sidebar/hooks/useSidebar';
import type { SidebarFooterProps } from '@/components/layout/sidebar/types';
import { ROUTES } from '@/constants/ROUTES';
import { cn } from '@/utils/cn';

export default function SidebarFooter({ isExpanded }: SidebarFooterProps) {
  const { handleSidebarInteraction } = useSidebar();
  const pathname = usePathname();
  const layoutAuthState = useLayoutAuthState(pathname);
  const href = layoutAuthState.isAuthenticated ? ROUTES.MY_PAGE : ROUTES.LOGIN;

  return (
    <div
      className={cn(
        'border-t border-background-tertiary py-4',
        isExpanded ? 'mx-4' : 'mx-3',
      )}
    >
      {layoutAuthState.isAuthenticated ? (
        <ProfileMenuDropdown
          className="w-full"
          onNavigate={handleSidebarInteraction}
          horizontalAlign="start"
          verticalPosition="top"
          trigger={
            <div
              className={cn(
                'flex min-h-12 w-full items-center overflow-hidden font-medium text-text-primary',
                isExpanded ? 'justify-start gap-3' : 'justify-center',
              )}
              aria-label="프로필 메뉴 열기"
            >
              <span className="flex shrink-0 size-10 items-center justify-center overflow-hidden rounded-lg bg-background-tertiary">
                {layoutAuthState.currentUser.image ? (
                  <Image
                    src={layoutAuthState.currentUser.image}
                    alt=""
                    width={40}
                    height={40}
                    className="size-10 object-cover"
                  />
                ) : (
                  <IcUserLarge width={24} height={24} aria-hidden="true" />
                )}
              </span>
              {isExpanded ? (
                <span className="animate-fadeIn [animation-delay:150ms] [animation-fill-mode:both] flex min-w-0 flex-col">
                  <span className="truncate text-base font-semibold text-text-primary">
                    {layoutAuthState.currentUser.name}
                  </span>
                  <span className="truncate text-sm font-medium text-text-default">
                    {layoutAuthState.currentUser.teamName}
                  </span>
                </span>
              ) : (
                <span className="sr-only">
                  {layoutAuthState.currentUser.name}
                </span>
              )}
            </div>
          }
        />
      ) : (
        <Link
          href={href}
          className={cn(
            'flex min-h-12 items-center overflow-hidden font-medium text-text-primary',
            isExpanded ? 'justify-start gap-3' : 'justify-center',
          )}
          aria-label="로그인 페이지로 이동"
          onClick={handleSidebarInteraction}
        >
          {isExpanded ? (
            <>
              <span className="flex shrink-0 size-10 items-center justify-center rounded-lg bg-background-tertiary">
                <IcUserLarge width={24} height={24} aria-hidden="true" />
              </span>
              <span className="animate-fadeIn [animation-delay:150ms] [animation-fill-mode:both] whitespace-nowrap text-base">
                로그인
              </span>
            </>
          ) : (
            <span className="text-base">로그인</span>
          )}
        </Link>
      )}
    </div>
  );
}
