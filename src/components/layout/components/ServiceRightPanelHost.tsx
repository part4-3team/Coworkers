'use client';

import { RightPanel } from '@/components/common/rightPanel';
import useServiceLayoutContext from '@/components/layout/hooks/useServiceLayoutContext';

export default function ServiceRightPanelHost() {
  const {
    closeRightPanel,
    isRightPanelRendered,
    isRightPanelVisible,
    rightPanelContent,
  } = useServiceLayoutContext();

  if (!isRightPanelRendered || !rightPanelContent) {
    return null;
  }

  return (
    <RightPanel
      ariaLabel={rightPanelContent.ariaLabel}
      body={rightPanelContent.body}
      footer={rightPanelContent.footer}
      headerAction={rightPanelContent.headerAction}
      isRendered={isRightPanelRendered}
      isVisible={isRightPanelVisible}
      meta={rightPanelContent.meta}
      onClose={closeRightPanel}
      title={rightPanelContent.title}
    />
  );
}
