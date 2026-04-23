'use client';

/**
 * 채용 / 홍보 게시글 관련 서버 상태를 관리하는 커스텀 훅입니다.
 */

import { useQuery } from '@tanstack/react-query';

import { getBoardDetail, getBoardList } from '@/api/boardApi';
import type { BoardListQueryParams, QueryKeyId } from '@/api/queryKeys';
import { boardQueryOptions } from '@/api/queryOptions';
import type { QueryOptionsOverrides } from '@/api/queryOptions/factory';

type BoardListData = Awaited<ReturnType<typeof getBoardList>>;
type BoardDetailData = Awaited<ReturnType<typeof getBoardDetail>>;

type UseBoardListParams<TData = BoardListData> = {
  options?: QueryOptionsOverrides<BoardListData, TData>;
  params?: BoardListQueryParams;
  teamId: string;
};

type UseBoardDetailParams<TData = BoardDetailData> = {
  articleId: QueryKeyId;
  options?: QueryOptionsOverrides<BoardDetailData, TData>;
  teamId: string;
};

export function useBoardListQuery<TData = BoardListData>({
  options,
  params,
  teamId,
}: UseBoardListParams<TData>) {
  return useQuery(boardQueryOptions.list<TData>(teamId, params, options));
}

export function useBoardDetailQuery<TData = BoardDetailData>({
  articleId,
  options,
  teamId,
}: UseBoardDetailParams<TData>) {
  return useQuery(boardQueryOptions.detail<TData>(teamId, articleId, options));
}
