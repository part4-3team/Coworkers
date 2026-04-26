/**
 * 한 주(월~일) 날짜 칩을 가로로 나열합니다.
 */

'use client';

import {
  addDays,
  formatWeekdayLabel,
  startOfWeekMonday,
} from '@/app/(service)/[teamid]/tasklist/utils/boardDate';
import { cn } from '@/utils/cn';

type TaskListWeekStripProps = {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  className?: string;
};

export default function TaskListWeekStrip({
  selectedDate,
  onSelectDate,
  className,
}: TaskListWeekStripProps) {
  const monday = startOfWeekMonday(selectedDate);

  return (
    <div
      className={cn('grid grid-cols-7 gap-1 sm:gap-2.5 md:gap-3', className)}
      role="tablist"
      aria-label="주간 날짜 선택"
    >
      {Array.from({ length: 7 }, (_, i) => {
        const day = addDays(monday, i);
        const isSelected =
          day.getFullYear() === selectedDate.getFullYear() &&
          day.getMonth() === selectedDate.getMonth() &&
          day.getDate() === selectedDate.getDate();
        const label = formatWeekdayLabel(day);

        return (
          <button
            key={day.toISOString()}
            type="button"
            role="tab"
            aria-selected={isSelected}
            className={cn(
              'flex h-12.25 w-full max-w-11.285 flex-col items-center justify-center gap-0 self-center rounded-xl border px-0.5 py-1 text-center transition-colors sm:h-auto sm:max-w-none sm:min-h-16 sm:self-stretch sm:gap-0.5 sm:px-1 sm:py-2',
              isSelected
                ? 'border-text-primary bg-text-primary text-text-inverse'
                : 'border-background-tertiary bg-background-primary text-text-primary hover:bg-background-secondary',
            )}
            onClick={() => onSelectDate(day)}
          >
            <span className="text-xs font-medium opacity-90">{label}</span>
            <span className="text-base font-semibold tabular-nums sm:text-lg">
              {day.getDate()}
            </span>
          </button>
        );
      })}
    </div>
  );
}
