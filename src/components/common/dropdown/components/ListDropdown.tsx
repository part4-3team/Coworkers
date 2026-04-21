/**
 * 화살표 없이 리스트 항목만 띄워주는 메뉴형 드롭다운 컴포넌트입니다.
 */

'use client';

import { cn } from '@/utils/cn';
import { useDropdown } from '@/components/common/dropdown/hooks/useDropdown';
import type { ListDropdownProps } from '@/components/common/dropdown/types';

export default function ListDropdown({
  trigger,
  items,
  className,
  menuClassName,
}: ListDropdownProps) {
  const { isOpen, toggle, close, containerRef } = useDropdown();

  return (
    <div ref={containerRef} className={cn('relative inline-block', className)}>
      <div
        role="button"
        tabIndex={0}
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
            'absolute right-0 z-10 mt-2 w-[120px] rounded-xl bg-background-primary py-0 shadow-lg md:w-[135px]',
            menuClassName,
          )}
          role="menu"
        >
          {items.map((item) => (
            <li key={item.label} role="none">
              <button
                type="button"
                role="menuitem"
                className="w-full whitespace-nowrap px-6 py-3 text-center text-sm text-text-primary hover:bg-background-secondary"
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
