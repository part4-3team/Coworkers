/**
 * 드롭다운 열림/닫힘 상태와 바깥 클릭 감지를 관리하는 커스텀 훅입니다.
 */

import { useEffect, useRef, useState } from 'react';

type UseDropdownReturn = {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
};

export function useDropdown(): UseDropdownReturn {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggle = () => setIsOpen((prev) => !prev);
  const close = () => setIsOpen(false);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        close();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);

  return { isOpen, toggle, close, containerRef };
}
