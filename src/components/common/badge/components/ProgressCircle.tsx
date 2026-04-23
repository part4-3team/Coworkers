'use client';
/**
 * 진행 상태를 표시하는 원형 컴포넌트입니다.
 */

import Image from 'next/image';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import ic_progress_done_large from '@/assets/icons/ic_progress_done_large.svg';
import {
  BADGE_COLORS,
  BADGE_STATUS,
  PROGRESS_CIRCLE_TRANSPARENT,
} from '@/components/common/badge/constants';
import type { ProgressCircleProps } from '@/components/common/badge/types';

export default function ProgressCircle({
  percentage,
  status,
}: ProgressCircleProps) {
  const isDone = status === BADGE_STATUS.DONE;

  const pathColor = isDone
    ? PROGRESS_CIRCLE_TRANSPARENT
    : BADGE_COLORS.ICON_PRIMARY;
  const trailColor = isDone
    ? PROGRESS_CIRCLE_TRANSPARENT
    : status === BADGE_STATUS.START
      ? BADGE_COLORS.BACKGROUND_TERTIARY
      : BADGE_COLORS.BACKGROUND_SECONDARY;

  return (
    <CircularProgressbarWithChildren
      value={percentage}
      strokeWidth={isDone ? 0 : 16}
      styles={{
        path: {
          stroke: pathColor,
          strokeLinecap: 'round',
          transition: 'stroke-dashoffset 0.5s ease 0s',
        },
        trail: {
          stroke: trailColor,
        },
      }}
    >
      {isDone && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center">
          <Image
            src={ic_progress_done_large}
            alt="완료 아이콘"
            width={16}
            height={16}
            className="object-contain"
          />
        </div>
      )}
    </CircularProgressbarWithChildren>
  );
}
