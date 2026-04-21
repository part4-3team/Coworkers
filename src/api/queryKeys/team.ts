/**
 * 팀(백엔드 Group), 할 일 목록, 할 일, 반복 일정, 댓글 쿼리 키를 정의합니다.
 */

import {
  createResourceQueryKeys,
  createTeamResourceQueryKeys,
  createTeamScopeQueryKey,
  withQueryParams,
} from '@/api/queryKeys/factory';
import type {
  CursorPaginationQueryParams,
  QueryKeyId,
  QueryParams,
  TaskListQueryParams,
  TaskQueryParams,
  TeamScopedDateQueryParams,
} from '@/api/queryKeys/types';

const teamsResourceQueryKeys = createResourceQueryKeys(['teams'] as const);

export const teamQueryKeys = {
  ...teamsResourceQueryKeys,
  detail: (teamId: string) => createTeamScopeQueryKey(teamId),
  invitations: (teamId: string, params?: QueryParams) =>
    withQueryParams(
      createTeamScopeQueryKey(teamId, 'invitations', 'list'),
      params,
    ),
  members: (teamId: string, params?: QueryParams) =>
    withQueryParams(createTeamScopeQueryKey(teamId, 'members', 'list'), params),
  memberships: (teamId: string, params?: QueryParams) =>
    withQueryParams(
      createTeamScopeQueryKey(teamId, 'memberships', 'list'),
      params,
    ),
  tasksByDate: (teamId: string, params: TeamScopedDateQueryParams) =>
    withQueryParams(createTeamScopeQueryKey(teamId, 'tasksByDate'), params),
} as const;

export const taskListQueryKeys = {
  all: (teamId: string) => createTeamResourceQueryKeys(teamId, 'taskLists').all,
  detail: (
    teamId: string,
    taskListId: QueryKeyId,
    params?: TeamScopedDateQueryParams,
  ) =>
    withQueryParams(
      createTeamResourceQueryKeys(teamId, 'taskLists').detail(taskListId),
      params,
    ),
  infiniteList: (teamId: string, params?: TaskListQueryParams) =>
    createTeamResourceQueryKeys(teamId, 'taskLists').infiniteList(params),
  list: (teamId: string, params?: TaskListQueryParams) =>
    createTeamResourceQueryKeys(teamId, 'taskLists').list(params),
  lists: (teamId: string) =>
    createTeamResourceQueryKeys(teamId, 'taskLists').lists(),
} as const;

export const taskQueryKeys = {
  all: (teamId: string) => createTeamResourceQueryKeys(teamId, 'tasks').all,
  detail: (teamId: string, taskId: QueryKeyId, taskListId?: QueryKeyId) =>
    withQueryParams(
      createTeamResourceQueryKeys(teamId, 'tasks').detail(taskId),
      taskListId ? { taskListId } : undefined,
    ),
  infiniteList: (teamId: string, params?: TaskQueryParams) =>
    createTeamResourceQueryKeys(teamId, 'tasks').infiniteList(params),
  list: (teamId: string, params?: TaskQueryParams) =>
    createTeamResourceQueryKeys(teamId, 'tasks').list(params),
  lists: (teamId: string) =>
    createTeamResourceQueryKeys(teamId, 'tasks').lists(),
} as const;

export const recurringQueryKeys = {
  all: (teamId: string) =>
    createTeamResourceQueryKeys(teamId, 'recurrings').all,
  detail: (teamId: string, recurringId: QueryKeyId) =>
    createTeamResourceQueryKeys(teamId, 'recurrings').detail(recurringId),
  infiniteList: (teamId: string, params?: QueryParams) =>
    createTeamResourceQueryKeys(teamId, 'recurrings').infiniteList(params),
  list: (teamId: string, params?: QueryParams) =>
    createTeamResourceQueryKeys(teamId, 'recurrings').list(params),
  lists: (teamId: string) =>
    createTeamResourceQueryKeys(teamId, 'recurrings').lists(),
} as const;

export const commentQueryKeys = {
  all: (teamId: string) => createTeamScopeQueryKey(teamId, 'comments'),
  detail: (teamId: string, commentId: QueryKeyId) =>
    createTeamScopeQueryKey(teamId, 'comments', 'detail', commentId),
  infiniteList: (
    teamId: string,
    taskId: QueryKeyId,
    params?: CursorPaginationQueryParams,
  ) =>
    withQueryParams(
      createTeamScopeQueryKey(teamId, 'comments', 'infiniteList', taskId),
      params,
    ),
  list: (
    teamId: string,
    taskId: QueryKeyId,
    params?: CursorPaginationQueryParams,
  ) =>
    withQueryParams(
      createTeamScopeQueryKey(teamId, 'comments', 'list', taskId),
      params,
    ),
} as const;
