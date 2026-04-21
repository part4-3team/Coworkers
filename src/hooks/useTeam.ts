/**
 * 팀(백엔드 Group) 상세, 멤버, 초대, 팀 수정 관련 서버 상태를 관리하는 훅 파일입니다.
 */

'use client';

import { useQuery } from '@tanstack/react-query';

import { teamQueryOptions } from '@/api/queryOptions';
import type { TeamScopedDateQueryParams } from '@/api/queryKeys';

type UseTeamDetailParams = {
  teamId: string;
};

type UseTeamTasksByDateParams = {
  params: TeamScopedDateQueryParams;
  teamId: string;
};

export function useTeamDetail({ teamId }: UseTeamDetailParams) {
  return useQuery(teamQueryOptions.detail(teamId));
}

export function useTeamTasksByDate({
  params,
  teamId,
}: UseTeamTasksByDateParams) {
  return useQuery(teamQueryOptions.tasksByDate(teamId, params));
}
