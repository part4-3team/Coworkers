/**
 * 할 일 보드의 단일 할 일 행(체크·제목·메타·더보기)입니다.
 */

'use client';

import Image from 'next/image';

import type { TaskListBoardTask } from '@/app/(service)/[teamid]/tasklist/types';
import {
  icCalendarSmall,
  icComment,
  icMoreVerticalSmall,
  icRepeatSmall,
} from '@/assets';
import { ListDropdown } from '@/components/common/dropdown';
import TodoCheckUncheck from '@/components/common/todo/TodoCheckUncheck';
import { cn } from '@/utils/cn';

type TaskListTaskRowProps = {
  task: TaskListBoardTask;
  onToggleChecked: (id: string, checked: boolean) => void;
};

export default function TaskListTaskRow({
  task,
  onToggleChecked,
}: TaskListTaskRowProps) {
  return (
    <article
      className={cn(
        'relative flex items-start rounded-xl border border-background-tertiary bg-background-primary px-3 py-3 sm:px-4',
        task.checked && 'bg-background-secondary',
      )}
    >
      <div className="min-w-0 flex-1 pr-10 sm:pr-11">
        <div className="flex min-w-0 items-center gap-2">
          <TodoCheckUncheck
            label={task.title}
            checked={task.checked}
            onChange={(checked) => onToggleChecked(task.id, checked)}
          />
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

        <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-normal text-text-default md:mt-2.5 md:text-base">
          <span className="flex items-center gap-2">
            <Image src={icCalendarSmall} alt="" width={16} height={16} />
            {task.dueDateLabel}
          </span>
          <span aria-hidden="true" className="text-border-secondary">
            |
          </span>
          <span className="flex items-center gap-2">
            <Image src={icRepeatSmall} alt="" width={22} height={22} />
            {task.repeatLabel}
          </span>
        </div>
      </div>

      <div className="absolute right-3 top-3 z-10 sm:right-4 sm:top-3">
        <ListDropdown
          className="shrink-0"
          items={[
            {
              label: '수정하기',
              onClick: () => {
                // TODO: 할 일 수정
              },
            },
            {
              label: '삭제하기',
              onClick: () => {
                // TODO: 할 일 삭제
              },
            },
          ]}
          menuClassName="mt-1 w-30 overflow-hidden rounded-lg border border-background-tertiary py-0"
          trigger={
            <>
              <span className="sr-only">{`${task.title} 더보기`}</span>
              <span
                className="flex size-8 items-center justify-center rounded-lg"
                aria-hidden="true"
              >
                <Image
                  src={icMoreVerticalSmall}
                  alt=""
                  width={22}
                  height={22}
                />
              </span>
            </>
          }
        />
      </div>
    </article>
  );
}
