/**
 * 우하단 고정 플로팅 액션(기본 아이콘: 추가)입니다.
 * 드래그로 자유롭게 위치를 옮길 수 있으며, 위치·크기 조정은 `className`으로 합니다.
 */

'use client';

import IcPlusLarge from '@/assets/icons/ic_plus_large.svg';
import Button from '@/components/common/button/components/Button';
import DraggableFloatingContainer from '@/components/common/button/components/DraggableFloatingContainer';
import type { FloatingButtonProps } from '@/components/common/button/types';
import { cn } from '@/utils/cn';

export default function FloatingButton({
  children,
  buttonClassName,
  className,
  dragBounds,
  ...props
}: FloatingButtonProps) {
  return (
    <DraggableFloatingContainer
      className={cn(
        'fixed bottom-10 right-3.5 z-100 md:right-6 md:bottom-20 lg:right-10',
        className,
      )}
      dragBounds={dragBounds}
    >
      <Button
        className={cn(
          'size-14 rounded-full bg-brand-primary hover:bg-interaction-hover',
          'shadow-floating',
          buttonClassName,
        )}
        {...props}
      >
        {children ?? (
          <IcPlusLarge
            width={24}
            height={24}
            role="img"
            aria-label="추가 아이콘"
          />
        )}
      </Button>
    </DraggableFloatingContainer>
  );
}
