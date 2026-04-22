'use client';

/**
 * 로그인, 회원가입, 팀 참여하기 화면에서 공통으로 사용하는 입력창 컴포넌트입니다.
 */

import { useId, useState } from 'react';

import Input from '@/components/common/form/components/Input';
import type { AuthInputProps } from '@/components/common/form/types';
import { cn } from '@/utils/cn';

export default function AuthInput({
  id,
  type = 'text',
  label,
  errorMessage,
  className,
  disabled,
  ...props
}: AuthInputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = `${inputId}-error`;

  const isPasswordInput = type === 'password';
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const inputType = isPasswordInput
    ? isPasswordVisible
      ? 'text'
      : 'password'
    : type;

  const hasError = Boolean(errorMessage);

  const handleTogglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <div className="flex w-full flex-col gap-3">
      <label
        htmlFor={inputId}
        className="text-base font-medium leading-6 text-slate-800"
      >
        {label}
      </label>

      <div className="relative">
        <Input
          id={inputId}
          type={inputType}
          disabled={disabled}
          aria-invalid={hasError}
          aria-describedby={hasError ? errorId : undefined}
          className={cn(
            isPasswordInput && 'pr-16',
            hasError && 'border-red-500 focus:border-red-500',
            'pr-4',
            className,
          )}
          {...props}
        />

        {isPasswordInput && (
          <button
            type="button"
            onClick={handleTogglePasswordVisibility}
            disabled={disabled}
            aria-label={isPasswordVisible ? '비밀번호 숨기기' : '비밀번호 보기'}
            className={cn(
              'absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-500',
              disabled && 'cursor-not-allowed text-slate-400',
            )}
          >
            {isPasswordVisible ? '숨기기' : '보기'}
          </button>
        )}
      </div>

      {hasError && (
        <p id={errorId} className="text-sm font-medium text-red-500">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
