/**
 * 할 일과 할 일 목록 생성, 수정, 삭제, 완료 처리 API를 정의하는 파일입니다.
 */

import { apiClient, teamEndpoint } from '@/api/apiClient';
import { buildQueryString } from '@/api/buildQueryString';
import type {
  QueryKeyId,
  QueryParams,
  TaskQueryParams,
  TeamScopedDateQueryParams,
} from '@/api/queryKeys';

type RecurringBody = QueryParams;

export async function getTaskListDetail(
  groupId: QueryKeyId,
  taskListId: QueryKeyId,
  params?: TeamScopedDateQueryParams,
) {
  const endpoint = `${teamEndpoint(
    `/groups/${groupId}/task-lists/${taskListId}`,
  )}${buildQueryString(params)}`;

  return apiClient<unknown>(endpoint);
}

export async function getTasks(groupId: QueryKeyId, params: TaskQueryParams) {
  const { taskListId, ...queryParams } = params;

  if (!taskListId) {
    throw new Error('taskListId is required.');
  }

  const endpoint = `${teamEndpoint(
    `/groups/${groupId}/task-lists/${taskListId}/tasks`,
  )}${buildQueryString(queryParams)}`;

  return apiClient<unknown>(endpoint);
}

export async function getTaskDetail(
  groupId: QueryKeyId,
  taskListId: QueryKeyId,
  taskId: QueryKeyId,
) {
  return apiClient<unknown>(
    teamEndpoint(`/groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}`),
  );
}

export async function createRecurring(
  groupId: QueryKeyId,
  taskListId: QueryKeyId,
  body: RecurringBody,
  token?: string,
) {
  return apiClient<unknown>(
    teamEndpoint(`/groups/${groupId}/task-lists/${taskListId}/recurring`),
    {
      body: JSON.stringify(body),
      method: 'POST',
      token,
    },
  );
}

export async function updateRecurring(
  groupId: QueryKeyId,
  taskListId: QueryKeyId,
  recurringId: QueryKeyId,
  body: RecurringBody,
  token?: string,
) {
  return apiClient<unknown>(
    teamEndpoint(
      `/groups/${groupId}/task-lists/${taskListId}/recurring/${recurringId}`,
    ),
    {
      body: JSON.stringify(body),
      method: 'PATCH',
      token,
    },
  );
}

export async function deleteRecurring(
  groupId: QueryKeyId,
  taskListId: QueryKeyId,
  taskId: QueryKeyId,
  recurringId: QueryKeyId,
  token?: string,
) {
  return apiClient<unknown>(
    teamEndpoint(
      `/groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}/recurring/${recurringId}`,
    ),
    {
      method: 'DELETE',
      token,
    },
  );
}
