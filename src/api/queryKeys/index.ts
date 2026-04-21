/**
 * 프로젝트 전역에서 재사용할 TanStack Query 키 모음입니다.
 *
 * 현재 프론트 용어 기준:
 * - `team`은 Swagger의 Group 리소스를 의미합니다.
 * - `board`는 Swagger의 Article 리소스를 의미합니다.
 */

import {
  authQueryKeys,
  imageQueryKeys,
  oauthAppQueryKeys,
  userQueryKeys,
} from '@/api/queryKeys/common';
import { boardCommentQueryKeys, boardQueryKeys } from '@/api/queryKeys/board';
import {
  commentQueryKeys,
  recurringQueryKeys,
  taskListQueryKeys,
  taskQueryKeys,
  teamQueryKeys,
} from '@/api/queryKeys/team';

export const queryKeys = {
  auth: authQueryKeys,
  board: boardQueryKeys,
  boardComment: boardCommentQueryKeys,
  comment: commentQueryKeys,
  image: imageQueryKeys,
  oauthApp: oauthAppQueryKeys,
  recurring: recurringQueryKeys,
  task: taskQueryKeys,
  taskList: taskListQueryKeys,
  team: teamQueryKeys,
  user: userQueryKeys,
} as const;

export {
  authQueryKeys,
  boardCommentQueryKeys,
  boardQueryKeys,
  commentQueryKeys,
  imageQueryKeys,
  oauthAppQueryKeys,
  recurringQueryKeys,
  taskListQueryKeys,
  taskQueryKeys,
  teamQueryKeys,
  userQueryKeys,
};

export type {
  BoardListQueryParams,
  CompletedTaskHistoryQueryParams,
  CursorPaginationQueryParams,
  DateRangeQueryParams,
  OffsetPaginationQueryParams,
  QueryKeyId,
  QueryParams,
  TaskListQueryParams,
  TaskQueryParams,
  TeamScopedDateQueryParams,
} from '@/api/queryKeys/types';
