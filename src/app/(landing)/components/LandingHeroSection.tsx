/**
 * 랜딩 페이지의 첫 화면 히어로 영역을 렌더링하는 컴포넌트입니다.
 */

import Image from 'next/image';
import Link from 'next/link';

import { imgLandingDashboard, imgLogoSymbolLarge } from '@/assets';
import Logo from '@/components/common/logo/Logo';
import { ROUTES } from '@/constants/ROUTES';

export default function LandingHeroSection() {
  return (
    <section className="flex min-h-screen items-center bg-background-secondary py-20 pl-6 pr-0 md:py-24 md:pl-12">
      <div className="ml-auto grid w-full max-w-none items-center gap-12 lg:grid-cols-5 lg:gap-12">
        <div className="flex max-w-55 flex-col items-start md:gap-116.25 lg:col-span-1 lg:ml-auto">
          <div className="flex flex-col items-start gap-4">
            <Image src={imgLogoSymbolLarge} alt="" className="h-auto w-17.5" />
            <p className="text-xl font-medium text-interaction-inactive">
              함께 만들어가는 To do list
            </p>
            <Logo size="large" />
          </div>
          <Link
            href={ROUTES.LOGIN}
            className="flex items-center justify-center rounded-lg bg-brand-primary w-40 h-12 text-[16px] font-semibold text-text-inverse transition-colors hover:bg-interaction-hover"
          >
            지금 시작하기
          </Link>
        </div>

        <div className="ml-auto w-full max-w-7xl rounded-lg rounded-r-none shadow-2xl shadow-text-default/10 lg:col-span-4">
          <Image
            src={imgLandingDashboard}
            alt="팀 대시보드와 할 일 목록 예시"
            priority
            quality={100}
            className="w-full rounded-lg object-contain"
            sizes="(min-width: 1280px) 1150px, (min-width: 1024px) 950px, 100vw"
          />
        </div>
      </div>
    </section>
  );
}
