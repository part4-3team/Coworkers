'use client';

import useServiceLayoutContext from '@/components/layout/hooks/useServiceLayoutContext';

export default function useRightPanel() {
  const {
    closeRightPanel,
    isRightPanelRendered,
    isRightPanelVisible,
    openRightPanel,
    rightPanelContent,
  } = useServiceLayoutContext();

  return {
    closeRightPanel,
    isRightPanelRendered,
    isRightPanelVisible,
    openRightPanel,
    rightPanelContent,
  };
}
