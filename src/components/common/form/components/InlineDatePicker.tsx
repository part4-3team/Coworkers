'use client';

/**
 * 인라인 형태의 날짜 선택기를 렌더링합니다.
 */

import { ko } from 'date-fns/locale';
import ReactDatePicker from 'react-datepicker';

import DatePickerCalendarHeader from '@/components/common/form/components/DatePickerCalendarHeader';
import type {
  DatePickerRangeValue,
  RangeDatePickerProps,
  SingleDatePickerProps,
} from '@/components/common/form/types';
import { renderDatePickerWeekDay } from '@/components/common/form/utils/renderDatePickerWeekDay';
import { cn } from '@/utils/cn';

export function SingleInlineDatePicker({
  className,
  maxDate,
  minDate,
  onChange,
  openToDate,
  selected,
}: SingleDatePickerProps) {
  return (
    <div className={cn('coworkers-date-picker', className)}>
      <ReactDatePicker
        inline
        calendarStartDay={0}
        locale={ko}
        maxDate={maxDate}
        minDate={minDate}
        openToDate={openToDate}
        selected={selected}
        onChange={onChange}
        renderCustomHeader={DatePickerCalendarHeader}
        renderCustomDayName={renderDatePickerWeekDay}
      />
    </div>
  );
}

export function RangeInlineDatePicker({
  className,
  endDate,
  maxDate,
  minDate,
  onChange,
  openToDate,
  startDate,
}: RangeDatePickerProps) {
  const handleChange = (date: Date | DatePickerRangeValue | null) => {
    if (!Array.isArray(date)) return;

    onChange(date);
  };

  return (
    <div className={cn('coworkers-date-picker', className)}>
      <ReactDatePicker
        inline
        calendarStartDay={0}
        locale={ko}
        maxDate={maxDate}
        minDate={minDate}
        openToDate={openToDate}
        selectsRange
        startDate={startDate}
        endDate={endDate}
        onChange={handleChange}
        renderCustomHeader={DatePickerCalendarHeader}
        renderCustomDayName={renderDatePickerWeekDay}
      />
    </div>
  );
}
