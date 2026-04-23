/**
 * 팀(백엔드 Group), 할 일 목록, 할 일, 반복 일정, 댓글 쿼리 키를 정의합니다.
 */

import {
  QUERY_KEY_RESOURCES,
  QUERY_KEY_SEGMENTS,
} from '@/api/queryKeys/constants';
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

const teamsResourceQueryKeys = createResourceQueryKeys([
  QUERY_KEY_RESOURCES.TEAMS,
] as const);

export const teamQueryKeys = {
  ...teamsResourceQueryKeys,
  detail: (teamId: string) => createTeamScopeQueryKey(teamId),
  invitations: (teamId: string, params?: QueryParams) =>
    withQueryParams(
      createTeamScopeQueryKey(
        teamId,
        QUERY_KEY_RESOURCES.INVITATIONS,
        QUERY_KEY_SEGMENTS.LIST,
      ),
      params,
    ),
  members: (teamId: string, params?: QueryParams) =>
    withQueryParams(
      createTeamScopeQueryKey(
        teamId,
        QUERY_KEY_RESOURCES.MEMBERS,
        QUERY_KEY_SEGMENTS.LIST,
      ),
      params,
    ),
  memberships: (teamId: string, params?: QueryParams) =>
    withQueryParams(
      createTeamScopeQueryKey(
        teamId,
        QUERY_KEY_RESOURCES.MEMBERSHIPS,
        QUERY_KEY_SEGMENTS.LIST,
      ),
      params,
    ),
  tasksByDate: (teamId: string, params: TeamScopedDateQueryParams) =>
    withQueryParams(
      createTeamScopeQueryKey(teamId, QUERY_KEY_RESOURCES.TASKS_BY_DATE),
      params,
    ),
} as const;

export const taskListQueryKeys = {
  all: (teamId: string) =>
    createTeamResourceQueryKeys(teamId, QUERY_KEY_RESOURCES.TASK_LISTS).all,
  detail: (
    teamId: string,
    taskListId: QueryKeyId,
    params?: TeamScopedDateQueryParams,
  ) =>
    withQueryParams(
      createTeamResourceQueryKeys(
        teamId,
        QUERY_KEY_RESOURCES.TASK_LISTS,
      ).detail(taskListId),
      params,
    ),
  infiniteList: (teamId: string, params?: TaskListQueryParams) =>
    createTeamResourceQueryKeys(
      teamId,
      QUERY_KEY_RESOURCES.TASK_LISTS,
    ).infiniteList(params),
  list: (teamId: string, params?: TaskListQueryParams) =>
    createTeamResourceQueryKeys(teamId, QUERY_KEY_RESOURCES.TASK_LISTS).list(
      params,
    ),
  lists: (teamId: string) =>
    createTeamResourceQueryKeys(teamId, QUERY_KEY_RESOURCES.TASK_LISTS).lists(),
} as const;

export const taskQueryKeys = {
  all: (teamId: string) =>
    createTeamResourceQueryKeys(teamId, QUERY_KEY_RESOURCES.TASKS).all,
  detail: (teamId: string, taskId: QueryKeyId, taskListId?: QueryKeyId) =>
    withQueryParams(
      createTeamResourceQueryKeys(teamId, QUERY_KEY_RESOURCES.TASKS).detail(
        taskId,
      ),
      taskListId ? { taskListId } : undefined,
    ),
  infiniteList: (teamId: string, params?: TaskQueryParams) =>
    createTeamResourceQueryKeys(teamId, QUERY_KEY_RESOURCES.TASKS).infiniteList(
      params,
    ),
  list: (teamId: string, params?: TaskQueryParams) =>
    createTeamResourceQueryKeys(teamId, QUERY_KEY_RESOURCES.TASKS).list(params),
  lists: (teamId: string) =>
    createTeamResourceQueryKeys(teamId, QUERY_KEY_RESOURCES.TASKS).lists(),
} as const;

export const recurringQueryKeys = {
  all: (teamId: string) =>
    createTeamResourceQueryKeys(teamId, QUERY_KEY_RESOURCES.RECURRINGS).all,
  detail: (teamId: string, recurringId: QueryKeyId) =>
    createTeamResourceQueryKeys(teamId, QUERY_KEY_RESOURCES.RECURRINGS).detail(
      recurringId,
    ),
  infiniteList: (teamId: string, params?: QueryParams) =>
    createTeamResourceQueryKeys(
      teamId,
      QUERY_KEY_RESOURCES.RECURRINGS,
    ).infiniteList(params),
  list: (teamId: string, params?: QueryParams) =>
    createTeamResourceQueryKeys(teamId, QUERY_KEY_RESOURCES.RECURRINGS).list(
      params,
    ),
  lists: (teamId: string) =>
    createTeamResourceQueryKeys(teamId, QUERY_KEY_RESOURCES.RECURRINGS).lists(),
} as const;

export const commentQueryKeys = {
  all: (teamId: string) =>
    createTeamScopeQueryKey(teamId, QUERY_KEY_RESOURCES.COMMENTS),
  detail: (teamId: string, commentId: QueryKeyId) =>
    createTeamScopeQueryKey(
      teamId,
      QUERY_KEY_RESOURCES.COMMENTS,
      QUERY_KEY_SEGMENTS.DETAIL,
      commentId,
    ),
  infiniteList: (
    teamId: string,
    taskId: QueryKeyId,
    params?: CursorPaginationQueryParams,
  ) =>
    withQueryParams(
      createTeamScopeQueryKey(
        teamId,
        QUERY_KEY_RESOURCES.COMMENTS,
        QUERY_KEY_SEGMENTS.INFINITE_LIST,
        taskId,
      ),
      params,
    ),
  list: (
    teamId: string,
    taskId: QueryKeyId,
    params?: CursorPaginationQueryParams,
  ) =>
    withQueryParams(
      createTeamScopeQueryKey(
        teamId,
        QUERY_KEY_RESOURCES.COMMENTS,
        QUERY_KEY_SEGMENTS.LIST,
        taskId,
      ),
      params,
    ),
} as const;
