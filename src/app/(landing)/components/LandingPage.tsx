/**
 * 랜딩 페이지의 전체 UI를 구성하는 컴포넌트입니다.
 */

import Image from 'next/image';
import Link from 'next/link';

import {
  LANDING_TASK_COLUMN_IMAGES,
  LANDING_TASK_COLUMN_SECTION,
  LANDING_TASK_DETAIL_SECTION,
  LANDING_TASKLIST_SECTION,
} from '@/app/(landing)/constants';
import LandingFeatureSection from '@/app/(landing)/components/LandingFeatureSection';
import LandingHeroSection from '@/app/(landing)/components/LandingHeroSection';
import { ROUTES } from '@/constants/ROUTES';

export default function LandingPage() {
  return (
    <main className="overflow-hidden bg-background-primary">
      <h1 className="sr-only">
        Coworkers에서 팀 업무와 할 일을 함께 관리하세요
      </h1>

      <LandingHeroSection />

      <LandingFeatureSection {...LANDING_TASK_COLUMN_SECTION}>
        <div className="lg:col-span-3">
          <div className="grid items-start gap-4 md:grid-cols-3">
            {LANDING_TASK_COLUMN_IMAGES.map(({ alt, image }) => (
              <Image
                key={alt}
                src={image}
                alt={alt}
                quality={100}
                className="mx-auto h-auto max-w-full rounded-lg object-contain"
                sizes="(min-width: 768px) 270px, 100vw"
              />
            ))}
          </div>
        </div>
      </LandingFeatureSection>

      <LandingFeatureSection
        {...LANDING_TASKLIST_SECTION}
        imagePlacement="start"
        isTextInverse
        variant="brand"
      />

      <LandingFeatureSection {...LANDING_TASK_DETAIL_SECTION} variant="muted" />

      <section className="flex min-h-80 flex-col items-center justify-center px-6 py-16 text-center">
        <p className="text-sm font-semibold text-text-default">
          지금 바로 시작해보세요
        </p>
        <Link
          href={ROUTES.LOGIN}
          className="mt-5 inline-flex rounded-lg bg-brand-primary px-6 py-3 text-base font-semibold text-text-inverse transition-colors hover:bg-interaction-hover"
        >
          시작하기
        </Link>
      </section>
    </main>
  );
}
