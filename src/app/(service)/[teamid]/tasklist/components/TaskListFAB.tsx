/**
 * 할 일 만들기 모달을 여는 플로팅 액션 버튼입니다.
 */

'use client';

import { IcPlusLarge } from '@/assets';
import { cn } from '@/utils/cn';

type TaskListFABProps = {
  onClick: () => void;
  className?: string;
};

export default function TaskListFAB({ onClick, className }: TaskListFABProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="할 일 만들기"
      className={cn(
        'fixed right-4 bottom-24 z-40 flex size-14 items-center justify-center rounded-full',
        'bg-brand-primary text-white shadow-lg transition-colors hover:bg-interaction-hover',
        'md:right-8 md:bottom-28 md:size-16',
        className,
      )}
    >
      <IcPlusLarge
        width={28}
        height={28}
        className="size-7 brightness-0 invert md:size-8"
        aria-hidden="true"
      />
    </button>
  );
}
