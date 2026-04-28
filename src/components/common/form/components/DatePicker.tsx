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

function renderSingleInlineDatePicker({
  className,
  maxDate,
  minDate,
  onChange,
  openToDate,
  selected,
}: Extract<DatePickerProps, { selectsRange?: false }>) {
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

function renderRangeInlineDatePicker({
  className,
  endDate,
  maxDate,
  minDate,
  onChange,
  openToDate,
  startDate,
}: Extract<DatePickerProps, { selectsRange: true }>) {
  const handleChange = (date: DatePickerRangeValue | Date | null) => {
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

function renderDatePickerField(
  inputProps: {
    className?: string;
    errorMessage?: string;
    placeholder?: string;
  },
  children: React.ReactNode,
) {
  return (
    <div className="flex w-full flex-col gap-2">
      {children}

      {inputProps.errorMessage && (
        <p className="text-xs font-medium text-status-danger md:text-sm">
          {inputProps.errorMessage}
        </p>
      )}
    </div>
  );
}

function renderSingleFieldDatePicker(
  props: Extract<DatePickerProps, { selectsRange?: false }>,
) {
  const hasError = Boolean(props.errorMessage);

  return renderDatePickerField(
    props,
    <ReactDatePicker
      selected={props.selected}
      onChange={props.onChange}
      locale={ko}
      maxDate={props.maxDate}
      minDate={props.minDate}
      openToDate={props.openToDate}
      dateFormat="yyyy-MM-dd"
      placeholderText={props.placeholder ?? '날짜 선택'}
      showPopperArrow={false}
      className={cn(
        'h-11 w-full rounded-xl border border-background-tertiary bg-background-primary px-4 text-sm text-text-primary outline-none',
        'md:h-12 md:text-base',
        'placeholder:text-text-default',
        'focus:border-brand-primary',
        hasError && 'border-status-danger focus:border-status-danger',
        props.className,
      )}
    />,
  );
}

function renderRangeFieldDatePicker(
  props: Extract<DatePickerProps, { selectsRange: true }>,
) {
  const hasError = Boolean(props.errorMessage);
  const handleChange = (date: DatePickerRangeValue | Date | null) => {
    if (!Array.isArray(date)) return;

    props.onChange(date);
  };

  return renderDatePickerField(
    props,
    <ReactDatePicker
      startDate={props.startDate}
      endDate={props.endDate}
      onChange={handleChange}
      locale={ko}
      maxDate={props.maxDate}
      minDate={props.minDate}
      openToDate={props.openToDate}
      selectsRange
      dateFormat="yyyy-MM-dd"
      placeholderText={props.placeholder ?? '날짜 선택'}
      showPopperArrow={false}
      className={cn(
        'h-11 w-full rounded-xl border border-background-tertiary bg-background-primary px-4 text-sm text-text-primary outline-none',
        'md:h-12 md:text-base',
        'placeholder:text-text-default',
        'focus:border-brand-primary',
        hasError && 'border-status-danger focus:border-status-danger',
        props.className,
      )}
    />,
  );
}

export default function DatePicker(props: DatePickerProps) {
  if (props.isInline) {
    if (props.selectsRange) {
      return renderRangeInlineDatePicker(props);
    }

    return renderSingleInlineDatePicker(props);
  }

  if (props.selectsRange) {
    return renderRangeFieldDatePicker(props);
  }

  return renderSingleFieldDatePicker(props);
}
