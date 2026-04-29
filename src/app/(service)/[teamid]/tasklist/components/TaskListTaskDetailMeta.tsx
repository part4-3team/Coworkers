'use client';

import Image from 'next/image';

import { icCalendarSmall, icRepeatSmall, icUserLarge } from '@/assets';

type TaskListTaskDetailMetaProps = {
  assigneeName: string;
  frequency: string;
  startedAtLabel: string;
};

export default function TaskListTaskDetailMeta({
  assigneeName,
  frequency,
  startedAtLabel,
}: TaskListTaskDetailMetaProps) {
  return (
    <div>
      <div className="flex items-center gap-2.5">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-background-tertiary md:size-9">
          <Image src={icUserLarge} alt="" width={20} height={20} />
        </span>
        <span className="text-sm font-semibold text-text-primary md:text-base">
          {assigneeName}
        </span>
      </div>

      <dl className="mt-4 flex flex-col gap-2.5 text-sm font-medium text-text-default md:gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <Image
            src={icCalendarSmall}
            alt=""
            width={16}
            height={16}
            className="size-4 shrink-0"
          />
          <dt>시작 날짜</dt>
          <dd className="text-text-secondary">{startedAtLabel}</dd>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Image
            src={icRepeatSmall}
            alt=""
            width={20}
            height={20}
            className="size-4 shrink-0"
          />
          <dt>반복 설정</dt>
          <dd className="text-text-secondary">{frequency}</dd>
        </div>
      </dl>
    </div>
  );
}
