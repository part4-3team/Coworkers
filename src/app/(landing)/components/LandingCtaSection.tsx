/**
 * 랜딩 페이지의 시작하기 CTA 섹션을 렌더링하는 컴포넌트입니다.
 */

import Link from 'next/link';

import LandingScrollReveal from '@/app/(landing)/components/LandingScrollReveal';
import { ROUTES } from '@/constants/ROUTES';

export default function LandingCtaSection() {
  return (
    <section className="flex min-h-100 flex-col items-center justify-center px-6 py-16 text-center md:py-20 lg:py-24">
      <LandingScrollReveal
        direction="up"
        className="flex flex-col items-center text-center"
      >
        <h2 className="text-base font-bold leading-tight text-brand-primary md:text-2xl lg:text-4xl">
          지금 바로 시작해보세요.
        </h2>
        <p className="mt-3 whitespace-pre-line text-sm text-interaction-inactive lg:text-base">
          팀원 모두와 같은 방향, 같은 속도로 나아가는 가장 쉬운 방법
        </p>
        <Link
          href={ROUTES.LOGIN}
          className="mt-7 flex h-10 w-32 items-center justify-center rounded-lg bg-brand-primary text-sm font-semibold text-text-inverse transition-colors hover:bg-interaction-hover md:h-12 md:w-40 md:text-base"
        >
          지금 시작하기
        </Link>
      </LandingScrollReveal>
    </section>
  );
}
