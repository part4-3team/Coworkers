/**
 * 공용 버튼 컴포넌트입니다.
 */

import type { ButtonProps } from '@/components/common/button/types';
import { cn } from '@/utils/cn';

export default function Button({
  children,
  type = 'button',
  className,
  isLoading,
  disabled,
  ...props
}: ButtonProps) {
  const isButtonDisabled = disabled || isLoading;

  return (
    <button
      type={type}
      className={cn(
        'inline-flex items-center justify-center',
        'disabled:bg-interaction-inactive',
        className,
      )}
      disabled={isButtonDisabled}
      {...props}
    >
      {isLoading ? '로딩 중...' : children}
    </button>
  );
}
