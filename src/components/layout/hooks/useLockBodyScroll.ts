'use client';

import { useEffect } from 'react';

type UseLockBodyScrollParams = {
  isMobileSidebarRendered: boolean;
};

export default function useLockBodyScroll({
  isMobileSidebarRendered,
}: UseLockBodyScrollParams) {
  useEffect(() => {
    document.body.style.overflow = isMobileSidebarRendered ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileSidebarRendered]);
}
