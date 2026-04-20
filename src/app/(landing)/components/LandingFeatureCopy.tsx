/**
 * 랜딩 페이지 소개 섹션의 아이콘, 제목, 설명 영역을 렌더링합니다.
 */

import Image from 'next/image';

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
  return (
    <LandingScrollReveal
      direction={revealDirection}
      className={cn(
        'shrink-0',
        isInverse ? 'text-text-inverse' : 'text-brand-primary',
        className,
      )}
    >
      <Image
        src={icon}
        alt=""
        className={cn('mb-4 h-12 w-12', iconClassName)}
      />
      <h2 className="whitespace-pre-line text-base font-bold leading-tight md:text-2xl lg:text-4xl">
        {title}
      </h2>
      <p
        className={cn(
          'mt-4.5 whitespace-pre-line text-xs md:text-sm lg:text-base',
          isInverse ? 'text-background-tertiary' : 'text-interaction-inactive',
        )}
      >
        {description}
      </p>
    </LandingScrollReveal>
  );
}
