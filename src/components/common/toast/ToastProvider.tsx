'use client';

/**
 * 토스트 알림 전역 상태와 트리거 함수를 제공하는 Provider 파일입니다.
 */

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import Toast from '@/components/common/toast/components/Toast';
import type {
  ToastContextValue,
  ToastItem,
  ToastType,
} from '@/components/common/toast/types';

const TOAST_DURATION = 3000;
const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    (
      message: string,
      type: ToastType,
      action?: { label: string; onClick: () => void; textClassName?: string },
    ) => {
      const id = crypto.randomUUID();
      const newToast: ToastItem = {
        id,
        message,
        type,
        actionLabel: action?.label,
        onAction: action?.onClick,
        actionTextClassName: action?.textClassName,
      };

      setToasts((prev) => [...prev, newToast]);

      if (!action) {
        window.setTimeout(() => {
          removeToast(id);
        }, TOAST_DURATION);
      }
    },
    [removeToast],
  );

  const contextValue = useMemo(
    () => ({ showToast, removeToast }),
    [showToast, removeToast],
  );

  const hasToasts = toasts.length > 0;

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      {hasToasts && (
        <div className="fixed bottom-28 left-1/2 z-50 flex -translate-x-1/2 flex-col gap-2">
          {toasts.map((toast) => (
            <Toast key={toast.id} toast={toast} onRemove={removeToast} />
          ))}
        </div>
      )}
    </ToastContext.Provider>
  );
}

export function useToastContext() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToastContext는 ToastProvider 안에서 사용해야 합니다.');
  }

  return context;
}
