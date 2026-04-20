/**
 * 로그인, 회원가입, 팀 참여하기처럼 주요 제출 액션에 사용하는 공용 버튼입니다.
 */

import Button from '@/components/common/button/components/Button';
import type { ButtonProps } from '@/components/common/button/types';
import { twMerge } from 'tailwind-merge';

export default function PrimaryButton({ className, ...props }: ButtonProps) {
  return (
    <Button
      className={twMerge(
        'bg-brand-primary text-text-inverse hover:bg-interaction-hover',
        'font-semibold text-base leading-4.75',
        'max-w-115 w-full h-12 py-3.5 rounded-xl',
      )}
      {...props}
    />
  );
}
