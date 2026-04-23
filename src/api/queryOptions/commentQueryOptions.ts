/**
 * 할 일 댓글과 채용 / 홍보 게시글 댓글 query options를 정의하는 파일입니다.
 */

import { getBoardComments, getTaskComments } from '@/api/commentApi';
import type { CursorPaginationQueryParams, QueryKeyId } from '@/api/queryKeys';
import { queryKeys } from '@/api/queryKeys';
import {
  createListQueryOptions,
  createQueryOptions,
  type QueryOptionsOverrides,
} from '@/api/queryOptions/factory';

type TaskCommentsData = Awaited<ReturnType<typeof getTaskComments>>;
type BoardCommentsData = Awaited<ReturnType<typeof getBoardComments>>;

export const commentQueryOptions = {
  taskComments: <TData = TaskCommentsData>(
    teamId: string,
    taskId: QueryKeyId,
    options?: QueryOptionsOverrides<TaskCommentsData, TData>,
  ) =>
    createQueryOptions<TaskCommentsData, TData>({
      options,
      queryFn: () => getTaskComments(teamId, taskId),
      queryKey: queryKeys.comment.list(teamId, taskId),
    }),
} as const;

export const boardCommentQueryOptions = {
  list: <TData = BoardCommentsData>(
    teamId: string,
    articleId: QueryKeyId,
    params: CursorPaginationQueryParams,
    options?: QueryOptionsOverrides<BoardCommentsData, TData>,
  ) =>
    createListQueryOptions<BoardCommentsData, TData>({
      options,
      queryFn: () => getBoardComments(teamId, articleId, params),
      queryKey: queryKeys.boardComment.list(teamId, articleId, params),
    }),
} as const;
