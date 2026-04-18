/**
 * 사이드바 상단 로고와 접기/펼치기 버튼 영역입니다.
 */

import Image from 'next/image';
import Link from 'next/link';

import {
  icIndentLeftLarge,
  icIndentRightLarge,
  imgLogoFullLarge,
  imgLogoSymbolLarge,
} from '@/assets';
import type { SidebarHeaderProps } from '@/components/layout/sidebar/types';
import { ROUTES } from '@/constants/ROUTES';
import { cn } from '@/utils/cn';

export default function SidebarHeader({
  isExpanded,
  onToggle,
}: SidebarHeaderProps) {
  return (
    <div
      className={cn(
        'relative flex items-center justify-center pt-10',
        isExpanded && 'justify-between px-3.75 pt-9',
      )}
    >
      <Link href={ROUTES.HOME} aria-label="랜딩 페이지로 이동">
        <Image
          src={imgLogoSymbolLarge}
          alt="Coworkers"
          className={cn('h-6 w-auto', isExpanded && 'hidden')}
          priority
        />
        <Image
          src={imgLogoFullLarge}
          alt="Coworkers"
          className={cn('hidden h-6 w-auto', isExpanded && 'block')}
          priority
        />
      </Link>

      <button
        type="button"
        aria-label={isExpanded ? '사이드바 메뉴 접기' : '사이드바 메뉴 펼치기'}
        onClick={onToggle}
        className={cn(
          'flex cursor-pointer items-center justify-center',
          isExpanded
            ? 'static rounded-none border-0'
            : 'absolute -right-5 top-9 size-8 rounded-full bg-background-inverse border border-slate-300',
        )}
      >
        <Image
          src={isExpanded ? icIndentLeftLarge : icIndentRightLarge}
          alt=""
          width={isExpanded ? 25 : 22}
          height={isExpanded ? 25 : 22}
          className={cn(!isExpanded && 'relative translate-x-0.5')}
        />
      </button>
    </div>
  );
}
