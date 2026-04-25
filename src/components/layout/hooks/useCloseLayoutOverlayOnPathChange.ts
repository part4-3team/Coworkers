'use client';

import { useEffect, useRef } from 'react';

type UseCloseLayoutOverlayOnPathChangeParams = {
  closeMobileSidebar: () => void;
  closeRightPanel: () => void;
  isMobileSidebarVisible: boolean;
  isRightPanelRendered: boolean;
  pathname: string;
};

export default function useCloseLayoutOverlayOnPathChange({
  closeMobileSidebar,
  closeRightPanel,
  isMobileSidebarVisible,
  isRightPanelRendered,
  pathname,
}: UseCloseLayoutOverlayOnPathChangeParams) {
  const previousPathnameRef = useRef(pathname);

  useEffect(() => {
    if (previousPathnameRef.current === pathname) {
      return;
    }

    previousPathnameRef.current = pathname;

    const timeoutId = window.setTimeout(() => {
      if (isMobileSidebarVisible) {
        closeMobileSidebar();
      }

      if (isRightPanelRendered) {
        closeRightPanel();
      }
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [
    closeMobileSidebar,
    closeRightPanel,
    isMobileSidebarVisible,
    isRightPanelRendered,
    pathname,
  ]);
}
