/**
 * 할 일 목록 컬럼 목업 데이터입니다.
 * API 연결 후 제거하거나 fetch 결과로 교체합니다.
 */

import type { TaskListColumnItem } from '@/app/(service)/[teamid]/tasklist/types';

export const TASK_LIST_COLUMN_MOCK: TaskListColumnItem[] = [
  {
    id: 'corporation-establishment',
    title: '법인 설립',
    completed: 3,
    total: 5,
  },
  {
    id: 'corporation-registration',
    title: '법인 등기',
    completed: 3,
    total: 5,
  },
  {
    id: 'regular-shareholders-meeting',
    title: '정기 주총',
    completed: 3,
    total: 5,
  },
];
