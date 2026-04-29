/**
 * 할 일 행 전용 더보기 메뉴입니다.
 * 메뉴를 body에 포털로 두어 다음 행·FAB보다 위에 그립니다(ListDropdown은 행 안에만 두면 형제 행에 가려짐).
 */

'use client';

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import { createPortal } from 'react-dom';

import { cn } from '@/utils/cn';

export type TaskListTaskRowOptionsMenuItem = {
  label: string;
  onClick: () => void;
};

type TaskListTaskRowOptionsMenuProps = {
  trigger: React.ReactNode;
  items: TaskListTaskRowOptionsMenuItem[];
  className?: string;
};

export default function TaskListTaskRowOptionsMenu({
  trigger,
  items,
  className,
}: TaskListTaskRowOptionsMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);
  const [menuPosition, setMenuPosition] = useState({ left: 0, top: 0 });

  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  useLayoutEffect(() => {
    if (!isOpen) return;

    const updatePosition = () => {
      const triggerEl = containerRef.current;
      if (!triggerEl) return;

      const rect = triggerEl.getBoundingClientRect();
      const menuWidthPx = menuRef.current?.offsetWidth ?? 120;
      const gapPx = 4;

      setMenuPosition({
        top: rect.bottom + gapPx,
        left: Math.max(8, rect.right - menuWidthPx),
      });
    };

    updatePosition();
    const rafId = requestAnimationFrame(updatePosition);

    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleOutsideMouseDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (containerRef.current?.contains(target)) return;
      if (menuRef.current?.contains(target)) return;
      close();
    };

    document.addEventListener('mousedown', handleOutsideMouseDown);
    return () =>
      document.removeEventListener('mousedown', handleOutsideMouseDown);
  }, [isOpen, close]);

  const portalMenu =
    isOpen &&
    typeof document !== 'undefined' &&
    createPortal(
      <ul
        ref={menuRef}
        className="fixed z-50 flex w-30 flex-col overflow-hidden rounded-lg border border-background-tertiary bg-background-primary p-0 py-0 shadow-md"
        role="menu"
        style={{
          left: menuPosition.left,
          top: menuPosition.top,
        }}
      >
        {items.map((item, index) => (
          <li key={`${index}-${item.label}`} role="none" className="w-full">
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
      </ul>,
      document.body,
    );

  return (
    <div
      ref={containerRef}
      className={cn('relative inline-flex shrink-0 items-center', className)}
    >
      <div
        role="button"
        tabIndex={0}
        className="inline-flex items-center"
        aria-expanded={isOpen}
        aria-haspopup="menu"
        onClick={toggle}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            toggle();
          }
        }}
      >
        {trigger}
      </div>
      {portalMenu}
    </div>
  );
}
