/**
 * 내 정보, 멤버십, 완료한 할 일 이력 등 사용자 범위 서버 상태를 관리하는 훅 파일입니다.
 */

'use client';

import { useQuery } from '@tanstack/react-query';

import type {
  CompletedTaskHistoryQueryParams,
  QueryParams,
} from '@/api/queryKeys';
import { userQueryOptions } from '@/api/queryOptions';
import type { QueryOptionsOverrides } from '@/api/queryOptions/factory';
import {
  getCompletedTasks,
  getMe,
  getMyGroups,
  getMyMemberships,
} from '@/api/userApi';

type CompletedTasksData = Awaited<ReturnType<typeof getCompletedTasks>>;
type MeData = Awaited<ReturnType<typeof getMe>>;
type MyGroupsData = Awaited<ReturnType<typeof getMyGroups>>;
type MyMembershipsData = Awaited<ReturnType<typeof getMyMemberships>>;

type UseCompletedTasksParams<TData = CompletedTasksData> = {
  options?: QueryOptionsOverrides<CompletedTasksData, TData>;
  params?: CompletedTaskHistoryQueryParams;
};

type UseMyGroupsParams<TData = MyGroupsData> = {
  options?: QueryOptionsOverrides<MyGroupsData, TData>;
  params?: QueryParams;
};

type UseMyMembershipsParams<TData = MyMembershipsData> = {
  options?: QueryOptionsOverrides<MyMembershipsData, TData>;
  params?: QueryParams;
};

type UseMeParams<TData = MeData> = {
  options?: QueryOptionsOverrides<MeData, TData>;
};

export function useMeQuery<TData = MeData>({
  options,
}: UseMeParams<TData> = {}) {
  return useQuery(userQueryOptions.me<TData>(options));
}

export function useMyGroupsQuery<TData = MyGroupsData>({
  options,
  params,
}: UseMyGroupsParams<TData> = {}) {
  return useQuery(userQueryOptions.groups<TData>(params, options));
}

export function useMyMembershipsQuery<TData = MyMembershipsData>({
  options,
  params,
}: UseMyMembershipsParams<TData> = {}) {
  return useQuery(userQueryOptions.memberships<TData>(params, options));
}

export function useCompletedTasksQuery<TData = CompletedTasksData>({
  options,
  params,
}: UseCompletedTasksParams<TData> = {}) {
  return useQuery(userQueryOptions.completedTasks<TData>(params, options));
}
