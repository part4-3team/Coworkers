/**
 * Swagger `Comment`, `ArticleComment` 도메인 query options를 정의합니다.
 */

import { getArticleComments, getTaskComments } from '@/api/commentApi';
import type { CursorPaginationQueryParams, QueryKeyId } from '@/api/queryKeys';
import { queryKeys } from '@/api/queryKeys';
import { QUERY_OPTION_DEFAULTS } from '@/api/queryOptions/constants';
import {
  createListQueryOptions,
  createQueryOptions,
  type QueryOptionsOverrides,
} from '@/api/queryOptions/factory';

type TaskCommentsData = Awaited<ReturnType<typeof getTaskComments>>;
type ArticleCommentsData = Awaited<ReturnType<typeof getArticleComments>>;

export const commentQueryOptions = {
  taskComments: <TData = TaskCommentsData>(
    teamId: string,
    taskId: QueryKeyId,
    options?: QueryOptionsOverrides<TaskCommentsData, TData>,
  ) =>
    createQueryOptions<TaskCommentsData, TData>({
      options,
      queryFn: () => getTaskComments(teamId, taskId),
      queryKey: queryKeys.comment.task(teamId, taskId),
      staleTime: QUERY_OPTION_DEFAULTS.COMMENT_LIST_STALE_TIME,
    }),
} as const;

export const articleCommentQueryOptions = {
  list: <TData = ArticleCommentsData>(
    teamId: string,
    articleId: QueryKeyId,
    params: CursorPaginationQueryParams,
    options?: QueryOptionsOverrides<ArticleCommentsData, TData>,
  ) =>
    createListQueryOptions<ArticleCommentsData, TData>({
      options,
      queryFn: () => getArticleComments(teamId, articleId, params),
      queryKey: queryKeys.articleComment.list(teamId, articleId, params),
      staleTime: QUERY_OPTION_DEFAULTS.COMMENT_LIST_STALE_TIME,
    }),
} as const;
