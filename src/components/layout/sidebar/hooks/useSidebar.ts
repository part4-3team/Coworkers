/**
 * 서비스 레이아웃 컨텍스트를 통해 사이드바 상태를 가져오는 훅입니다.
 */

import useServiceLayoutContext from '@/components/layout/hooks/useServiceLayoutContext';
import type { UseSidebarReturn } from '@/components/layout/sidebar/types';

export default function useSidebar(): UseSidebarReturn {
  const { handleSidebarInteraction, isSidebarExpanded, toggleSidebar } =
    useServiceLayoutContext();

  return {
    handleSidebarInteraction,
    handleToggleSidebar: toggleSidebar,
    isExpanded: isSidebarExpanded,
  };
}
