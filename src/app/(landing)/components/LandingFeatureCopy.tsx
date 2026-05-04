/**
 * 랜딩 페이지 소개 섹션의 아이콘, 제목, 설명 영역을 렌더링합니다.
 */

import LandingScrollReveal from '@/app/(landing)/components/LandingScrollReveal';
import type { LandingFeatureCopyProps } from '@/app/(landing)/types';
import { cn } from '@/utils/cn';

export default function LandingFeatureCopy({
  className,
  description,
  icon,
  iconClassName,
  isInverse = false,
  revealDirection = 'left',
  title,
}: LandingFeatureCopyProps) {
  const Icon = icon;

  return (
    <LandingScrollReveal
      direction={revealDirection}
      className={cn(
        'shrink-0',
        isInverse ? 'text-text-inverse' : 'text-brand-primary',
        className,
      )}
    >
      <Icon
        width={40}
        height={40}
        className={cn('mb-4 h-10 w-10 md:h-12 md:w-12', iconClassName)}
        aria-hidden="true"
      />

      <h2 className="whitespace-pre-line text-base font-bold leading-tight md:text-2xl lg:text-3xl">
        {title}
      </h2>

      <p
        className={cn(
          'mt-3 whitespace-pre-line text-sm leading-relaxed md:mt-4.5 lg:text-base',
          isInverse ? 'text-background-tertiary' : 'text-interaction-inactive',
        )}
      >
        {description}
      </p>
    </LandingScrollReveal>
  );
}
