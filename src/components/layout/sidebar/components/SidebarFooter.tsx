/**
 * 사이드바 하단 유저 정보와 로그인 링크 영역입니다.
 */

import Image from 'next/image';
import Link from 'next/link';

import { icUserLarge } from '@/assets';
import { LAYOUT_AUTH_STATE } from '@/components/layout/constants';
import type { SidebarFooterProps } from '@/components/layout/sidebar/types';
import { ROUTES } from '@/constants/ROUTES';
import { cn } from '@/utils/cn';

export default function SidebarFooter({ isExpanded }: SidebarFooterProps) {
  const href = LAYOUT_AUTH_STATE.isAuthenticated
    ? ROUTES.MY_PAGE
    : ROUTES.LOGIN;

  return (
    <div
      className={cn(
        'border-t border-background-tertiary py-4',
        isExpanded ? 'mx-4' : 'mx-3',
      )}
    >
      <Link
        href={href}
        className={cn(
          'flex min-h-12 items-center overflow-hidden font-medium text-text-primary',
          isExpanded ? 'justify-start gap-3' : 'justify-center',
        )}
        aria-label={
          LAYOUT_AUTH_STATE.isAuthenticated
            ? '계정 설정으로 이동'
            : '로그인 페이지로 이동'
        }
      >
        {LAYOUT_AUTH_STATE.isAuthenticated ? (
          <>
            <span className="flex shrink-0 size-10 items-center justify-center rounded-lg bg-background-tertiary">
              <Image src={icUserLarge} alt="" width={24} height={24} />
            </span>
            {isExpanded ? (
              <span className="animate-fadeIn [animation-delay:150ms] [animation-fill-mode:both] flex min-w-0 flex-col">
                <span className="truncate text-base font-semibold text-text-primary">
                  {LAYOUT_AUTH_STATE.currentUser.name}
                </span>
                <span className="truncate text-sm font-medium text-text-default">
                  {LAYOUT_AUTH_STATE.currentUser.teamName}
                </span>
              </span>
            ) : (
              <span className="sr-only">
                {LAYOUT_AUTH_STATE.currentUser.name}
              </span>
            )}
          </>
        ) : isExpanded ? (
          <>
            <span className="flex shrink-0 size-10 items-center justify-center rounded-lg bg-background-tertiary">
              <Image src={icUserLarge} alt="" width={24} height={24} />
            </span>
            <span className="animate-fadeIn [animation-delay:150ms] [animation-fill-mode:both] whitespace-nowrap text-base">
              로그인
            </span>
          </>
        ) : (
          <span className="text-base">로그인</span>
        )}
      </Link>
    </div>
  );
}
