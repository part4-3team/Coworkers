/**
 * 랜딩 페이지의 할 일 리스트 소개 섹션을 렌더링하는 컴포넌트입니다.
 */

import Image from 'next/image';

import LandingFeatureCopy from '@/app/(landing)/components/LandingFeatureCopy';
import { LANDING_TASKLIST_SECTION } from '@/app/(landing)/constants';
import { IcBlueCheck } from '@/assets';

export default function LandingTaskListSection() {
  return (
    <section className="flex min-h-200 flex-col justify-end overflow-hidden bg-brand-primary pt-16 pb-0 md:pt-24 lg:flex-row lg:items-stretch lg:justify-start lg:pt-20">
      <div className="flex w-full flex-col gap-12 lg:mx-auto lg:max-w-375 lg:flex-row lg:items-center lg:gap-30">
        <LandingFeatureCopy
          icon={IcBlueCheck}
          title={LANDING_TASKLIST_SECTION.title}
          description={LANDING_TASKLIST_SECTION.description}
          isInverse
          revealDirection="right"
          className="pl-6 md:pl-12 lg:order-2 lg:pl-0 lg:pr-6"
          iconClassName="h-9 w-9"
        />

        <div className="ml-auto w-11/12 lg:order-1 lg:ml-0 lg:min-w-0 lg:flex-1 lg:self-end">
          <Image
            src={LANDING_TASKLIST_SECTION.image}
            alt={LANDING_TASKLIST_SECTION.imageAlt}
            className="w-full min-w-175 rounded-tl-3xl object-contain lg:min-w-0 lg:rounded-t-3xl"
            sizes="(min-width: 1280px) 1100px, (min-width: 1024px) 85vw, 90vw"
          />
        </div>
      </div>
    </section>
  );
}
