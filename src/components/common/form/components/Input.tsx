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
          'h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-800 outline-none',
          'placeholder:text-slate-400',
          'focus:border-blue-500',
          'disabled:cursor-not-allowed disabled:bg-slate-100',
          className,
        )}
        {...props}
      />
    );
  },
);

Input.displayName = 'Input';

export default Input;
