'use client';

/**
 * 공용 날짜 선택 컴포넌트입니다.
 */

import ReactDatePicker from 'react-datepicker';
import { ko } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';

import type { DatePickerProps } from '@/components/common/form/types';
import { cn } from '@/utils/cn';
import { useId } from 'react';

export default function DatePicker({
  selected,
  onChange,
  placeholder,
  errorMessage,
  className,
}: DatePickerProps) {
  const hasError = Boolean(errorMessage);

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
