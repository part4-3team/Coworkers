/**
 * 할 일 관련 query options를 정의하는 파일입니다.
 */

import type {
  QueryKeyId,
  TaskQueryParams,
  TeamScopedDateQueryParams,
} from '@/api/queryKeys';
import { queryKeys } from '@/api/queryKeys';
import {
  createListQueryOptions,
  createQueryOptions,
  type QueryOptionsOverrides,
} from '@/api/queryOptions/factory';
import { getTaskDetail, getTaskListDetail, getTasks } from '@/api/taskApi';

type TaskDetailData = Awaited<ReturnType<typeof getTaskDetail>>;
type TasksData = Awaited<ReturnType<typeof getTasks>>;
type TaskListDetailData = Awaited<ReturnType<typeof getTaskListDetail>>;

export const taskQueryOptions = {
  detail: <TData = TaskDetailData>(
    teamId: string,
    taskListId: QueryKeyId,
    taskId: QueryKeyId,
    options?: QueryOptionsOverrides<TaskDetailData, TData>,
  ) =>
    createQueryOptions<TaskDetailData, TData>({
      options,
      queryFn: () => getTaskDetail(teamId, taskListId, taskId),
      queryKey: queryKeys.task.detail(teamId, taskId, taskListId),
    }),
  list: <TData = TasksData>(
    teamId: string,
    params: TaskQueryParams,
    options?: QueryOptionsOverrides<TasksData, TData>,
  ) =>
    createListQueryOptions<TasksData, TData>({
      options,
      queryFn: () => getTasks(teamId, params),
      queryKey: queryKeys.task.list(teamId, params),
    }),
  taskListDetail: <TData = TaskListDetailData>(
    teamId: string,
    taskListId: QueryKeyId,
    params?: TeamScopedDateQueryParams,
    options?: QueryOptionsOverrides<TaskListDetailData, TData>,
  ) =>
    createQueryOptions<TaskListDetailData, TData>({
      options,
      queryFn: () => getTaskListDetail(teamId, taskListId, params),
      queryKey: queryKeys.taskList.detail(teamId, taskListId, params),
    }),
} as const;
