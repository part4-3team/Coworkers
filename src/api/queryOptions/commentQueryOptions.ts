/**
 * 할 일 댓글과 채용 / 홍보 게시글 댓글 query options를 정의하는 파일입니다.
 */

import { getBoardComments, getTaskComments } from '@/api/commentApi';
import {
  createListQueryOptions,
  createQueryOptions,
} from '@/api/queryOptions/factory';
import type { CursorPaginationQueryParams, QueryKeyId } from '@/api/queryKeys';
import { queryKeys } from '@/api/queryKeys';

export const commentQueryOptions = {
  taskComments: (teamId: string, taskId: QueryKeyId) =>
    createQueryOptions({
      queryFn: () => getTaskComments(teamId, taskId),
      queryKey: queryKeys.comment.list(teamId, taskId),
    }),
} as const;

export const boardCommentQueryOptions = {
  list: (
    teamId: string,
    articleId: QueryKeyId,
    params: CursorPaginationQueryParams,
  ) =>
    createListQueryOptions({
      queryFn: () => getBoardComments(teamId, articleId, params),
      queryKey: queryKeys.boardComment.list(teamId, articleId, params),
    }),
} as const;
