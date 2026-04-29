'use client';

/**
 * 입력 필드 형태의 날짜 선택기를 렌더링합니다.
 */

import { useId } from 'react';

import { ko } from 'date-fns/locale';
import ReactDatePicker from 'react-datepicker';

import DatePickerField from '@/components/common/form/components/DatePickerField';
import { DATE_PICKER_INPUT_CLASS_NAME } from '@/components/common/form/constants';
import type {
  DatePickerRangeValue,
  RangeDatePickerProps,
  SingleDatePickerProps,
} from '@/components/common/form/types';
import { normalizeDatePickerRangeValue } from '@/components/common/form/utils/normalizeDatePickerRangeValue';
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
  id,
}: SingleDatePickerProps) {
  const generatedId = useId();
  const hasError = Boolean(errorMessage);
  const inputId = id ?? generatedId;
  const errorMessageId = errorMessage ? `${inputId}-error` : undefined;

  return (
    <DatePickerField
      errorMessage={errorMessage}
      errorMessageId={errorMessageId}
    >
      <ReactDatePicker
        id={inputId}
        selected={selected}
        onChange={onChange}
        ariaDescribedBy={errorMessageId}
        ariaInvalid={hasError ? 'true' : undefined}
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
  id,
}: RangeDatePickerProps) {
  const generatedId = useId();
  const hasError = Boolean(errorMessage);
  const inputId = id ?? generatedId;
  const errorMessageId = errorMessage ? `${inputId}-error` : undefined;

  const handleChange = (date: Date | DatePickerRangeValue | null) => {
    const normalizedDate = normalizeDatePickerRangeValue(date);

    if (!normalizedDate) return;

    onChange(normalizedDate);
  };

  return (
    <DatePickerField
      errorMessage={errorMessage}
      errorMessageId={errorMessageId}
    >
      <ReactDatePicker
        id={inputId}
        startDate={startDate}
        endDate={endDate}
        onChange={handleChange}
        ariaDescribedBy={errorMessageId}
        ariaInvalid={hasError ? 'true' : undefined}
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
