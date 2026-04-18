/**
 * 사이드바 하단 유저 정보와 로그인 링크 영역입니다.
 */

import Image from 'next/image';
import Link from 'next/link';

import { icUserLarge } from '@/assets';
import type { SidebarFooterProps } from '@/components/layout/sidebar/types';
import { ROUTES } from '@/constants/ROUTES';
import { cn } from '@/utils/cn';

export default function SidebarFooter({ isExpanded }: SidebarFooterProps) {
  return (
    <div
      className={cn(
        'border-t border-background-tertiary py-4',
        isExpanded ? 'mx-4' : 'mx-3',
      )}
    >
      <Link
        href={ROUTES.LOGIN}
        className={cn(
          'flex h-12 items-center overflow-hidden font-medium text-text-primary',
          isExpanded ? 'justify-start gap-3' : 'justify-center',
        )}
      >
        <span
          className={cn(
            'flex shrink-0 size-10 items-center justify-center rounded-lg bg-background-tertiary',
            isExpanded ? 'opacity-100' : 'opacity-0 hidden',
          )}
        >
          <Image src={icUserLarge} alt="" width={24} height={24} />
        </span>
        {isExpanded ? (
          <span className="animate-fadeIn [animation-delay:150ms] [animation-fill-mode:both] whitespace-nowrap text-base">
            로그인
          </span>
        ) : (
          <span className="text-base">로그인</span>
        )}
      </Link>
    </div>
  );
}
