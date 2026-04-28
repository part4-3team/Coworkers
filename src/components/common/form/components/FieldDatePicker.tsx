'use client';

/**
 * 입력 필드 형태의 날짜 선택기를 렌더링합니다.
 */

import { ko } from 'date-fns/locale';
import ReactDatePicker from 'react-datepicker';

import DatePickerField from '@/components/common/form/components/DatePickerField';
import { DATE_PICKER_INPUT_CLASS_NAME } from '@/components/common/form/constants';
import type {
  DatePickerRangeValue,
  RangeDatePickerProps,
  SingleDatePickerProps,
} from '@/components/common/form/types';
import { cn } from '@/utils/cn';

export function SingleFieldDatePicker({
  className,
  errorMessage,
  maxDate,
  minDate,
  onChange,
  openToDate,
  placeholder,
  selected,
}: SingleDatePickerProps) {
  const hasError = Boolean(errorMessage);

  return (
    <DatePickerField errorMessage={errorMessage}>
      <ReactDatePicker
        selected={selected}
        onChange={onChange}
        locale={ko}
        maxDate={maxDate}
        minDate={minDate}
        openToDate={openToDate}
        dateFormat="yyyy-MM-dd"
        placeholderText={placeholder ?? '날짜 선택'}
        showPopperArrow={false}
        className={cn(
          DATE_PICKER_INPUT_CLASS_NAME,
          hasError && 'border-status-danger focus:border-status-danger',
          className,
        )}
      />
    </DatePickerField>
  );
}

export function RangeFieldDatePicker({
  className,
  endDate,
  errorMessage,
  maxDate,
  minDate,
  onChange,
  openToDate,
  placeholder,
  startDate,
}: RangeDatePickerProps) {
  const hasError = Boolean(errorMessage);
  const handleChange = (date: Date | DatePickerRangeValue | null) => {
    if (!Array.isArray(date)) return;

    onChange(date);
  };

  return (
    <DatePickerField errorMessage={errorMessage}>
      <ReactDatePicker
        startDate={startDate}
        endDate={endDate}
        onChange={handleChange}
        locale={ko}
        maxDate={maxDate}
        minDate={minDate}
        openToDate={openToDate}
        selectsRange
        dateFormat="yyyy-MM-dd"
        placeholderText={placeholder ?? '날짜 선택'}
        showPopperArrow={false}
        className={cn(
          DATE_PICKER_INPUT_CLASS_NAME,
          hasError && 'border-status-danger focus:border-status-danger',
          className,
        )}
      />
    </DatePickerField>
  );
}
