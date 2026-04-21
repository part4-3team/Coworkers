/**
 * 토스트 알림을 렌더링하는 컴포넌트입니다.
 * success(파란색), error(빨간색) 두 가지 타입을 지원합니다.
 * 모바일에서는 아이콘이 표시되지 않습니다.
 */

'use client';

import Image from 'next/image';
import { cn } from '@/utils/cn';
import { icAlertCircleWhiteLarge } from '@/assets';
import type { ToastItem } from '@/components/common/toast/types';

type ToastProps = {
  toast: ToastItem;
  onRemove: (id: string) => void;
};

export default function Toast({ toast, onRemove }: ToastProps) {
  const isSuccess = toast.type === 'success';

  const handleAction = () => {
    toast.onAction?.();
    onRemove(toast.id);
  };

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        'flex w-[343px] items-center justify-between rounded-xl px-4 py-3 md:w-[500px] md:px-5 md:py-4 lg:w-[868px]',
        isSuccess ? 'bg-brand-primary' : 'bg-status-danger',
      )}
    >
      <div className="flex items-center gap-2">
        <span className="hidden md:block">
          <Image src={icAlertCircleWhiteLarge} alt="" />
        </span>
        <p className="text-sm font-medium text-text-inverse md:text-base">
          {toast.message}
        </p>
      </div>
      {toast.actionLabel && (
        <button
          type="button"
          onClick={handleAction}
          className="ml-4 shrink-0 rounded-lg bg-background-primary px-3 py-1.5 text-sm font-medium text-brand-primary hover:bg-background-secondary"
        >
          {toast.actionLabel}
        </button>
      )}
    </div>
  );
}
