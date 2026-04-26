/**
 * 현재 선택된 값을 보여주고 우측에 화살표가 있는 선택창형 드롭다운 컴포넌트입니다.
 */

'use client';

import Image from 'next/image';

import { icDownArrowLarge, icDownArrowSmall } from '@/assets';
import { useDropdown } from '@/components/common/dropdown/hooks/useDropdown';
import type { SelectDropdownProps } from '@/components/common/dropdown/types';
import { cn } from '@/utils/cn';

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
        className="flex w-full items-center justify-between gap-2 rounded-lg border border-border-secondary bg-background-primary p-2 text-sm text-text-primary md:rounded-xl md:px-3.5 md:py-2.5"
      >
        <span>{selectedLabel}</span>
        <span
          className={cn(
            'transition-transform duration-200',
            isOpen && 'rotate-180',
          )}
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
      {isOpen && (
        <ul
          role="listbox"
          className={cn(
            'absolute left-0 z-10 mt-2 w-full overflow-hidden rounded-xl bg-background-primary py-2 shadow-lg',
            menuClassName,
          )}
        >
          {items.map((item) => (
            <li key={item.value} role="none">
              <button
                type="button"
                role="option"
                aria-selected={item.value === value}
                className={cn(
                  'w-full px-4 py-2.5 text-left text-sm text-text-primary hover:bg-background-secondary',
                  item.value === value && 'font-medium text-point-purple',
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
