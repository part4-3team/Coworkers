'use client';

/**
 * 공용 입력창 컴포넌트입니다.
 */

import { forwardRef } from 'react';

import type { InputProps } from '@/components/common/form/types';
import { cn } from '@/utils/cn';

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          'h-11 w-full rounded-xl border border-background-tertiary bg-background-primary px-4 text-sm text-text-primary outline-none',
          'md:h-12 md:text-base',
          'placeholder:text-text-default',
          'focus:border-brand-primary',
          'disabled:cursor-not-allowed disabled:bg-background-secondary',
          className,
        )}
        {...props}
      />
    );
  },
);

Input.displayName = 'Input';

export default Input;
