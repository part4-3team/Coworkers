/**
 * 할 일 목록 컬럼(제목·목록·추가 버튼)입니다.
 */

'use client';

import { useState } from 'react';

import TaskListNavItem from '@/app/(service)/[teamid]/tasklist/components/TaskListNavItem';
import { TASK_LIST_COLUMN_MOCK } from '@/app/(service)/[teamid]/tasklist/constants';
import { cn } from '@/utils/cn';

/** Anima/Figma: 16×16, stroke는 부모 `text-brand-primary`(currentColor)와 동일 */
function AddTaskListPlusIcon({ className }: { className?: string }) {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('shrink-0', className)}
      aria-hidden
    >
      <path
        d="M4 8H12.5"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
      />
      <path
        d="M8.25 12.25V3.75"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </svg>
  );
}

type TaskListSidebarProps = {
  className?: string;
};

export default function TaskListSidebar({ className }: TaskListSidebarProps) {
  const [activeId, setActiveId] = useState<string>(
    TASK_LIST_COLUMN_MOCK[1]?.id ?? TASK_LIST_COLUMN_MOCK[0]?.id ?? '',
  );

  return (
    <section
      className={cn('flex w-full max-w-[270px] shrink-0 flex-col', className)}
      aria-label="할 일 목록"
    >
      <h2 className="text-xl font-bold leading-6 text-text-primary">
        할 일 목록
      </h2>
      <ul className="m-0 mt-6 flex w-full list-none flex-col gap-2 p-0">
        {TASK_LIST_COLUMN_MOCK.map((item) => (
          <TaskListNavItem
            key={item.id}
            item={item}
            isActive={item.id === activeId}
            onSelect={() => setActiveId(item.id)}
          />
        ))}
      </ul>
      <button
        type="button"
        aria-label="할 일 목록 추가"
        className={cn(
          // Figma: 143×40 (할 일 목록 추가)
          'mx-auto mt-10 inline-flex h-10 w-[143px] shrink-0 items-center justify-center',
          'rounded-[40px] border border-solid border-brand-primary bg-background-inverse',
          'px-0 text-sm font-medium leading-[17px] text-brand-primary',
          'transition-colors hover:bg-brand-secondary',
        )}
        onClick={() => {
          // TODO: 할 일 목록 추가 모달
        }}
      >
        <span className="inline-flex items-center justify-center gap-1">
          <AddTaskListPlusIcon className="size-4" />
          <span className="whitespace-nowrap">할 일 목록 추가</span>
        </span>
      </button>
    </section>
  );
}
