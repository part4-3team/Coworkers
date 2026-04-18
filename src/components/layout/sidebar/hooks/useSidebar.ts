/**
 * 사이드바의 펼침 상태와 화면 크기별 초기 상태를 관리하는 훅입니다.
 */

import { useEffect, useState } from 'react';

import { SIDEBAR_DESKTOP_MEDIA_QUERY } from '@/components/layout/sidebar/constants';
import type { UseSidebarReturn } from '@/components/layout/sidebar/types';

export default function useSidebar(): UseSidebarReturn {
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia(SIDEBAR_DESKTOP_MEDIA_QUERY);

    const handleSyncSidebarSize = () => {
      setIsExpanded(mediaQuery.matches);
    };

    handleSyncSidebarSize();
    mediaQuery.addEventListener('change', handleSyncSidebarSize);

    return () => {
      mediaQuery.removeEventListener('change', handleSyncSidebarSize);
    };
  }, []);

  const handleToggleSidebar = () => {
    setIsExpanded((prev) => !prev);
  };

  return {
    handleToggleSidebar,
    isExpanded,
  };
}
