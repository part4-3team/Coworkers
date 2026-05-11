/**
 * 게시글 수정 화면에서 미저장 변경이 있을 때 document·window 이벤트를 붙였다 떼는 유틸리티 함수입니다.
 */

import type { MutableRefObject } from 'react';

import shouldBlockBoardEditInteraction from '@/app/(service)/boards/utils/boardEditShouldBlockInteraction';
import type { ToastAction } from '@/components/common/toast/types';

const BOARD_EDIT_UNSAVED_TOAST_DURATION = 3000;

type ShowToastFn = (
  message: string,
  type: 'error',
  action?: ToastAction,
) => string;

type AttachBoardEditUnsavedGuardParams = {
  isBlockedPointerDownRef: MutableRefObject<boolean>;
  isToastVisibleRef: MutableRefObject<boolean>;
  onDiscardChanges: () => void;
  removeToast: (id: string) => void;
  showToast: ShowToastFn;
  toastTimeoutRef: MutableRefObject<number | null>;
};

export function attachBoardEditUnsavedGuard({
  isBlockedPointerDownRef,
  isToastVisibleRef,
  onDiscardChanges,
  removeToast,
  showToast,
  toastTimeoutRef,
}: AttachBoardEditUnsavedGuardParams): () => void {
  const showUnsavedChangesToast = () => {
    if (isToastVisibleRef.current) {
      return;
    }

    isToastVisibleRef.current = true;
    const toastId = showToast('저장하지 않은 변경사항이 있어요!', 'error', {
      hideCloseButton: true,
      label: '변경사항 취소',
      onClick: onDiscardChanges,
      textClassName: 'text-status-danger',
    });

    toastTimeoutRef.current = window.setTimeout(() => {
      removeToast(toastId);
      isToastVisibleRef.current = false;
      toastTimeoutRef.current = null;
    }, BOARD_EDIT_UNSAVED_TOAST_DURATION);
  };

  const blockNavigation = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    showUnsavedChangesToast();
  };

  const handlePointerDownCapture = (event: PointerEvent) => {
    if (!shouldBlockBoardEditInteraction(event.target)) {
      return;
    }

    isBlockedPointerDownRef.current = true;
    blockNavigation(event);
  };

  const handleClickCapture = (event: MouseEvent) => {
    if (isBlockedPointerDownRef.current) {
      isBlockedPointerDownRef.current = false;
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      return;
    }

    if (!shouldBlockBoardEditInteraction(event.target)) {
      return;
    }

    blockNavigation(event);
  };

  const handleBeforeUnload = (event: BeforeUnloadEvent) => {
    event.preventDefault();
    event.returnValue = '';
  };

  document.addEventListener('pointerdown', handlePointerDownCapture, true);
  document.addEventListener('click', handleClickCapture, true);
  window.addEventListener('beforeunload', handleBeforeUnload);

  return () => {
    if (toastTimeoutRef.current) {
      window.clearTimeout(toastTimeoutRef.current);
      toastTimeoutRef.current = null;
    }
    isToastVisibleRef.current = false;
    document.removeEventListener('pointerdown', handlePointerDownCapture, true);
    document.removeEventListener('click', handleClickCapture, true);
    window.removeEventListener('beforeunload', handleBeforeUnload);
  };
}
