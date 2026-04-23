'use client';

/**
 * 모바일 헤더 사이드바 드로어의 열림 상태와 애니메이션을 관리하는 훅입니다.
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

import type { UseMobileSidebarReturn } from '@/components/layout/header/types';

const MOBILE_SIDEBAR_ANIMATION_DURATION = 300;

export default function useMobileSidebar(): UseMobileSidebarReturn {
  const pathname = usePathname();
  const [isRendered, setIsRendered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const previousPathnameRef = useRef(pathname);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const closeTimeoutRef = useRef<number | null>(null);

  const clearMobileSidebarTimers = useCallback(() => {
    if (animationFrameRef.current !== null) {
      window.cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    if (closeTimeoutRef.current !== null) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  }, []);

  const handleOpen = useCallback(() => {
    clearMobileSidebarTimers();
    setIsRendered(true);

    animationFrameRef.current = window.requestAnimationFrame(() => {
      setIsVisible(true);
    });
  }, [clearMobileSidebarTimers]);

  const handleClose = useCallback(() => {
    clearMobileSidebarTimers();
    setIsVisible(false);

    closeTimeoutRef.current = window.setTimeout(() => {
      setIsRendered(false);
      menuButtonRef.current?.focus();
    }, MOBILE_SIDEBAR_ANIMATION_DURATION);
  }, [clearMobileSidebarTimers]);

  useEffect(() => {
    if (previousPathnameRef.current === pathname) {
      return;
    }

    previousPathnameRef.current = pathname;

    if (!isVisible) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      handleClose();
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [handleClose, isVisible, pathname]);

  useEffect(() => {
    document.body.style.overflow = isRendered ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isRendered]);

  useEffect(() => clearMobileSidebarTimers, [clearMobileSidebarTimers]);

  const handleToggle = useCallback(() => {
    if (isVisible) {
      handleClose();
      return;
    }

    handleOpen();
  }, [handleClose, handleOpen, isVisible]);

  return {
    handleClose,
    handleToggle,
    isRendered,
    isVisible,
    menuButtonRef,
  };
}
