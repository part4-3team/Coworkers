/**
 * 완료 개수와 진행 상태를 pill 형태로 표시하는 공용 배지 컴포넌트입니다.
 *
 * @param completed - 완료된 항목 수
 * @param total - 전체 항목 수 (0이면 시작 전 상태로 표시)
 * @param className - 루트 `div`에 합쳐지는 추가 Tailwind/CSS 클래스
 *
 * @example
 * 기본 사용:
 * ```tsx
 * import { Badge } from '@/components/common/badge';
 *
 * export function Example() {
 *   return <Badge completed={3} total={10} />;
 * }
 * ```
 */

import { cn } from '@/utils/cn';
import type { BadgeProps, BadgeStatus } from '@/components/common/badge/types';
import ProgressCircle from '@/components/common/badge/components/ProgressCircle';

export default function Badge({ completed, total, className }: BadgeProps) {
  const getStatus = (): BadgeStatus => {
    if (total === 0) return 'start';
    if (completed === total) return 'done';
    return 'ongoing';
  };

  const status = getStatus();
  const percentage = total > 0 ? (completed / total) * 100 : 0;

  return (
    <div
      className={cn(
        'inline-flex items-center justify-center gap-1',
        'text-sm font-normal leading-4',
        status === 'start' ? 'text-interaction-inactive' : 'text-brand-primary',
        className,
      )}
    >
      <div className="w-3 h-3">
        <ProgressCircle percentage={percentage} status={status} />
      </div>
      <span className="tabular-nums">
        {completed}/{total}
      </span>
    </div>
  );
}
