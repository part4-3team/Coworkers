'use client';

import { MODAL_HEADING_TYPO } from '@/app/(service)/[teamid]/tasklist/createTaskModalConstants';
import { cn } from '@/utils/cn';

export default function TaskListCreateTaskModalIntro() {
  return (
    <div className="mx-auto flex w-full max-w-70 flex-col items-center gap-3 px-1 md:max-w-none md:w-[227px] md:gap-4 md:px-0">
      <p className={cn(MODAL_HEADING_TYPO, 'text-center')}>할 일 만들기</p>
      <p className="text-center text-sm font-medium leading-[17px] text-[#64748B]">
        할 일은 실제로 행동 가능한 작업 중심으로
        <br />
        작성해주시면 좋습니다.
      </p>
    </div>
  );
}
