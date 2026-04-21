/**
 * 로그인·회원가입·팀 참여 등 화면의 주요 제출·확인 액션용 버튼입니다.
 * `className`은 기본 스타일 뒤에 합쳐져 덮어쓰기·추가가 가능합니다.
 *
 * @example
 * ```tsx
 * import { PrimaryButton } from '@/components/common/button';
 * <PrimaryButton type="submit">가입하기</PrimaryButton>
 * ```
 */

import Button from '@/components/common/button/components/Button';
import type { ButtonProps } from '@/components/common/button/types';
import { cn } from '@/utils/cn';

export default function PrimaryButton({ className, ...props }: ButtonProps) {
  return (
    <Button
      className={cn(
        'bg-brand-primary text-text-inverse hover:bg-interaction-hover',
        'font-semibold text-base leading-4.75',
        'max-w-115 w-full h-12 py-3.5 rounded-xl',
        className,
      )}
      {...props}
    />
  );
}
