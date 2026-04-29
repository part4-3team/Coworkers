/**
 * 할 일 보드 상단의 연·월 표시와 이전/다음 달·달력 버튼입니다.
 */

'use client';

import TaskListCalendarPopover from '@/app/(service)/[teamid]/tasklist/components/TaskListCalendarPopover';
import useTaskListCalendarPopover from '@/app/(service)/[teamid]/tasklist/hooks/useTaskListCalendarPopover';
import {
  addMonths,
  formatTaskListTitleDate,
  getMonthStart,
} from '@/app/(service)/[teamid]/tasklist/utils/boardDate';
import {
  IcCalendarCircleLarge,
  IcChevronLeftCircle,
  IcChevronRightCircle,
} from '@/assets';

type TaskListMonthNavigatorProps = {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
};

export default function TaskListMonthNavigator({
  selectedDate,
  onSelectDate,
}: TaskListMonthNavigatorProps) {
  const {
    calendarButtonRef,
    calendarRef,
    closeCalendar,
    isCalendarOpen,
    toggleCalendar,
  } = useTaskListCalendarPopover();

  const handleDateChange = (date: Date | null) => {
    if (!date) return;
    onSelectDate(date);
    closeCalendar();
  };

  const handleMoveMonth = (monthOffset: number) => {
    onSelectDate(getMonthStart(addMonths(selectedDate, monthOffset)));
  };

  return (
    <div className="relative flex min-h-6 shrink-0 items-center justify-center sm:min-h-10">
      <div className="flex items-center gap-1 sm:gap-2">
        <button
          type="button"
          aria-label="이전 달 보기"
          className="flex size-6 shrink-0 items-center justify-center rounded-lg sm:size-7"
          onClick={() => handleMoveMonth(-1)}
        >
          <IcChevronLeftCircle width={24} height={24} aria-hidden="true" />
        </button>

        <p className="shrink-0 text-center text-sm font-bold leading-6 text-text-primary sm:text-base sm:leading-7 md:text-lg md:leading-7">
          {formatTaskListTitleDate(selectedDate)}
        </p>

        <button
          type="button"
          aria-label="다음 달 보기"
          className="flex size-6 shrink-0 items-center justify-center rounded-lg sm:size-7"
          onClick={() => handleMoveMonth(1)}
        >
          <IcChevronRightCircle width={24} height={24} aria-hidden="true" />
        </button>
      </div>

      <div
        ref={calendarButtonRef}
        className="absolute right-0 inline-flex shrink-0"
      >
        <button
          type="button"
          aria-label="날짜 선택"
          aria-haspopup="dialog"
          aria-expanded={isCalendarOpen}
          className="flex size-6 shrink-0 items-center justify-center rounded-lg sm:size-7"
          onClick={toggleCalendar}
        >
          <IcCalendarCircleLarge width={24} height={24} aria-hidden="true" />
        </button>
      </div>

      {isCalendarOpen ? (
        <TaskListCalendarPopover
          calendarRef={calendarRef}
          onSelectDate={handleDateChange}
          selectedDate={selectedDate}
        />
      ) : null}
    </div>
  );
}
