'use client';

import { useRef } from 'react';
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

  return (
    <Draggable bounds={dragBounds} nodeRef={nodeRef}>
      <div
        ref={nodeRef}
        className={cn(
          'touch-none select-none cursor-grab active:cursor-grabbing',
          className,
        )}
      >
        {children}
      </div>
    </Draggable>
  );
}
