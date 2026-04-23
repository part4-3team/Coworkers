/**
 * 페이지 상단 제목 영역을 렌더링하는 공용 컴포넌트입니다.
 */

'use client';

import { useEffect, useRef, useState } from 'react';

import { icSettingsLarge } from '@/assets';
import { EditDeleteModal } from '@/components/common/modal';
import type { PageHeaderProps } from '@/components/common/pageHeader/types';
import { cn } from '@/utils/cn';

export default function PageHeader({
  className,
  hasSettingsButton = false,
  title,
}: PageHeaderProps) {
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const settingsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActionModalOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        settingsRef.current?.contains(event.target)
      ) {
        return;
      }

      setIsActionModalOpen(false);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsActionModalOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isActionModalOpen]);

  const handleSettingsClick = () => {
    setIsActionModalOpen((prev) => !prev);
  };

  const handleActionClick = () => {
    setIsActionModalOpen(false);
  };

  return (
    <div
      className={cn(
        'flex items-center 2xl:h-16 2xl:rounded-xl 2xl:bg-background-inverse 2xl:px-6 2xl:shadow-[0_8px_20px_rgba(49,84,153,0.12)]',
        className,
      )}
    >
      <div className="flex items-center gap-2 md:gap-2.5 2xl:w-full 2xl:justify-between 2xl:gap-0">
        <h1 className="text-xl font-bold text-text-primary md:text-2xl">
          {title}
        </h1>

        {hasSettingsButton && (
          <div ref={settingsRef} className="relative">
            <button
              type="button"
              aria-label={`${title} 설정 메뉴 열기`}
              aria-haspopup="menu"
              aria-expanded={isActionModalOpen}
              className="block size-5 bg-interaction-inactive md:size-6"
              style={{
                WebkitMask: `url(${icSettingsLarge.src}) center / contain no-repeat`,
                mask: `url(${icSettingsLarge.src}) center / contain no-repeat`,
              }}
              onClick={handleSettingsClick}
            />

            {isActionModalOpen && (
              <EditDeleteModal
                className="absolute right-0 top-full z-20 mt-2"
                onEdit={handleActionClick}
                onDelete={handleActionClick}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
