/**
 * 화살표 없이 리스트 항목만 띄워주는 메뉴형 드롭다운 컴포넌트입니다.
 * 메뉴는 트리거 오른쪽과 맞추고 아래로 열립니다.
 */

'use client';

import { useLayoutEffect, useRef, useState } from 'react';

import { createPortal } from 'react-dom';

import { useDropdown } from '@/components/common/dropdown/hooks/useDropdown';
import type { ListDropdownProps } from '@/components/common/dropdown/types';
import { cn } from '@/utils/cn';

export default function ListDropdown({
  trigger,
  items,
  className,
  itemClassName,
  menuClassName,
  itemTextAlign = 'center',
}: ListDropdownProps) {
  const triggerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);
  const { isOpen, toggle, close, containerRef } = useDropdown([menuRef]);

  const [menuPosition, setMenuPosition] = useState({
    top: 0,
    left: 0,
  });

  useLayoutEffect(() => {
    if (!isOpen || !triggerRef.current) return;

    const rect = triggerRef.current.getBoundingClientRect();

    setMenuPosition({
      top: rect.bottom + 8,
      left: rect.right - 120,
    });
  }, [isOpen]);

  return (
    <div
      ref={containerRef}
      className={cn('relative inline-flex items-center', className)}
    >
      <div
        ref={triggerRef}
        role="button"
        tabIndex={0}
        className="inline-flex items-center"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={toggle}
        onKeyDown={(e) => e.key === 'Enter' && toggle()}
      >
        {trigger}
      </div>

      {isOpen &&
        createPortal(
          <ul
            ref={menuRef}
            className={cn(
              menuClassName,
              'fixed z-70! flex w-30 flex-col overflow-hidden rounded-xl border border-border-secondary bg-background-primary p-0 shadow-lg',
            )}
            style={{
              top: menuPosition.top,
              left: menuPosition.left,
            }}
            role="menu"
          >
            {items.map((item, index) => (
              <li key={`${index}-${item.label}`} role="none" className="w-full">
                <button
                  type="button"
                  role="menuitem"
                  className={cn(
                    'w-full whitespace-nowrap px-6 py-3 text-sm text-text-primary hover:bg-background-secondary',
                    itemTextAlign === 'start' ? 'text-start' : 'text-center',
                    itemClassName,
                  )}
                  onClick={() => {
                    item.onClick();
                    close();
                  }}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>,
          document.body,
        )}
    </div>
  );
}
