/**
 * 팀 관련 query options를 정의하는 파일입니다.
 */

import { getTeamDetail, getTeamTasksByDate } from '@/api/groupApi';
import type { TeamScopedDateQueryParams } from '@/api/queryKeys';
import { queryKeys } from '@/api/queryKeys';
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
    }),
} as const;
