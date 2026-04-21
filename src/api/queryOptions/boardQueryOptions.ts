/**
 * 채용 / 홍보 게시글 관련 query options를 정의하는 파일입니다.
 */

import { getBoardDetail, getBoardList } from '@/api/boardApi';
import {
  createListQueryOptions,
  createQueryOptions,
} from '@/api/queryOptions/factory';
import type { BoardListQueryParams, QueryKeyId } from '@/api/queryKeys';
import { queryKeys } from '@/api/queryKeys';

export const boardQueryOptions = {
  detail: (teamId: string, articleId: QueryKeyId) =>
    createQueryOptions({
      queryFn: () => getBoardDetail(teamId, articleId),
      queryKey: queryKeys.board.detail(teamId, articleId),
    }),
  list: (teamId: string, params?: BoardListQueryParams) =>
    createListQueryOptions({
      queryFn: () => getBoardList(teamId, params),
      queryKey: queryKeys.board.list(teamId, params),
    }),
} as const;
