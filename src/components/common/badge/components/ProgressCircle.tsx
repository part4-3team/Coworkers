'use client';
/**
 * 진행 상태를 표시하는 원형 컴포넌트입니다.
 */

import {
  CircularProgressbarWithChildren,
  buildStyles,
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import ic_progress_done_large from '@/assets/icons/ic_progress_done_large.svg';
import type { ProgressCircleProps } from '@/components/common/badge/types';
import Image from 'next/image';

export default function ProgressCircle({
  percentage,
  status,
}: ProgressCircleProps) {
  const isDone = status === 'done';

  const pathColor = isDone ? 'transparent' : 'bg-background-tertiary';
  const trailColor = isDone ? 'transparent' : 'bg-icon-primary';

  return (
    <CircularProgressbarWithChildren
      value={percentage}
      strokeWidth={isDone ? 0 : 16}
      styles={buildStyles({
        pathColor,
        trailColor,
        strokeLinecap: 'round',
        pathTransitionDuration: 0.5,
      })}
    >
      {isDone && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center">
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
