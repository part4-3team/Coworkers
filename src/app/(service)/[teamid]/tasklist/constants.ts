/**
 * 할 일 목록 컬럼 목업 데이터입니다.
 * API 연결 후 제거하거나 fetch 결과로 교체합니다.
 */

import type {
  TaskListBoardTask,
  TaskListColumnItem,
} from '@/app/(service)/[teamid]/tasklist/types';

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

/** 보드 영역 목업(할 일 행). API 연결 후 교체합니다. */
export const TASK_LIST_BOARD_MOCK: TaskListBoardTask[] = [
  {
    id: 't1',
    title: '법인 설립 안내 드리기',
    checked: true,
    commentCount: 3,
    dueDateLabel: '2024년 7월 29일',
    repeatLabel: '매일 반복',
    sortOrder: 0,
  },
  {
    id: 't2',
    title: '법인 설립 혹은 변경 등기 비용 안내 드리기',
    checked: false,
    commentCount: 3,
    dueDateLabel: '2024년 7월 29일',
    repeatLabel: '매일 반복',
    sortOrder: 1,
  },
  {
    id: 't3',
    title: '법인 설립 혹은 변경 등기 비용 안내 드리기',
    checked: false,
    commentCount: 3,
    dueDateLabel: '2024년 7월 29일',
    repeatLabel: '매일 반복',
    sortOrder: 2,
  },
  {
    id: 't4',
    title: '법인 설립 혹은 변경 등기 비용 안내 드리기',
    checked: false,
    commentCount: 3,
    dueDateLabel: '2024년 7월 29일',
    repeatLabel: '매일 반복',
    sortOrder: 3,
  },
  {
    id: 't5',
    title: '법인 설립 혹은 변경 등기 비용 안내 드리기',
    checked: false,
    commentCount: 3,
    dueDateLabel: '2024년 7월 29일',
    repeatLabel: '매일 반복',
    sortOrder: 4,
  },
  {
    id: 't6',
    title: '법인 설립 혹은 변경 등기 비용 안내 드리기',
    checked: false,
    commentCount: 3,
    dueDateLabel: '2024년 7월 29일',
    repeatLabel: '매일 반복',
    sortOrder: 5,
  },
];
