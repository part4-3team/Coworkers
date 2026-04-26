/**
 * 할 일 리스트 메인 콘텐츠 영역입니다.
 * lg 이상은 mx-auto를 끄고 페이지 좌우 패딩과 함께 왼쪽 기준으로 배치합니다.
 * lg 이상: 팀 카드와 본문 행 사이 간격 피그마 60px(gap-15).
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
        'relative mx-auto flex w-full min-h-0 flex-col gap-4 md:gap-6 lg:mx-0 lg:max-w-280 lg:min-h-220 lg:gap-15',
        className,
      )}
      aria-label="할 일 리스트 콘텐츠"
    >
      {children}
    </div>
  );
}
