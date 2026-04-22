/**
 * 마이 히스토리의 월 이동 헤더를 렌더링하는 컴포넌트입니다.
 */

import Image from 'next/image';

import {
  icCalendarCircleLarge,
  icChevronLeftCircle,
  icChevronRightCircle,
} from '@/assets';
import { MY_HISTORY_MONTH } from '@/app/(service)/myhistory/constants';

export default function HistoryMonthNavigator() {
  return (
    <div className="relative flex items-center justify-center">
      <div className="flex items-center gap-4">
        <button
          type="button"
          aria-label="이전 달 보기"
          className="flex size-7 items-center justify-center rounded-lg"
        >
          <Image src={icChevronLeftCircle} alt="" width={24} height={24} />
        </button>

        <p className="text-lg font-bold text-text-primary md:text-xl">
          {MY_HISTORY_MONTH}
        </p>

        <button
          type="button"
          aria-label="다음 달 보기"
          className="flex size-7 items-center justify-center rounded-lg"
        >
          <Image src={icChevronRightCircle} alt="" width={24} height={24} />
        </button>
      </div>

      <button
        type="button"
        aria-label="날짜 선택"
        className="absolute right-0 flex size-10 items-center justify-center rounded-lg"
      >
        <Image src={icCalendarCircleLarge} alt="" width={32} height={32} />
      </button>
    </div>
  );
}
