'use client';

/**
 * 게시글 수정 화면에서 저장하지 않은 변경사항이 있을 때 이탈·전역 UI 클릭을 막는 훅입니다.
 */

import { useEffect, useRef } from 'react';

import { attachBoardEditUnsavedGuard } from '@/app/(service)/boards/[articleId]/utils/attachBoardEditUnsavedGuard';
import { useToast } from '@/components/common/toast';

type UseBoardEditUnsavedChangesGuardParams = {
  hasUnsavedChanges: boolean;
  onDiscardChanges: () => void;
};

export default function useBoardEditUnsavedChangesGuard({
  hasUnsavedChanges,
  onDiscardChanges,
}: UseBoardEditUnsavedChangesGuardParams) {
  const { showToast, removeToast } = useToast();
  const isToastVisibleRef = useRef(false);
  const isBlockedPointerDownRef = useRef(false);
  const toastTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        window.clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!hasUnsavedChanges) {
      return;
    }

    return attachBoardEditUnsavedGuard({
      isBlockedPointerDownRef,
      isToastVisibleRef,
      onDiscardChanges,
      removeToast,
      showToast,
      toastTimeoutRef,
    });
  }, [hasUnsavedChanges, onDiscardChanges, removeToast, showToast]);
}
