/**
 * 할 일 보드 상단의 연·월 표시와 이전/다음 달·달력 버튼입니다.
 */

'use client';

import Image from 'next/image';

import TaskListCalendarPopover from '@/app/(service)/[teamid]/tasklist/components/TaskListCalendarPopover';
import useTaskListCalendarPopover from '@/app/(service)/[teamid]/tasklist/hooks/useTaskListCalendarPopover';
import {
  addMonths,
  formatYearMonth,
  getMonthStart,
} from '@/app/(service)/[teamid]/tasklist/utils/boardDate';
import {
  icCalendarCircleLarge,
  icChevronLeftCircle,
  icChevronRightCircle,
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
    <div className="relative flex min-h-6 shrink-0 items-center justify-end gap-1 sm:min-h-10 sm:gap-2">
      <button
        type="button"
        aria-label="이전 달 보기"
        className="flex size-6 shrink-0 items-center justify-center rounded-lg sm:size-7"
        onClick={() => handleMoveMonth(-1)}
      >
        <Image src={icChevronLeftCircle} alt="" width={24} height={24} />
      </button>

      <p className="shrink-0 text-sm font-bold leading-6 text-text-primary sm:text-base sm:leading-7 md:text-lg md:leading-7">
        {formatYearMonth(selectedDate)}
      </p>

      <button
        type="button"
        aria-label="다음 달 보기"
        className="flex size-6 shrink-0 items-center justify-center rounded-lg sm:size-7"
        onClick={() => handleMoveMonth(1)}
      >
        <Image src={icChevronRightCircle} alt="" width={24} height={24} />
      </button>

      <button
        ref={calendarButtonRef}
        type="button"
        aria-label="날짜 선택"
        aria-haspopup="dialog"
        aria-expanded={isCalendarOpen}
        className="flex size-6 shrink-0 items-center justify-center rounded-lg sm:size-7"
        onClick={toggleCalendar}
      >
        <Image src={icCalendarCircleLarge} alt="" width={24} height={24} />
      </button>

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
