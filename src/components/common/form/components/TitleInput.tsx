/**
 * 제목 입력에 사용하는 공용 입력창 컴포넌트입니다.
 */

import Input from '@/components/common/form/components/Input';
import type { TitleInputProps } from '@/components/common/form/types';
import { cn } from '@/utils/cn';

export default function TitleInput({
  id,
  errorMessage,
  className,
  ...props
}: TitleInputProps) {
  const hasError = Boolean(errorMessage);
  const errorId = id ? `${id}-error` : undefined;

  return (
    <div className="flex w-full flex-col gap-2">
      <Input
        id={id}
        aria-invalid={hasError}
        aria-describedby={hasError ? errorId : undefined}
        className={cn(
          'text-base font-medium',
          hasError && 'border-red-500 focus:border-red-500',
          className,
        )}
        {...props}
      />

      {hasError && (
        <p id={errorId} className="text-sm font-medium text-red-500">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
