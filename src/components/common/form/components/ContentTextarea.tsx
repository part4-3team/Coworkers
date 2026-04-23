/**
 * 내용 입력에 사용하는 공용 입력창 컴포넌트입니다.
 * 게시글 내용 입력, 설명 입력, 긴 텍스트 입력
 */

import type { ContentTextareaProps } from '@/components/common/form/types';
import { cn } from '@/utils/cn';
import { useId } from 'react';

export default function ContentTextarea({
  id,
  errorMessage,
  button,
  className,
  ...props
}: ContentTextareaProps) {
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
            'min-h-28 w-full resize-none rounded-xl border border-background-tertiary bg-background-primary px-4 py-3 text-sm text-text-primary outline-none',
            'md:min-h-32 md:text-base',
            'placeholder:text-text-default',
            'focus:border-brand-primary',
            'disabled:cursor-not-allowed disabled:bg-background-secondary',
            hasError && 'border-status-danger focus:border-status-danger',
            button && 'pr-14 pb-12 md:pr-16',
            className,
          )}
          {...props}
        />

        {button && <div className="absolute bottom-3 right-3">{button}</div>}
      </div>

      {hasError && (
        <p
          id={errorId}
          className="text-xs font-medium text-status-danger md:text-sm"
        >
          {errorMessage}
        </p>
      )}
    </div>
  );
}
