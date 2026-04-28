/**
 * Swagger `Article`, `ArticleComment` 도메인 기준 쿼리 키를 정의합니다.
 */

import {
  QUERY_KEY_RESOURCES,
  QUERY_KEY_SEGMENTS,
} from '@/api/queryKeys/constants';
import {
  createTeamResourceQueryKeys,
  createTeamScopeQueryKey,
  withQueryParams,
} from '@/api/queryKeys/factory';
import type {
  ArticleListQueryParams,
  CursorPaginationQueryParams,
  QueryKeyId,
} from '@/api/queryKeys/types';

export const articleQueryKeys = {
  all: (teamId: string) =>
    createTeamResourceQueryKeys(teamId, QUERY_KEY_RESOURCES.ARTICLES).all,
  detail: (teamId: string, articleId: QueryKeyId) =>
    createTeamResourceQueryKeys(teamId, QUERY_KEY_RESOURCES.ARTICLES).detail(
      articleId,
    ),
  infiniteList: (teamId: string, params?: ArticleListQueryParams) =>
    createTeamResourceQueryKeys(
      teamId,
      QUERY_KEY_RESOURCES.ARTICLES,
    ).infiniteList(params),
  like: (teamId: string, articleId: QueryKeyId) =>
    createTeamScopeQueryKey(
      teamId,
      QUERY_KEY_RESOURCES.ARTICLES,
      QUERY_KEY_SEGMENTS.DETAIL,
      articleId,
      QUERY_KEY_SEGMENTS.LIKE,
    ),
  list: (teamId: string, params?: ArticleListQueryParams) =>
    createTeamResourceQueryKeys(teamId, QUERY_KEY_RESOURCES.ARTICLES).list(
      params,
    ),
  lists: (teamId: string) =>
    createTeamResourceQueryKeys(teamId, QUERY_KEY_RESOURCES.ARTICLES).lists(),
} as const;

export const articleCommentQueryKeys = {
  all: (teamId: string) =>
    createTeamScopeQueryKey(teamId, QUERY_KEY_RESOURCES.ARTICLE_COMMENTS),
  article: (teamId: string, articleId: QueryKeyId) =>
    createTeamScopeQueryKey(
      teamId,
      QUERY_KEY_RESOURCES.ARTICLE_COMMENTS,
      articleId,
    ),
  detail: (teamId: string, commentId: QueryKeyId) =>
    createTeamScopeQueryKey(
      teamId,
      QUERY_KEY_RESOURCES.ARTICLE_COMMENTS,
      QUERY_KEY_SEGMENTS.DETAIL,
      commentId,
    ),
  infiniteList: (
    teamId: string,
    articleId: QueryKeyId,
    params?: CursorPaginationQueryParams,
  ) =>
    withQueryParams(
      createTeamScopeQueryKey(
        teamId,
        QUERY_KEY_RESOURCES.ARTICLE_COMMENTS,
        articleId,
        QUERY_KEY_SEGMENTS.INFINITE_LIST,
      ),
      params,
    ),
  list: (
    teamId: string,
    articleId: QueryKeyId,
    params?: CursorPaginationQueryParams,
  ) =>
    withQueryParams(
      createTeamScopeQueryKey(
        teamId,
        QUERY_KEY_RESOURCES.ARTICLE_COMMENTS,
        articleId,
        QUERY_KEY_SEGMENTS.LIST,
      ),
      params,
    ),
} as const;
