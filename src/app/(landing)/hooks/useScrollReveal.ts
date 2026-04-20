/**
 * 랜딩 페이지 요소의 스크롤 진입 여부를 관리합니다.
 */

import { useEffect, useRef, useState } from 'react';

import { REVEAL_OPTIONS } from '@/app/(landing)/constants';
import type { LandingScrollRevealProps } from '@/app/(landing)/types';

export function useScrollReveal({
  animateOnMount = false,
}: Pick<LandingScrollRevealProps, 'animateOnMount'> = {}) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;

    if (!element) {
      return;
    }

    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !('IntersectionObserver' in window)
    ) {
      const animationFrameId = window.requestAnimationFrame(() => {
        setIsVisible(true);
      });

      return () => {
        window.cancelAnimationFrame(animationFrameId);
      };
    }

    if (animateOnMount) {
      const animationFrameId = window.requestAnimationFrame(() => {
        setIsVisible(true);
      });

      return () => {
        window.cancelAnimationFrame(animationFrameId);
      };
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) {
        return;
      }

      setIsVisible(true);
      observer.unobserve(entry.target);
    }, REVEAL_OPTIONS);

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [animateOnMount]);

  return { elementRef, isVisible };
}
