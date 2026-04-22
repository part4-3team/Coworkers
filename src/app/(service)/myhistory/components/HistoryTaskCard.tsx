/**
 * 완료된 히스토리 할 일 카드 한 개를 렌더링하는 컴포넌트입니다.
 */

import Image from 'next/image';

import {
  icCalendarSmall,
  icCheckboxCheckedSmall,
  icComment,
  icMoreVerticalSmall,
  icRepeatSmall,
} from '@/assets';
import type { MyHistoryTask } from '@/app/(service)/myhistory/types';

type HistoryTaskCardProps = {
  task: MyHistoryTask;
};

export default function HistoryTaskCard({ task }: HistoryTaskCardProps) {
  return (
    <article className="flex items-center rounded-lg bg-background-secondary px-3.5 py-3">
      <div className="min-w-0 flex-1">
        <div className="flex min-w-0 items-center gap-2">
          <Image
            src={icCheckboxCheckedSmall}
            alt=""
            width={22}
            height={22}
            className="size-5.5 shrink-0"
          />
          <span className="truncate text-sm font-medium text-interaction-inactive line-through md:text-base">
            {task.title}
          </span>
          <span className="flex shrink-0 items-center gap-1 text-sm font-medium text-text-default md:text-base">
            <Image
              src={icComment}
              alt=""
              width={22}
              height={22}
              className="size-5.5"
            />
            {task.commentCount}
          </span>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-normal text-text-default md:mt-2.5 md:text-base 2xl:mt-2">
          <span className="flex items-center gap-2">
            <Image src={icCalendarSmall} alt="" width={16} height={16} />
            {task.dueDate}
          </span>
          <span aria-hidden="true">|</span>
          <span className="flex items-center gap-2">
            <Image src={icRepeatSmall} alt="" width={22} height={22} />
            {task.frequency}
          </span>
        </div>
      </div>

      <button
        type="button"
        aria-label={`${task.title} 더보기`}
        className="ml-3 flex size-8 shrink-0 items-center justify-center rounded-lg"
      >
        <Image src={icMoreVerticalSmall} alt="" width={22} height={22} />
      </button>
    </article>
  );
}
