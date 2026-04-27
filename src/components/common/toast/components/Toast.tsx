/**
 * 토스트 알림을 렌더링하는 컴포넌트입니다.
 * success(파란색), error(빨간색) 두 가지 타입을 지원합니다.
 * 모바일에서는 아이콘이 표시되지 않습니다.
 */

'use client';

import Image from 'next/image';

import { icAlertCircleWhiteLarge } from '@/assets';
import type { ToastItem } from '@/components/common/toast/types';
import { cn } from '@/utils/cn';

type ToastProps = {
  toast: ToastItem;
  onRemove: (id: string) => void;
};

export default function Toast({ toast, onRemove }: ToastProps) {
  const isSuccess = toast.type === 'success';

  const handleAction = () => {
    onRemove(toast.id);
    toast.onAction?.();
  };

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        'flex h-12.25 w-85.75 items-center justify-between rounded-xl px-4 md:h-14.25 md:w-125 md:px-5 lg:h-12 lg:w-217',
        isSuccess ? 'bg-brand-primary' : 'bg-status-danger',
      )}
    >
      <div className="flex items-center gap-2">
        <span className="hidden md:block">
          <Image src={icAlertCircleWhiteLarge} alt="" width={24} height={24} />
        </span>
        <p className="text-sm font-medium text-text-inverse md:text-base">
          {toast.message}
        </p>
      </div>
      {toast.actionLabel && (
        <button
          data-toast-action="true"
          type="button"
          onClick={handleAction}
          className={cn(
            'ml-4 h-8.25 shrink-0 rounded-lg bg-background-primary px-3 text-sm font-medium hover:bg-background-secondary',
            toast.actionTextClassName ?? 'text-brand-primary',
          )}
        >
          {toast.actionLabel}
        </button>
      )}
    </div>
  );
}
