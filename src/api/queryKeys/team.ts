/**
 * 팀(백엔드 Group), 할 일 목록, 할 일, 반복 일정, 댓글 쿼리 키 모음입니다.
 *
 * 이 파일은 아래 구현에서 자주 봅니다.
 * - 팀 메인 / 할 일 리스트 조회 hook을 만들 때
 * - 할 일 댓글, 반복 일정 mutation 후 어떤 범위를 다시 받아와야 할지 정할 때
 * - task / taskList / recurring / comment 범위를 나눌 때
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

/**
 * 팀 자체와 팀 하위 리소스(초대, 멤버, 멤버십, 날짜별 할 일) 키입니다.
 *
 * 예:
 * - 팀 상세 -> `detail`
 * - 팀 멤버 목록 -> `members`
 * - 팀 초대 목록 -> `invitations`
 */
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

/**
 * 할 일 목록(컬럼) 관련 키입니다.
 *
 * 예:
 * - 특정 할 일 목록 상세 -> `detail`
 * - 목록 전체 재조회 -> `lists`
 */
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

/**
 * 개별 할 일 관련 키입니다.
 *
 * 예:
 * - 날짜/조건별 할 일 목록 -> `list`
 * - 할 일 상세 하나 -> `detail`
 * - 할 일 mutation 후 전체 할 일 목록 범위 무효화 -> `lists`
 */
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

/**
 * 반복 일정 관련 키입니다.
 *
 * 반복 일정 생성/수정/삭제 후에는 보통
 * `task`, `taskList`, `recurring` 쪽을 같이 다시 받아오게 됩니다.
 */
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

/**
 * 할 일 댓글 관련 키입니다.
 *
 * `task(teamId, taskId)`는
 * "이 할 일에 달린 댓글 전체"를 의미하는 중간 범위 키라서
 * 댓글 mutation 후 refetch 범위를 잡을 때 자주 사용합니다.
 */
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
  task: (teamId: string, taskId: QueryKeyId) =>
    createTeamScopeQueryKey(teamId, QUERY_KEY_RESOURCES.COMMENTS, taskId),
  infiniteList: (
    teamId: string,
    taskId: QueryKeyId,
    params?: CursorPaginationQueryParams,
  ) =>
    withQueryParams(
      createTeamScopeQueryKey(
        teamId,
        QUERY_KEY_RESOURCES.COMMENTS,
        taskId,
        QUERY_KEY_SEGMENTS.INFINITE_LIST,
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
        taskId,
        QUERY_KEY_SEGMENTS.LIST,
      ),
      params,
    ),
} as const;
