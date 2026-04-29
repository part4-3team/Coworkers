/**
 * 랜딩 페이지의 할 일 상세 소개 섹션을 렌더링하는 컴포넌트입니다.
 */

import Image from 'next/image';

import LandingFeatureCopy from '@/app/(landing)/components/LandingFeatureCopy';
import { LANDING_TASK_DETAIL_SECTION } from '@/app/(landing)/constants';
import { IcSpeechBubble } from '@/assets';

export default function LandingTaskDetailSection() {
  return (
    <section className="flex min-h-180 items-center overflow-hidden bg-background-secondary py-16 md:py-24 lg:pt-20 lg:pb-0">
      <div className="mx-auto flex w-full max-w-screen-2xl flex-col gap-12 lg:flex-row lg:items-center lg:gap-16 xl:gap-24">
        <LandingFeatureCopy
          icon={IcSpeechBubble}
          title={LANDING_TASK_DETAIL_SECTION.title}
          description={LANDING_TASK_DETAIL_SECTION.description}
          className="pl-6 md:pl-12 lg:pl-6"
          iconClassName="h-13 w-13"
        />

        <div className="ml-auto w-11/12 lg:ml-0 lg:w-auto lg:min-w-0 lg:flex-1 lg:pb-20">
          <Image
            src={LANDING_TASK_DETAIL_SECTION.image}
            alt={LANDING_TASK_DETAIL_SECTION.imageAlt}
            className="w-full min-w-150 rounded-t-3xl object-cover lg:min-w-0"
            sizes="(min-width: 1280px) 1300px, (min-width: 1024px) 95vw, 90vw"
          />
        </div>
      </div>
    </section>
  );
}
