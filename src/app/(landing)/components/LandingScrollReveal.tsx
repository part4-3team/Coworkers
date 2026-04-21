'use client';

/**
 * 랜딩 페이지 요소가 화면에 들어올 때 스크롤 진입 애니메이션을 적용합니다.
 */

import {
  REVEAL_DELAY_CLASS,
  REVEAL_DIRECTION_CLASS,
} from '@/app/(landing)/constants';
import { useScrollReveal } from '@/app/(landing)/hooks/useScrollReveal';
import type { LandingScrollRevealProps } from '@/app/(landing)/types';
import { cn } from '@/utils/cn';

export default function LandingScrollReveal({
  animateOnMount = false,
  children,
  className,
  delay = 'none',
  direction = 'up',
}: LandingScrollRevealProps) {
  const { elementRef, isVisible } = useScrollReveal({ animateOnMount });

  return (
    <div
      ref={elementRef}
      className={cn(
        'transform-gpu transition-all duration-700 ease-out motion-reduce:translate-x-0 motion-reduce:translate-y-0 motion-reduce:scale-100 motion-reduce:opacity-100 motion-reduce:transition-none',
        REVEAL_DELAY_CLASS[delay],
        isVisible
          ? 'translate-x-0 translate-y-0 scale-100 opacity-100'
          : ['opacity-0', REVEAL_DIRECTION_CLASS[direction]],
        className,
      )}
    >
      {children}
    </div>
  );
}
