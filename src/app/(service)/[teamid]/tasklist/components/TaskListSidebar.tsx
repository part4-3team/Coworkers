/**
 * 할 일 목록 컬럼(제목·목록·추가 버튼)입니다.
 * lg 미만: 드롭다운과 추가 버튼을 한 줄(justify-between). 모바일 180×44 드롭다운.
 * lg 이상: 카드 목록 + 143×40 추가 버튼.
 */

'use client';

import { useState } from 'react';

import TaskListColumnDropdown from '@/app/(service)/[teamid]/tasklist/components/TaskListColumnDropdown';
import TaskListNavItem from '@/app/(service)/[teamid]/tasklist/components/TaskListNavItem';
import { TASK_LIST_COLUMN_MOCK } from '@/app/(service)/[teamid]/tasklist/constants';
import { cn } from '@/utils/cn';

/** 16×16, stroke = currentColor (brand) */
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

const addButtonDesktop = cn(
  'mx-auto mt-10 inline-flex h-10 w-35.75 shrink-0 items-center justify-center',
  'rounded-[40px] border border-solid border-brand-primary bg-background-inverse',
  'px-0 text-sm font-medium leading-4.25 text-brand-primary',
  'transition-colors hover:bg-brand-secondary',
);

const addButtonCompact = cn(
  'inline-flex h-10 w-28 shrink-0 flex-row items-center justify-center',
  'rounded-[40px] border border-solid border-brand-primary bg-background-inverse',
  'py-3.5 pl-4 pr-5 text-sm font-medium leading-4.25 text-brand-primary',
  'shadow-[0_15px_50px_-12px_rgba(0,0,0,0.05)]',
  'transition-colors hover:bg-brand-secondary',
);

type TaskListSidebarProps = {
  className?: string;
};

export default function TaskListSidebar({ className }: TaskListSidebarProps) {
  const [activeId, setActiveId] = useState<string>(
    TASK_LIST_COLUMN_MOCK[1]?.id ?? TASK_LIST_COLUMN_MOCK[0]?.id ?? '',
  );

  return (
    <section
      className={cn(
        'flex w-full min-w-0 max-w-full flex-col lg:max-w-67.5 lg:shrink-0',
        className,
      )}
      aria-label="할 일 목록"
    >
      <div className="flex flex-col lg:hidden">
        <p className="text-xs font-normal leading-4 text-text-default md:text-base md:leading-5">
          할 일
        </p>
        <div className="mt-2 flex min-w-0 w-full flex-row items-center justify-between gap-2">
          <TaskListColumnDropdown
            items={TASK_LIST_COLUMN_MOCK}
            activeId={activeId}
            onSelect={setActiveId}
            className="min-w-0 shrink-0"
          />
          <button
            type="button"
            aria-label="할 일 추가"
            className={addButtonCompact}
            onClick={() => {
              // TODO: 할 일 목록 추가 모달
            }}
          >
            <span className="inline-flex items-center justify-center gap-1">
              <AddTaskListPlusIcon className="size-4" />
              <span className="whitespace-nowrap">할 일 추가</span>
            </span>
          </button>
        </div>
      </div>

      <div className="hidden w-full min-w-0 flex-col lg:flex">
        <h2 className="text-lg font-bold leading-6 text-text-primary md:text-xl">
          할 일 목록
        </h2>
        <ul className="m-0 mt-4 flex w-full list-none flex-col gap-2 p-0 md:mt-6">
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
          className={addButtonDesktop}
          onClick={() => {
            // TODO: 할 일 목록 추가 모달
          }}
        >
          <span className="inline-flex items-center justify-center gap-1">
            <AddTaskListPlusIcon className="size-4" />
            <span className="whitespace-nowrap">할 일 목록 추가</span>
          </span>
        </button>
      </div>
    </section>
  );
}
