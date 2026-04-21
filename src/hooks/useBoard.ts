'use client';

/**
 * 채용 / 홍보 게시글 관련 서버 상태를 관리하는 커스텀 훅입니다.
 */

import { useQuery } from '@tanstack/react-query';

import { boardQueryOptions } from '@/api/queryOptions';
import type { BoardListQueryParams, QueryKeyId } from '@/api/queryKeys';

type UseBoardListParams = {
  params?: BoardListQueryParams;
  teamId: string;
};

type UseBoardDetailParams = {
  articleId: QueryKeyId;
  teamId: string;
};

export function useBoardList({ params, teamId }: UseBoardListParams) {
  return useQuery(boardQueryOptions.list(teamId, params));
}

export function useBoardDetail({ articleId, teamId }: UseBoardDetailParams) {
  return useQuery(boardQueryOptions.detail(teamId, articleId));
}
