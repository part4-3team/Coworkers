/**
 * 할 일 목록(컬럼) 조회, 생성, 수정, 삭제, 순서 변경을 담당하는 훅 파일입니다.
 */

'use client';

import { useQuery } from '@tanstack/react-query';

import { taskQueryOptions } from '@/api/queryOptions';
import type { QueryKeyId, TeamScopedDateQueryParams } from '@/api/queryKeys';

type UseTaskListDetailParams = {
  params?: TeamScopedDateQueryParams;
  taskListId: QueryKeyId;
  teamId: string;
};

export function useTaskListDetail({
  params,
  taskListId,
  teamId,
}: UseTaskListDetailParams) {
  return useQuery(taskQueryOptions.taskListDetail(teamId, taskListId, params));
}
