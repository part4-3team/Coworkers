import type { TaskListSelectDropdownItem } from '@/app/(service)/[teamid]/tasklist/components/TaskListSelectDropdown';
import type { TaskListCreateTaskRepeatValue } from '@/app/(service)/[teamid]/tasklist/types';
import { cn } from '@/utils/cn';

/** 메인 제목·폼 소제목 공통 (요소 종류와 관계없이 동일 렌더링) */
export const MODAL_HEADING_TYPO = cn(
  'm-0 block text-base font-medium leading-[19px] tracking-normal text-[#1E293B]',
);

export const DATE_TIME_TRIGGER_CLASS = cn(
  'flex h-11 w-full min-w-0 items-center rounded-xl border border-background-tertiary bg-background-primary px-4 text-left text-sm font-medium text-text-primary',
  'md:h-12 md:text-base',
);

/** 모바일: 필드 전체 너비. md+: 피그마 고정 너비 */
export const REPEAT_TRIGGER_LAYOUT_CLASS = 'block w-full md:w-50 md:min-w-50';

export const TASK_LIST_CREATE_TASK_REPEAT_ITEMS: TaskListSelectDropdownItem<TaskListCreateTaskRepeatValue>[] =
  [
    { value: 'once', label: '반복 안함' },
    { value: 'daily', label: '매일' },
    { value: 'monthly', label: '매월' },
    { value: 'weekly', label: '주 반복' },
  ];
