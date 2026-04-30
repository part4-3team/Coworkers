/**
 * 직전 달의 모든 일 + 선택된 달의 모든 일을 가로 스트립으로 보여 줍니다.
 * 드래그로 스크롤하고, 월이 바뀌면 선택된 달 1일이 가운데 오도록 스크롤합니다.
 */

'use client';

import { useLayoutEffect, useMemo, useRef } from 'react';

import useTaskListDragScroll from '@/app/(service)/[teamid]/tasklist/hooks/useTaskListDragScroll';
import { formatWeekdayLabel } from '@/app/(service)/[teamid]/tasklist/utils/boardDate';
import { cn } from '@/utils/cn';

function calendarDayKey(d: Date): string {
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

/** 스크롤 컨테이너 안에서 자식 요소의 가로 중앙이 보이는 영역 중앙에 오도록 맞춥니다. */
function centerChildInHorizontalScrollParent(
  scrollParent: HTMLElement,
  child: HTMLElement,
  behavior: ScrollBehavior = 'auto',
) {
  const parentRect = scrollParent.getBoundingClientRect();
  const childRect = child.getBoundingClientRect();
  const childCenterX = childRect.left + childRect.width / 2;
  const parentCenterX = parentRect.left + parentRect.width / 2;
  const delta = childCenterX - parentCenterX;
  const maxScroll = Math.max(
    0,
    scrollParent.scrollWidth - scrollParent.clientWidth,
  );
  const next = scrollParent.scrollLeft + delta;
  const left = Math.max(0, Math.min(next, maxScroll));
  scrollParent.scrollTo({ left, behavior });
}

type TaskListWeekStripProps = {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  className?: string;
};

const WEEK_STRIP_SCROLL_ROW_CLASS =
  'flex cursor-grab gap-1 overflow-x-auto select-none touch-pan-y sm:gap-2.5 md:gap-1.5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden active:cursor-grabbing';

/** 한 화면에 약 7칸 기준 칩 너비 */
const WEEK_DAY_CELL_CLASS = cn(
  'shrink-0',
  'w-[max(3.25rem,calc((100%-1.5rem)/7))]',
  'sm:w-[max(3.25rem,calc((100%-3.75rem)/7))]',
  'md:w-[max(3.25rem,calc((100%-4.5rem)/7))]',
);

export default function TaskListWeekStrip({
  selectedDate,
  onSelectDate,
  className,
}: TaskListWeekStripProps) {
  const shouldAnimateCenterRef = useRef(false);
  const {
    containerRef,
    handleClickCapture,
    handlePointerDown,
    handlePointerMove,
  } = useTaskListDragScroll();

  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth();
  const selectedDayKey = calendarDayKey(selectedDate);

  const stripDays = useMemo(() => {
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    const prevDays = Array.from(
      { length: prevMonthLastDay },
      (_, i) => new Date(year, month - 1, i + 1),
    );

    const currentMonthLastDay = new Date(year, month + 1, 0).getDate();
    const currentDays = Array.from(
      { length: currentMonthLastDay },
      (_, i) => new Date(year, month, i + 1),
    );

    return [...prevDays, ...currentDays];
  }, [year, month]);

  useLayoutEffect(() => {
    const row = containerRef.current;
    const selectedDay = row?.querySelector<HTMLElement>(
      `[data-calendar-day-key="${selectedDayKey}"]`,
    );

    if (!row || !selectedDay) {
      return;
    }

    centerChildInHorizontalScrollParent(
      row,
      selectedDay,
      shouldAnimateCenterRef.current ? 'smooth' : 'auto',
    );
    shouldAnimateCenterRef.current = false;
  }, [containerRef, selectedDayKey, stripDays.length]);

  const handleSelectDay = (day: Date) => {
    shouldAnimateCenterRef.current = true;
    onSelectDate(day);
  };

  return (
    <ul
      ref={containerRef}
      className={cn(WEEK_STRIP_SCROLL_ROW_CLASS, className)}
      role="tablist"
      aria-label="월간 날짜 선택"
      onClickCapture={handleClickCapture}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
    >
      {stripDays.map((day) => {
        const isInSelectedMonth =
          day.getFullYear() === year && day.getMonth() === month;
        const isMonthFirst = isInSelectedMonth && day.getDate() === 1;
        const isSelected =
          day.getFullYear() === selectedDate.getFullYear() &&
          day.getMonth() === selectedDate.getMonth() &&
          day.getDate() === selectedDate.getDate();
        const label = formatWeekdayLabel(day);

        return (
          <li
            key={calendarDayKey(day)}
            data-calendar-day-key={calendarDayKey(day)}
            data-month-first={isMonthFirst ? 'true' : undefined}
            className={WEEK_DAY_CELL_CLASS}
          >
            <button
              type="button"
              role="tab"
              aria-selected={isSelected}
              className={cn(
                'flex h-12.25 w-full max-w-11.285 flex-col items-center justify-center gap-0 self-center rounded-xl border px-0.5 py-1 text-center transition-colors sm:h-auto sm:max-w-none sm:min-h-16 sm:self-stretch sm:gap-0.5 sm:px-1 sm:py-2',
                isSelected
                  ? 'border-text-primary bg-text-primary text-text-inverse'
                  : isInSelectedMonth
                    ? 'border-background-tertiary bg-background-primary text-text-primary hover:bg-background-secondary'
                    : 'border-background-tertiary bg-background-primary text-text-secondary opacity-80 hover:bg-background-secondary hover:opacity-100',
              )}
              onClick={() => handleSelectDay(day)}
            >
              <span className="text-sm font-medium opacity-90">{label}</span>
              <span className="text-base font-semibold tabular-nums sm:text-lg">
                {day.getDate()}
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
