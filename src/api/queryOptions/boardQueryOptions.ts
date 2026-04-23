/**
 * 채용 / 홍보 게시글 관련 query options를 정의하는 파일입니다.
 */

import { getBoardDetail, getBoardList } from '@/api/boardApi';
import type { BoardListQueryParams, QueryKeyId } from '@/api/queryKeys';
import { queryKeys } from '@/api/queryKeys';
import {
  createListQueryOptions,
  createQueryOptions,
  type QueryOptionsOverrides,
} from '@/api/queryOptions/factory';

type BoardDetailData = Awaited<ReturnType<typeof getBoardDetail>>;
type BoardListData = Awaited<ReturnType<typeof getBoardList>>;

export const boardQueryOptions = {
  detail: <TData = BoardDetailData>(
    teamId: string,
    articleId: QueryKeyId,
    options?: QueryOptionsOverrides<BoardDetailData, TData>,
  ) =>
    createQueryOptions<BoardDetailData, TData>({
      options,
      queryFn: () => getBoardDetail(teamId, articleId),
      queryKey: queryKeys.board.detail(teamId, articleId),
    }),
  list: <TData = BoardListData>(
    teamId: string,
    params?: BoardListQueryParams,
    options?: QueryOptionsOverrides<BoardListData, TData>,
  ) =>
    createListQueryOptions<BoardListData, TData>({
      options,
      queryFn: () => getBoardList(teamId, params),
      queryKey: queryKeys.board.list(teamId, params),
    }),
} as const;
