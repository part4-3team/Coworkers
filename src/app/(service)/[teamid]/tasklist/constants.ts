/**
 * 할 일 목록 컬럼 목업 데이터입니다.
 * API 연결 후 제거하거나 fetch 결과로 교체합니다.
 */

import type {
  TaskListBoardTask,
  TaskListColumnItem,
  TaskListTaskComment,
} from '@/app/(service)/[teamid]/tasklist/types';

/** 목업 로그인 사용자(댓글 `author`와 비교). API 연동 시 세션 등으로 교체합니다. */
export const TASK_LIST_DETAIL_CURRENT_USER_NAME = '안하나';

const TASK_LIST_COMMENTS_MOCK: TaskListTaskComment[] = [
  {
    id: 'c1',
    author: '안하나',
    content: '법인 설립 서비스 관련 링크 첨부 드려요... https://www.codeit.kr',
    meta: '2024.07.29 14:20',
  },
  {
    id: 'c2',
    author: '김다혜',
    content: '확인했습니다. 감사합니다.',
    meta: '2024.07.29 15:02',
  },
  {
    id: 'c3',
    author: '이연지',
    content: '내일까지 검토 부탁드려요.',
    meta: '2024.07.29 16:41',
  },
];

const cloneTaskListComments = (): TaskListTaskComment[] =>
  TASK_LIST_COMMENTS_MOCK.map((comment) => ({ ...comment }));

const taskListBoardDetailDefaults = (): Pick<
  TaskListBoardTask,
  'assigneeName' | 'description' | 'startedAtLabel' | 'comments'
> => ({
  assigneeName: '안혜나',
  description:
    '필수 정보 10분 입력하면 3일 만에 법인 설립이 완료되는 법인 설립 서비스의 장점에 대해 상세하게 설명드리기',
  startedAtLabel: '2024년 7월 29일 오후 3:30',
  comments: cloneTaskListComments(),
});

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
    commentCount: TASK_LIST_COMMENTS_MOCK.length,
    dueDateLabel: '2024년 7월 29일',
    repeatLabel: '매일 반복',
    sortOrder: 0,
    ...taskListBoardDetailDefaults(),
  },
  {
    id: 't2',
    title: '법인 설립 혹은 변경 등기 비용 안내 드리기',
    checked: false,
    commentCount: TASK_LIST_COMMENTS_MOCK.length,
    dueDateLabel: '2024년 7월 29일',
    repeatLabel: '매일 반복',
    sortOrder: 1,
    ...taskListBoardDetailDefaults(),
  },
  {
    id: 't3',
    title: '법인 설립 혹은 변경 등기 비용 안내 드리기',
    checked: false,
    commentCount: TASK_LIST_COMMENTS_MOCK.length,
    dueDateLabel: '2024년 7월 29일',
    repeatLabel: '매일 반복',
    sortOrder: 2,
    ...taskListBoardDetailDefaults(),
  },
  {
    id: 't4',
    title: '법인 설립 혹은 변경 등기 비용 안내 드리기',
    checked: false,
    commentCount: TASK_LIST_COMMENTS_MOCK.length,
    dueDateLabel: '2024년 7월 29일',
    repeatLabel: '매일 반복',
    sortOrder: 3,
    ...taskListBoardDetailDefaults(),
  },
  {
    id: 't5',
    title: '법인 설립 혹은 변경 등기 비용 안내 드리기',
    checked: false,
    commentCount: TASK_LIST_COMMENTS_MOCK.length,
    dueDateLabel: '2024년 7월 29일',
    repeatLabel: '매일 반복',
    sortOrder: 4,
    ...taskListBoardDetailDefaults(),
  },
  {
    id: 't6',
    title: '법인 설립 혹은 변경 등기 비용 안내 드리기',
    checked: false,
    commentCount: TASK_LIST_COMMENTS_MOCK.length,
    dueDateLabel: '2024년 7월 29일',
    repeatLabel: '매일 반복',
    sortOrder: 5,
    ...taskListBoardDetailDefaults(),
  },
];
