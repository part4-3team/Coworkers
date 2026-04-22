'use client';

/**
 * 가로 스크롤 영역을 마우스로 드래그할 수 있게 하는 훅입니다.
 */

import { useEffect, useRef } from 'react';

type UseDragScrollReturn = {
  containerRef: React.RefObject<HTMLUListElement | null>;
  handleClickCapture: (event: React.MouseEvent<HTMLElement>) => void;
  handleMouseDown: (event: React.MouseEvent<HTMLElement>) => void;
  handleMouseMove: (event: React.MouseEvent<HTMLElement>) => void;
};

const DRAG_THRESHOLD = 8;

export default function useDragScroll(): UseDragScrollReturn {
  const containerRef = useRef<HTMLUListElement>(null);
  const isMouseDownRef = useRef(false);
  const isDraggingRef = useRef(false);
  const hasDraggedRef = useRef(false);
  const startXRef = useRef(0);
  const startScrollLeftRef = useRef(0);

  const handleMouseDown = (event: React.MouseEvent<HTMLElement>) => {
    if (event.button !== 0 || !containerRef.current) {
      return;
    }

    isMouseDownRef.current = true;
    isDraggingRef.current = false;
    hasDraggedRef.current = false;
    startXRef.current = event.clientX;
    startScrollLeftRef.current = containerRef.current.scrollLeft;
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    if (!isMouseDownRef.current || !containerRef.current) {
      return;
    }

    const movedX = event.clientX - startXRef.current;

    if (Math.abs(movedX) <= DRAG_THRESHOLD) {
      return;
    }

    isDraggingRef.current = true;
    hasDraggedRef.current = true;
    containerRef.current.scrollLeft = startScrollLeftRef.current - movedX;
    event.preventDefault();
  };

  useEffect(() => {
    const handleMouseUp = () => {
      isMouseDownRef.current = false;

      if (!isDraggingRef.current) {
        return;
      }

      isDraggingRef.current = false;
      window.requestAnimationFrame(() => {
        hasDraggedRef.current = false;
      });
    };

    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const handleClickCapture = (event: React.MouseEvent<HTMLElement>) => {
    if (!hasDraggedRef.current) {
      return;
    }

    isDraggingRef.current = false;
    event.preventDefault();
    event.stopPropagation();
    hasDraggedRef.current = false;
  };

  return {
    containerRef,
    handleClickCapture,
    handleMouseDown,
    handleMouseMove,
  };
}
