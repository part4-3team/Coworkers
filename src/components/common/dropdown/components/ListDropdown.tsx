/**
 * 화살표 없이 리스트 항목만 띄워주는 메뉴형 드롭다운 컴포넌트입니다.
 * 메뉴는 트리거 오른쪽과 맞추고 아래로 열립니다(`right-0 top-full`).
 */

'use client';

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
  const { isOpen, toggle, close, containerRef } = useDropdown();

  return (
    <div
      ref={containerRef}
      className={cn('relative inline-flex items-center', className)}
    >
      <div
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
      {isOpen && (
        <ul
          className={cn(
            'absolute right-0 top-full z-10 mt-2 flex w-30 flex-col overflow-hidden rounded-xl border border-border-secondary bg-background-primary p-0',
            menuClassName,
          )}
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
        </ul>
      )}
    </div>
  );
}
