import { icChevronLeftSmall, icChevronRightSmall } from '@/assets';

import type { ReactDatePickerCustomHeaderProps } from 'react-datepicker';

export default function DatePickerCalendarHeader({
  decreaseMonth,
  increaseMonth,
  monthDate,
  nextMonthButtonDisabled,
  prevMonthButtonDisabled,
}: ReactDatePickerCustomHeaderProps) {
  return (
    <div className="flex h-6 items-center justify-between px-11">
      <button
        type="button"
        aria-label="이전 달 보기"
        className="flex size-6 items-center justify-center rounded-lg disabled:opacity-40"
        disabled={prevMonthButtonDisabled}
        onClick={decreaseMonth}
      >
        <span
          aria-hidden="true"
          className="block size-4 bg-text-primary"
          style={{
            WebkitMask: `url(${icChevronLeftSmall.src}) center / contain no-repeat`,
            mask: `url(${icChevronLeftSmall.src}) center / contain no-repeat`,
          }}
        />
      </button>

      <p className="text-sm font-bold text-text-primary">
        {monthDate.getFullYear()}년 {monthDate.getMonth() + 1}월
      </p>

      <button
        type="button"
        aria-label="다음 달 보기"
        className="flex size-6 items-center justify-center rounded-lg disabled:opacity-40"
        disabled={nextMonthButtonDisabled}
        onClick={increaseMonth}
      >
        <span
          aria-hidden="true"
          className="block size-4 bg-text-primary"
          style={{
            WebkitMask: `url(${icChevronRightSmall.src}) center / contain no-repeat`,
            mask: `url(${icChevronRightSmall.src}) center / contain no-repeat`,
          }}
        />
      </button>
    </div>
  );
}
