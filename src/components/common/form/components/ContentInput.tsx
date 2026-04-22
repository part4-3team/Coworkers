/**
 * 내용 입력에 사용하는 공용 입력창 컴포넌트입니다.
 */

import type { ContentInputProps } from '@/components/common/form/types';
import { cn } from '@/utils/cn';
import { useId } from 'react';

export default function ContentInput({
  id,
  errorMessage,
  button,
  className,
  ...props
}: ContentInputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  const hasError = Boolean(errorMessage);
  const errorId = hasError ? `${inputId}-error` : undefined;

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="relative">
        <textarea
          id={inputId}
          aria-invalid={hasError}
          aria-describedby={errorId}
          className={cn(
            'min-h-32 w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none',
            'placeholder:text-slate-400',
            'focus:border-blue-500',
            'disabled:cursor-not-allowed disabled:bg-slate-100',
            hasError && 'border-red-500 focus:border-red-500',
            button && 'pr-16 pb-12',
            className,
          )}
          {...props}
        />

        {button && <div className="absolute bottom-3 right-3">{button}</div>}
      </div>

      {hasError && (
        <p id={errorId} className="text-sm font-medium text-red-500">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
