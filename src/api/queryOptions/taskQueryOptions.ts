/**
 * 할 일 관련 query options를 정의하는 파일입니다.
 */

import { getTaskDetail, getTaskListDetail, getTasks } from '@/api/taskApi';
import {
  createListQueryOptions,
  createQueryOptions,
} from '@/api/queryOptions/factory';
import type {
  QueryKeyId,
  TaskQueryParams,
  TeamScopedDateQueryParams,
} from '@/api/queryKeys';
import { queryKeys } from '@/api/queryKeys';

export const taskQueryOptions = {
  detail: (teamId: string, taskListId: QueryKeyId, taskId: QueryKeyId) =>
    createQueryOptions({
      queryFn: () => getTaskDetail(teamId, taskListId, taskId),
      queryKey: queryKeys.task.detail(teamId, taskId, taskListId),
    }),
  list: (teamId: string, params: TaskQueryParams) =>
    createListQueryOptions({
      queryFn: () => getTasks(teamId, params),
      queryKey: queryKeys.task.list(teamId, params),
    }),
  taskListDetail: (
    teamId: string,
    taskListId: QueryKeyId,
    params?: TeamScopedDateQueryParams,
  ) =>
    createQueryOptions({
      queryFn: () => getTaskListDetail(teamId, taskListId, params),
      queryKey: queryKeys.taskList.detail(teamId, taskListId, params),
    }),
} as const;
