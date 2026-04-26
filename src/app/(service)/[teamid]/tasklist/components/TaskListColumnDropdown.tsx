/**
 * 모바일·태블릿(lg 미만)에서 할 일 목록 컬럼을 선택하는 드롭다운입니다.
 * 모바일: 180×44. md+: 240×44(card/todo-dropdown). pl-16 pr-12, border tertiary, radius 12.
 */

'use client';

import Image from 'next/image';

import type { TaskListColumnItem } from '@/app/(service)/[teamid]/tasklist/types';
import { icDownArrowLarge, icDownArrowSmall } from '@/assets';
import { Badge } from '@/components/common/badge';
import { useDropdown } from '@/components/common/dropdown/hooks/useDropdown';
import { cn } from '@/utils/cn';

type TaskListColumnDropdownProps = {
  items: TaskListColumnItem[];
  activeId: string;
  onSelect: (id: string) => void;
  className?: string;
};

export default function TaskListColumnDropdown({
  items,
  activeId,
  onSelect,
  className,
}: TaskListColumnDropdownProps) {
  const { isOpen, toggle, close, containerRef } = useDropdown();
  const active = items.find((item) => item.id === activeId) ?? items[0];

  return (
    <div ref={containerRef} className={cn('relative min-w-0', className)}>
      <button
        type="button"
        onClick={toggle}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="할 일 목록 선택"
        className={cn(
          'box-border flex h-11 w-45 max-w-full min-w-0 flex-none flex-row items-center gap-2 rounded-xl border border-background-tertiary',
          'bg-background-primary py-0 pl-4 pr-3 text-left text-sm font-medium text-text-primary',
          'md:w-60 md:max-w-none md:shrink-0',
        )}
      >
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <span className="min-w-0 truncate">{active?.title}</span>
          {active ? (
            <Badge
              completed={active.completed}
              total={active.total}
              className="shrink-0 items-center gap-1 leading-none"
            />
          ) : null}
        </div>
        <span
          className={cn(
            'shrink-0 transition-transform duration-200',
            isOpen && 'rotate-180',
          )}
          aria-hidden
        >
          <Image
            src={icDownArrowSmall}
            alt=""
            width={20}
            height={20}
            className="block md:hidden"
          />
          <Image
            src={icDownArrowLarge}
            alt=""
            width={24}
            height={24}
            className="hidden md:block"
          />
        </span>
      </button>
      {isOpen ? (
        <ul
          role="listbox"
          className="absolute left-0 right-0 z-20 mt-2 max-h-80 overflow-y-auto rounded-xl border border-background-tertiary bg-background-primary py-1 shadow-lg"
        >
          {items.map((item) => {
            const isSelected = item.id === activeId;
            return (
              <li key={item.id} role="none">
                <button
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  className={cn(
                    'flex w-full min-w-0 items-center gap-2 px-3 py-3 text-left text-sm font-medium text-text-primary md:px-4',
                    'hover:bg-background-secondary',
                    isSelected && 'bg-brand-secondary text-brand-primary',
                  )}
                  onClick={() => {
                    onSelect(item.id);
                    close();
                  }}
                >
                  <div className="flex min-w-0 w-full flex-1 items-center gap-2">
                    <span className="min-w-0 truncate">{item.title}</span>
                    <Badge
                      completed={item.completed}
                      total={item.total}
                      className="shrink-0 items-center gap-1 leading-none"
                    />
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
