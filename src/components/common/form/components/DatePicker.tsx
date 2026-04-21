'use client';

/**
 * 공용 날짜 선택 컴포넌트입니다.
 */

import ReactDatePicker from 'react-datepicker';
import { ko } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';

import type { DatePickerProps } from '@/components/common/form/types';
import { cn } from '@/utils/cn';

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
          'h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-800 outline-none',
          'placeholder:text-slate-400',
          'focus:border-blue-500',
          hasError && 'border-red-500 focus:border-red-500',
          className,
        )}
      />

      {hasError && (
        <p className="text-sm font-medium text-red-500">{errorMessage}</p>
      )}
    </div>
  );
}
