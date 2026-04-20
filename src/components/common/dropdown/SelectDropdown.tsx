/**
 * 현재 선택된 값을 보여주고 우측에 화살표가 있는 선택창형 드롭다운 컴포넌트입니다.
 */

'use client';

import { cn } from '@/utils/cn';
import { useDropdown } from '@/components/common/dropdown/useDropdown';

type SelectDropdownItem<T extends string> = {
  label: string;
  value: T;
};

type SelectDropdownProps<T extends string> = {
  items: SelectDropdownItem<T>[];
  value: T;
  onChange: (value: T) => void;
  placeholder?: string;
  className?: string;
  menuClassName?: string;
};

export default function SelectDropdown<T extends string>({
  items,
  value,
  onChange,
  placeholder = '선택',
  className,
  menuClassName,
}: SelectDropdownProps<T>) {
  const { isOpen, toggle, close, containerRef } = useDropdown();

  const selectedLabel =
    items.find((item) => item.value === value)?.label ?? placeholder;

  return (
    <div ref={containerRef} className={cn('relative inline-block', className)}>
      <button
        type="button"
        onClick={toggle}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-800"
      >
        <span>{selectedLabel}</span>
        <span
          className={cn(
            'text-xs text-gray-500 transition-transform duration-200',
            isOpen && 'rotate-180',
          )}
        >
          ▼
        </span>
      </button>
      {isOpen && (
        <ul
          role="listbox"
          className={cn(
            'absolute left-0 z-10 mt-2 w-full rounded-xl bg-white py-2 shadow-lg',
            menuClassName,
          )}
        >
          {items.map((item) => (
            <li
              key={item.value}
              role="option"
              aria-selected={item.value === value}
            >
              <button
                type="button"
                className={cn(
                  'w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50',
                  item.value === value && 'font-medium text-violet-600',
                )}
                onClick={() => {
                  onChange(item.value);
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
