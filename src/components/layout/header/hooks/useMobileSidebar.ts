'use client';

/**
 * 서비스 레이아웃 컨텍스트를 통해 모바일 사이드바 상태를 가져오는 훅입니다.
 */

import type { UseMobileSidebarReturn } from '@/components/layout/header/types';
import useServiceLayoutContext from '@/components/layout/hooks/useServiceLayoutContext';

export default function useMobileSidebar(): UseMobileSidebarReturn {
  const {
    isMobileSidebarRendered,
    isMobileSidebarVisible,
    menuButtonRef,
    toggleMobileSidebar,
  } = useServiceLayoutContext();

  const handleClose = () => {
    if (!isMobileSidebarVisible) {
      return;
    }

    toggleMobileSidebar();
  };

  return {
    handleClose,
    handleToggle: toggleMobileSidebar,
    isRendered: isMobileSidebarRendered,
    isVisible: isMobileSidebarVisible,
    menuButtonRef,
  };
}
