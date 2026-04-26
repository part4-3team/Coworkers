/**
 * 할 일 리스트 메인 콘텐츠 영역입니다.
 * 첫 번째 자식(팀 헤더 카드)과 두 번째 자식(본문 행) 사이 간격은 피그마 기준 60px입니다.
 * (팀 카드 top 120 + height 64 = 184, 할 일 영역 시작 y 244 → 244 − 184 = 60)
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
        'relative mx-auto flex w-full max-w-[1120px] min-h-[880px] flex-col gap-[60px]',
        className,
      )}
      aria-label="할 일 리스트 콘텐츠"
    >
      {children}
    </div>
  );
}
