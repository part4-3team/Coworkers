/**
 * 마이 히스토리의 월 이동 헤더를 렌더링하는 컴포넌트입니다.
 */

'use client';

import Image from 'next/image';

import HistoryCalendarPopover from '@/app/(service)/myhistory/components/HistoryCalendarPopover';
import useHistoryCalendarPopover from '@/app/(service)/myhistory/hooks/useHistoryCalendarPopover';
import {
  formatHistoryMonth,
  getMonthStartDate,
} from '@/app/(service)/myhistory/utils/formatHistoryDate';
import {
  icCalendarCircleLarge,
  icChevronLeftCircle,
  icChevronRightCircle,
} from '@/assets';

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
    onSelectDate(getMonthStartDate(selectedDate, monthOffset));
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
        <HistoryCalendarPopover
          calendarRef={calendarRef}
          onSelectDate={handleDateChange}
          selectedDate={selectedDate}
        />
      )}
    </div>
  );
}
