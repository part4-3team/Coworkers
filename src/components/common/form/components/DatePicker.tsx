'use client';

/**
 * 공용 날짜 선택 컴포넌트입니다.
 */

import { ko } from 'date-fns/locale';
import ReactDatePicker from 'react-datepicker';

import DatePickerCalendarHeader from '@/components/common/form/components/DatePickerCalendarHeader';
import type {
  DatePickerProps,
  DatePickerRangeValue,
} from '@/components/common/form/types';
import { renderDatePickerWeekDay } from '@/components/common/form/utils/renderDatePickerWeekDay';
import { cn } from '@/utils/cn';

export default function DatePicker({
  onChange,
  isInline = false,
  maxDate,
  minDate,
  openToDate,
  placeholder,
  errorMessage,
  className,
  ...datePickerProps
}: DatePickerProps) {
  const hasError = Boolean(errorMessage);
  const isRangePicker = datePickerProps.selectsRange === true;

  if (isInline) {
    if (isRangePicker) {
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
            startDate={datePickerProps.startDate}
            endDate={datePickerProps.endDate}
            onChange={(date) =>
              (onChange as (date: DatePickerRangeValue) => void)(
                date as DatePickerRangeValue,
              )
            }
            renderCustomHeader={DatePickerCalendarHeader}
            renderCustomDayName={renderDatePickerWeekDay}
          />
        </div>
      );
    }

    return (
      <div className={cn('coworkers-date-picker', className)}>
        <ReactDatePicker
          inline
          calendarStartDay={0}
          locale={ko}
          maxDate={maxDate}
          minDate={minDate}
          openToDate={openToDate}
          selected={datePickerProps.selected}
          onChange={(date: Date | null) =>
            (onChange as (date: Date | null) => void)(date)
          }
          renderCustomHeader={DatePickerCalendarHeader}
          renderCustomDayName={renderDatePickerWeekDay}
        />
      </div>
    );
  }

  if (isRangePicker) {
    return (
      <div className="flex w-full flex-col gap-2">
        <ReactDatePicker
          startDate={datePickerProps.startDate}
          endDate={datePickerProps.endDate}
          onChange={(date) =>
            (onChange as (date: DatePickerRangeValue) => void)(
              date as DatePickerRangeValue,
            )
          }
          locale={ko}
          maxDate={maxDate}
          minDate={minDate}
          openToDate={openToDate}
          selectsRange
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

  return (
    <div className="flex w-full flex-col gap-2">
      <ReactDatePicker
        selected={datePickerProps.selected}
        onChange={(date: Date | null) =>
          (onChange as (date: Date | null) => void)(date)
        }
        locale={ko}
        maxDate={maxDate}
        minDate={minDate}
        openToDate={openToDate}
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
