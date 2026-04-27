/** 토스트 컴포넌트에서 사용하는 타입 정의입니다. */

export type ToastType = 'success' | 'error';

export type ToastItem = {
  id: string;
  message: string;
  type: ToastType;
  actionLabel?: string;
  onAction?: () => void;
  actionTextClassName?: string;
};

export type ToastContextValue = {
  showToast: (
    message: string,
    type: ToastType,
    action?: { label: string; onClick: () => void; textClassName?: string },
  ) => void;
  removeToast: (id: string) => void;
};
