/**
 * Swagger `Article` 도메인 query options를 정의하는 파일입니다.
 */

import { getArticleDetail, getArticleList } from '@/api/articleApi';
import type { ArticleListQueryParams, QueryKeyId } from '@/api/queryKeys';
import { queryKeys } from '@/api/queryKeys';
import { QUERY_OPTION_DEFAULTS } from '@/api/queryOptions/constants';
import {
  createListQueryOptions,
  createQueryOptions,
  type QueryOptionsOverrides,
} from '@/api/queryOptions/factory';

type ArticleDetailData = Awaited<ReturnType<typeof getArticleDetail>>;
type ArticleListData = Awaited<ReturnType<typeof getArticleList>>;

export const articleQueryOptions = {
  detail: <TData = ArticleDetailData>(
    teamId: string,
    articleId: QueryKeyId,
    options?: QueryOptionsOverrides<ArticleDetailData, TData>,
  ) =>
    createQueryOptions<ArticleDetailData, TData>({
      options,
      queryFn: () => getArticleDetail(teamId, articleId),
      queryKey: queryKeys.article.detail(teamId, articleId),
      staleTime: QUERY_OPTION_DEFAULTS.DETAIL_STALE_TIME,
    }),
  list: <TData = ArticleListData>(
    teamId: string,
    params?: ArticleListQueryParams,
    options?: QueryOptionsOverrides<ArticleListData, TData>,
  ) =>
    createListQueryOptions<ArticleListData, TData>({
      options,
      queryFn: () => getArticleList(teamId, params),
      queryKey: queryKeys.article.list(teamId, params),
      staleTime: QUERY_OPTION_DEFAULTS.LIST_STALE_TIME,
    }),
} as const;
