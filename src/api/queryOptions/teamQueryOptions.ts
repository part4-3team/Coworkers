/**
 * 팀 관련 query options를 정의하는 파일입니다.
 */

import { getTeamDetail, getTeamTasksByDate } from '@/api/groupApi';
import {
  createListQueryOptions,
  createQueryOptions,
} from '@/api/queryOptions/factory';
import type { TeamScopedDateQueryParams } from '@/api/queryKeys';
import { queryKeys } from '@/api/queryKeys';

export const teamQueryOptions = {
  detail: (teamId: string) =>
    createQueryOptions({
      queryFn: () => getTeamDetail(teamId),
      queryKey: queryKeys.team.detail(teamId),
    }),
  tasksByDate: (teamId: string, params: TeamScopedDateQueryParams) =>
    createListQueryOptions({
      queryFn: () => getTeamTasksByDate(teamId, params),
      queryKey: queryKeys.team.tasksByDate(teamId, params),
    }),
} as const;
