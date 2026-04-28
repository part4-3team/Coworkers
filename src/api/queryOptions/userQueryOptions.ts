/**
 * 사용자 관련 query options를 정의하는 파일입니다.
 */

import type {
  CompletedTaskHistoryQueryParams,
  QueryParams,
} from '@/api/queryKeys';
import { queryKeys } from '@/api/queryKeys';
import { QUERY_OPTION_DEFAULTS } from '@/api/queryOptions/constants';
import {
  createListQueryOptions,
  createQueryOptions,
  type QueryOptionsOverrides,
} from '@/api/queryOptions/factory';
import {
  getCompletedTasks,
  getMe,
  getMyGroups,
  getMyMemberships,
} from '@/api/userApi';

type CompletedTasksData = Awaited<ReturnType<typeof getCompletedTasks>>;
type MyGroupsData = Awaited<ReturnType<typeof getMyGroups>>;
type MeData = Awaited<ReturnType<typeof getMe>>;
type MyMembershipsData = Awaited<ReturnType<typeof getMyMemberships>>;

export const userQueryOptions = {
  completedTasks: <TData = CompletedTasksData>(
    params?: CompletedTaskHistoryQueryParams,
    options?: QueryOptionsOverrides<CompletedTasksData, TData>,
  ) =>
    createListQueryOptions<CompletedTasksData, TData>({
      options,
      queryFn: () => getCompletedTasks(params),
      queryKey: queryKeys.user.completedTasks(params),
      staleTime: QUERY_OPTION_DEFAULTS.USER_LIST_STALE_TIME,
    }),
  groups: <TData = MyGroupsData>(
    params?: QueryParams,
    options?: QueryOptionsOverrides<MyGroupsData, TData>,
  ) =>
    createListQueryOptions<MyGroupsData, TData>({
      options,
      queryFn: () => getMyGroups(params),
      queryKey: queryKeys.user.groups(params),
      staleTime: QUERY_OPTION_DEFAULTS.USER_LIST_STALE_TIME,
    }),
  me: <TData = MeData>(options?: QueryOptionsOverrides<MeData, TData>) =>
    createQueryOptions<MeData, TData>({
      options,
      queryFn: getMe,
      queryKey: queryKeys.user.me(),
      staleTime: QUERY_OPTION_DEFAULTS.USER_ME_STALE_TIME,
    }),
  memberships: <TData = MyMembershipsData>(
    params?: QueryParams,
    options?: QueryOptionsOverrides<MyMembershipsData, TData>,
  ) =>
    createListQueryOptions<MyMembershipsData, TData>({
      options,
      queryFn: () => getMyMemberships(params),
      queryKey: queryKeys.user.memberships(params),
      staleTime: QUERY_OPTION_DEFAULTS.USER_LIST_STALE_TIME,
    }),
} as const;
