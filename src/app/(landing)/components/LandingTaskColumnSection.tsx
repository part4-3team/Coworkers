/**
 * 랜딩 페이지의 칸반보드 소개 섹션을 렌더링하는 컴포넌트입니다.
 */

import Image from 'next/image';

import LandingFeatureCopy from '@/app/(landing)/components/LandingFeatureCopy';
import {
  LANDING_TASK_COLUMN_IMAGES,
  LANDING_TASK_COLUMN_SECTION,
} from '@/app/(landing)/constants';
import { IcFolder } from '@/assets';

export default function LandingTaskColumnSection() {
  return (
    <section className="flex min-h-200 items-center overflow-hidden bg-icon-inverse py-16 md:py-24 lg:py-32">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 lg:flex-row lg:items-center lg:gap-24 xl:gap-46">
        <LandingFeatureCopy
          icon={IcFolder}
          title={LANDING_TASK_COLUMN_SECTION.title}
          description={LANDING_TASK_COLUMN_SECTION.description}
          className="pl-6 md:pl-12 lg:pl-6"
        />

        <div className="ml-auto w-11/12 lg:ml-0 lg:w-full lg:px-6">
          <div className="grid min-w-120 grid-cols-3 items-start gap-4 md:gap-6 lg:min-w-0">
            {LANDING_TASK_COLUMN_IMAGES.map(({ alt, image }) => (
              <Image
                key={alt}
                src={image}
                alt={alt}
                className="mx-auto h-auto max-w-full rounded-lg object-contain"
                sizes="(min-width: 1024px) 270px, 30vw"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
