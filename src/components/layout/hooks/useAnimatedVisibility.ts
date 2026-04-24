'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

type CloseOptions = {
  onAfterClose?: () => void;
};

type UseAnimatedVisibilityOptions = {
  duration: number;
};

export default function useAnimatedVisibility({
  duration,
}: UseAnimatedVisibilityOptions) {
  const [isRendered, setIsRendered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const animationFrameRef = useRef<number | null>(null);
  const closeTimeoutRef = useRef<number | null>(null);

  const clearTimers = useCallback(() => {
    if (animationFrameRef.current !== null) {
      window.cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    if (closeTimeoutRef.current !== null) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  }, []);

  const open = useCallback(() => {
    clearTimers();
    setIsRendered(true);

    animationFrameRef.current = window.requestAnimationFrame(() => {
      setIsVisible(true);
    });
  }, [clearTimers]);

  const close = useCallback(
    (options?: CloseOptions) => {
      clearTimers();
      setIsVisible(false);

      closeTimeoutRef.current = window.setTimeout(() => {
        setIsRendered(false);
        options?.onAfterClose?.();
      }, duration);
    },
    [clearTimers, duration],
  );

  useEffect(() => clearTimers, [clearTimers]);

  return {
    close,
    isRendered,
    isVisible,
    open,
  };
}
