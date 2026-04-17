'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import {
  icIndentLeftLarge,
  icIndentRightLarge,
  icUserLarge,
  imgLogoFullLarge,
  imgLogoSymbolLarge,
} from '@/assets';
import { ROUTES } from '@/constants/ROUTES';
import { cn } from '@/utils/cn';

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <aside
      className={cn(
        'hidden md:flex sticky top-0 h-screen flex-col justify-between bg-background-inverse text-text-default transition-all duration-300',
        isExpanded ? 'w-67.5 min-w-67.5' : 'w-18 min-w-18',
      )}
    >
      <div>
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
            aria-label={
              isExpanded ? '사이드바 메뉴 접기' : '사이드바 메뉴 펼치기'
            }
            onClick={() => setIsExpanded((prev) => !prev)}
            className={cn(
              'flex cursor-pointer items-center justify-center',
              isExpanded
                ? 'static rounded-none border-0'
                : 'absolute -right-5 top-9 size-8 rounded-full bg-background-inverse border border-[#CBD5E1]',
            )}
          >
            <Image
              src={isExpanded ? icIndentLeftLarge : icIndentRightLarge}
              alt=""
              width={22}
              height={22}
              className={cn(!isExpanded && 'relative translate-x-0.5')}
            />
          </button>
        </div>
      </div>

      <div
        className={cn(
          'border-t border-background-tertiary py-4',
          isExpanded ? 'mx-4' : 'mx-3',
        )}
      >
        <Link
          href={ROUTES.LOGIN}
          className={cn(
            'flex h-12 items-center font-medium text-text-primary',
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
            <span className="animate-fadeIn [animation-delay:150ms] [animation-fill-mode:both] text-base">
              로그인
            </span>
          ) : (
            <span className="text-base">로그인</span>
          )}
        </Link>
      </div>
    </aside>
  );
}
