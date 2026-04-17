/**
 * 서비스 로고 텍스트를 공통으로 렌더링하는 컴포넌트입니다.
 */

import { cn } from '@/utils/cn';

interface LogoProps {
  className?: string;
}

export default function Logo({ className }: LogoProps) {
  return (
    <span
      className={cn(
        'font-logo text-lg font-bold text-brand-primary',
        className,
      )}
    >
      Coworkers
    </span>
  );
}
