'use client';

import { useRef, useState } from 'react';
import type { ReactNode } from 'react';

import Draggable from 'react-draggable';

import { cn } from '@/utils/cn';

type DraggableFloatingContainerProps = {
  children: ReactNode;
  className?: string;
  dragBounds?: 'body' | string;
};

export default function DraggableFloatingContainer({
  children,
  className,
  dragBounds = 'body',
}: DraggableFloatingContainerProps) {
  const nodeRef = useRef<HTMLDivElement>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const hasDragged = useRef(false);

  return (
    <Draggable
      bounds={dragBounds}
      nodeRef={nodeRef}
      onStart={() => {
        hasDragged.current = false;
        setIsDragging(true);
      }}
      onDrag={() => {
        hasDragged.current = true;
      }}
      onStop={() => {
        setIsDragging(false);
      }}
    >
      <div
        ref={nodeRef}
        className={cn(
          'touch-none select-none cursor-grab active:cursor-grabbing relative',
          className,
        )}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        // 드래그 후 클릭 이벤트 막기
        onClickCapture={(e) => {
          if (hasDragged.current) {
            e.stopPropagation();
            hasDragged.current = false;
          }
        }}
      >
        {showTooltip && !isDragging && (
          <div className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-gray-800 px-3 py-1.5 text-xs font-medium text-white shadow-md">
            마우스로 움직여 보세요!
            <div className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-gray-800" />
          </div>
        )}

        {children}
      </div>
    </Draggable>
  );
}
