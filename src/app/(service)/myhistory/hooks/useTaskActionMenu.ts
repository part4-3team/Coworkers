import { useEffect, useRef, useState } from 'react';

export default function useTaskActionMenu() {
  const [isActionMenuOpen, setIsActionMenuOpen] = useState(false);
  const actionMenuButtonRef = useRef<HTMLButtonElement>(null);
  const actionMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActionMenuOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        (actionMenuRef.current?.contains(event.target) ||
          actionMenuButtonRef.current?.contains(event.target))
      ) {
        return;
      }

      setIsActionMenuOpen(false);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;

      setIsActionMenuOpen(false);
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isActionMenuOpen]);

  const closeActionMenu = () => {
    setIsActionMenuOpen(false);
  };

  const toggleActionMenu = () => {
    setIsActionMenuOpen((prev) => !prev);
  };

  return {
    actionMenuButtonRef,
    actionMenuRef,
    closeActionMenu,
    isActionMenuOpen,
    toggleActionMenu,
  };
}
