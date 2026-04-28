/**
 * 팀 관련 query options를 정의하는 파일입니다.
 */

import { getTeamDetail, getTeamTasksByDate } from '@/api/groupApi';
import type { TeamScopedDateQueryParams } from '@/api/queryKeys';
import { queryKeys } from '@/api/queryKeys';
import { QUERY_OPTION_DEFAULTS } from '@/api/queryOptions/constants';
import {
  createListQueryOptions,
  createQueryOptions,
  type QueryOptionsOverrides,
} from '@/api/queryOptions/factory';

type TeamDetailData = Awaited<ReturnType<typeof getTeamDetail>>;
type TeamTasksByDateData = Awaited<ReturnType<typeof getTeamTasksByDate>>;

export const teamQueryOptions = {
  detail: <TData = TeamDetailData>(
    teamId: string,
    options?: QueryOptionsOverrides<TeamDetailData, TData>,
  ) =>
    createQueryOptions<TeamDetailData, TData>({
      options,
      queryFn: () => getTeamDetail(teamId),
      queryKey: queryKeys.team.detail(teamId),
      staleTime: QUERY_OPTION_DEFAULTS.DETAIL_STALE_TIME,
    }),
  tasksByDate: <TData = TeamTasksByDateData>(
    teamId: string,
    params: TeamScopedDateQueryParams,
    options?: QueryOptionsOverrides<TeamTasksByDateData, TData>,
  ) =>
    createListQueryOptions<TeamTasksByDateData, TData>({
      options,
      queryFn: () => getTeamTasksByDate(teamId, params),
      queryKey: queryKeys.team.tasksByDate(teamId, params),
      staleTime: QUERY_OPTION_DEFAULTS.LIST_STALE_TIME,
    }),
} as const;
