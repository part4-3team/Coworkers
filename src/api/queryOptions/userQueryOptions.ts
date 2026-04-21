/**
 * 사용자 관련 query options를 정의하는 파일입니다.
 */

import {
  getCompletedTasks,
  getMe,
  getMyGroups,
  getMyMemberships,
} from '@/api/userApi';
import {
  createListQueryOptions,
  createQueryOptions,
} from '@/api/queryOptions/factory';
import type {
  CompletedTaskHistoryQueryParams,
  QueryParams,
} from '@/api/queryKeys';
import { queryKeys } from '@/api/queryKeys';

export const userQueryOptions = {
  completedTasks: (params?: CompletedTaskHistoryQueryParams) =>
    createListQueryOptions({
      queryFn: () => getCompletedTasks(params),
      queryKey: queryKeys.user.completedTasks(params),
    }),
  groups: (params?: QueryParams) =>
    createListQueryOptions({
      queryFn: () => getMyGroups(params),
      queryKey: queryKeys.user.groups(params),
    }),
  me: () =>
    createQueryOptions({
      queryFn: getMe,
      queryKey: queryKeys.user.me(),
    }),
  memberships: (params?: QueryParams) =>
    createListQueryOptions({
      queryFn: () => getMyMemberships(params),
      queryKey: queryKeys.user.memberships(params),
    }),
} as const;
