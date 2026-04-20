/**
 * 랜딩 페이지에서 반복되는 텍스트와 이미지 조합 섹션을 렌더링하는 컴포넌트입니다.
 */

import Image from 'next/image';

import type { LandingFeatureSectionProps } from '@/app/(landing)/types';
import { cn } from '@/utils/cn';

export default function LandingFeatureSection({
  children,
  description,
  eyebrow,
  image,
  imageAlt,
  imagePlacement = 'end',
  isTextInverse = false,
  title,
  variant = 'default',
}: LandingFeatureSectionProps) {
  const imageBlock = image ? (
    <div className="self-end lg:col-span-3">
      <Image
        src={image}
        alt={imageAlt ?? ''}
        quality={100}
        className="w-full rounded-t-lg object-contain"
        sizes="(min-width: 1280px) 960px, (min-width: 1024px) 75vw, 100vw"
      />
    </div>
  ) : (
    children
  );

  const textBlock = (
    <div
      className={cn(
        'max-w-sm lg:col-span-1',
        isTextInverse && 'text-text-inverse',
      )}
    >
      {eyebrow && (
        <div className="mb-4 flex items-center gap-2">
          {/* 아이콘 영역 - 이미지에서 각 섹션마다 작은 아이콘이 보임 */}
          <div
            className={cn(
              'flex h-8 w-8 items-center justify-center rounded-lg',
              isTextInverse ? 'bg-white/20' : 'bg-brand-primary/10',
            )}
          >
            <span
              className={cn(
                'text-sm',
                isTextInverse ? 'text-white' : 'text-brand-primary',
              )}
            >
              ✓
            </span>
          </div>
        </div>
      )}
      <h2
        className={cn(
          'text-2xl font-bold leading-tight md:text-3xl lg:text-4xl',
          !isTextInverse && 'text-text-primary',
        )}
      >
        {title}
      </h2>
      <p
        className={cn(
          'mt-4 text-sm leading-7',
          isTextInverse ? 'text-white/80' : 'text-text-default',
        )}
      >
        {description}
      </p>
    </div>
  );

  return (
    <section
      className={cn(
        'flex min-h-screen px-6',
        variant === 'default' && 'items-center py-20 md:py-24',
        variant === 'brand' &&
          'items-stretch bg-brand-primary pb-0 pt-20 md:pt-24',
        variant === 'muted' &&
          'items-stretch bg-background-secondary pb-0 pt-20 md:pt-24',
      )}
    >
      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-4 lg:gap-16">
        {imagePlacement === 'start' && imageBlock}
        {textBlock}
        {imagePlacement === 'end' && imageBlock}
      </div>
    </section>
  );
}
