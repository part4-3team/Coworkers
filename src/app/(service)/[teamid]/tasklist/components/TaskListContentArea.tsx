/**
 * 할 일 리스트 메인 콘텐츠 영역입니다.
 * 피그마 프레임 기준 너비 1120px·최소 높이 880px에 맞춥니다.
 */

import type { ReactNode } from 'react';

import { cn } from '@/utils/cn';

type TaskListContentAreaProps = {
  children: ReactNode;
  className?: string;
};

export default function TaskListContentArea({
  children,
  className,
}: TaskListContentAreaProps) {
  return (
    <div
      className={cn(
        'relative mx-auto flex w-full max-w-[1120px] min-h-[880px] flex-col gap-4',
        className,
      )}
      aria-label="할 일 리스트 콘텐츠"
    >
      {children}
    </div>
  );
}
