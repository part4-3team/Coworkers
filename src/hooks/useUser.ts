/**
 * 내 정보, 멤버십, 완료한 할 일 이력 등 사용자 범위 서버 상태를 관리하는 훅 파일입니다.
 */

'use client';

import { useQuery } from '@tanstack/react-query';

import { userQueryOptions } from '@/api/queryOptions/userQueryOptions';
import type {
  CompletedTaskHistoryQueryParams,
  QueryParams,
} from '@/api/queryKeys';

type UseCompletedTasksParams = {
  params?: CompletedTaskHistoryQueryParams;
};

type UseMyGroupsParams = {
  params?: QueryParams;
};

type UseMyMembershipsParams = {
  params?: QueryParams;
};

export function useMe() {
  return useQuery(userQueryOptions.me());
}

export function useMyGroups({ params }: UseMyGroupsParams = {}) {
  return useQuery(userQueryOptions.groups(params));
}

export function useMyMemberships({ params }: UseMyMembershipsParams = {}) {
  return useQuery(userQueryOptions.memberships(params));
}

export function useCompletedTasks({ params }: UseCompletedTasksParams = {}) {
  return useQuery(userQueryOptions.completedTasks(params));
}
