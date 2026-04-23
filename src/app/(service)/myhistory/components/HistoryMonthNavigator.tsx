/**
 * 마이 히스토리의 월 이동 헤더를 렌더링하는 컴포넌트입니다.
 */

'use client';

import Image from 'next/image';

import useHistoryCalendarPopover from '@/app/(service)/myhistory/hooks/useHistoryCalendarPopover';
import {
  addMonths,
  formatHistoryMonth,
} from '@/app/(service)/myhistory/utils/formatHistoryDate';
import {
  icCalendarCircleLarge,
  icChevronLeftCircle,
  icChevronRightCircle,
} from '@/assets';
import { DatePicker } from '@/components/common/form';

type HistoryMonthNavigatorProps = {
  onSelectDate: (date: Date) => void;
  selectedDate: Date;
};

export default function HistoryMonthNavigator({
  onSelectDate,
  selectedDate,
}: HistoryMonthNavigatorProps) {
  const {
    calendarButtonRef,
    calendarRef,
    closeCalendar,
    isCalendarOpen,
    toggleCalendar,
  } = useHistoryCalendarPopover();

  const handleDateChange = (date: Date | null) => {
    if (!date) return;

    onSelectDate(date);
    closeCalendar();
  };

  const handleMoveMonth = (monthOffset: number) => {
    const nextMonth = addMonths(selectedDate, monthOffset);
    const firstDayOfMonth = new Date(
      nextMonth.getFullYear(),
      nextMonth.getMonth(),
      1,
    );
    onSelectDate(firstDayOfMonth);
  };

  return (
    <div className="relative flex items-center justify-center">
      <div className="flex items-center gap-4">
        <button
          type="button"
          aria-label="이전 달 보기"
          className="flex size-7 items-center justify-center rounded-lg"
          onClick={() => handleMoveMonth(-1)}
        >
          <Image src={icChevronLeftCircle} alt="" width={24} height={24} />
        </button>

        <p className="text-lg font-bold text-text-primary md:text-xl">
          {formatHistoryMonth(selectedDate)}
        </p>

        <button
          type="button"
          aria-label="다음 달 보기"
          className="flex size-7 items-center justify-center rounded-lg"
          onClick={() => handleMoveMonth(1)}
        >
          <Image src={icChevronRightCircle} alt="" width={24} height={24} />
        </button>
      </div>

      <button
        ref={calendarButtonRef}
        type="button"
        aria-label="날짜 선택"
        aria-haspopup="dialog"
        aria-expanded={isCalendarOpen}
        className="absolute right-0 flex size-10 items-center justify-center rounded-lg"
        onClick={toggleCalendar}
      >
        <Image src={icCalendarCircleLarge} alt="" width={32} height={32} />
      </button>

      {isCalendarOpen && (
        <div
          ref={calendarRef}
          role="dialog"
          aria-label="날짜 선택 달력"
          className="absolute top-12 right-0 z-20"
        >
          <DatePicker
            isInline
            selected={selectedDate}
            onChange={handleDateChange}
          />
        </div>
      )}
    </div>
  );
}
