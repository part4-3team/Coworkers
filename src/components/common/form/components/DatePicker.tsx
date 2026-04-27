'use client';

/**
 * 공용 날짜 선택 컴포넌트입니다.
 */

import { ko } from 'date-fns/locale';
import ReactDatePicker from 'react-datepicker';

import DatePickerCalendarHeader from '@/components/common/form/components/DatePickerCalendarHeader';
import type { DatePickerProps } from '@/components/common/form/types';
import { renderDatePickerWeekDay } from '@/components/common/form/utils/renderDatePickerWeekDay';
import { cn } from '@/utils/cn';

export default function DatePicker({
  selected,
  onChange,
  isInline = false,
  maxDate,
  minDate,
  placeholder,
  errorMessage,
  className,
}: DatePickerProps) {
  const hasError = Boolean(errorMessage);

  if (isInline) {
    return (
      <div className={cn('coworkers-date-picker', className)}>
        <ReactDatePicker
          inline
          calendarStartDay={0}
          locale={ko}
          maxDate={maxDate}
          minDate={minDate}
          selected={selected}
          onChange={onChange}
          renderCustomHeader={DatePickerCalendarHeader}
          renderCustomDayName={renderDatePickerWeekDay}
        />
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-2">
      <ReactDatePicker
        selected={selected}
        onChange={onChange}
        locale={ko}
        dateFormat="yyyy-MM-dd"
        placeholderText={placeholder ?? '날짜 선택'}
        showPopperArrow={false}
        className={cn(
          'h-11 w-full rounded-xl border border-background-tertiary bg-background-primary px-4 text-sm text-text-primary outline-none',
          'md:h-12 md:text-base',
          'placeholder:text-text-default',
          'focus:border-brand-primary',
          hasError && 'border-status-danger focus:border-status-danger',
          className,
        )}
      />

      {hasError && (
        <p className="text-xs font-medium text-status-danger md:text-sm">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
