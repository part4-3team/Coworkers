/**
 * 채용 / 홍보 게시글(백엔드 Article)과 게시글 댓글 쿼리 키를 정의합니다.
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
  BoardListQueryParams,
  CursorPaginationQueryParams,
  QueryKeyId,
} from '@/api/queryKeys/types';

export const boardQueryKeys = {
  all: (teamId: string) =>
    createTeamResourceQueryKeys(teamId, QUERY_KEY_RESOURCES.BOARDS).all,
  detail: (teamId: string, articleId: QueryKeyId) =>
    createTeamResourceQueryKeys(teamId, QUERY_KEY_RESOURCES.BOARDS).detail(
      articleId,
    ),
  infiniteList: (teamId: string, params?: BoardListQueryParams) =>
    createTeamResourceQueryKeys(
      teamId,
      QUERY_KEY_RESOURCES.BOARDS,
    ).infiniteList(params),
  like: (teamId: string, articleId: QueryKeyId) =>
    createTeamScopeQueryKey(
      teamId,
      QUERY_KEY_RESOURCES.BOARDS,
      QUERY_KEY_SEGMENTS.DETAIL,
      articleId,
      QUERY_KEY_SEGMENTS.LIKE,
    ),
  list: (teamId: string, params?: BoardListQueryParams) =>
    createTeamResourceQueryKeys(teamId, QUERY_KEY_RESOURCES.BOARDS).list(
      params,
    ),
  lists: (teamId: string) =>
    createTeamResourceQueryKeys(teamId, QUERY_KEY_RESOURCES.BOARDS).lists(),
} as const;

export const boardCommentQueryKeys = {
  all: (teamId: string) =>
    createTeamScopeQueryKey(teamId, QUERY_KEY_RESOURCES.BOARD_COMMENTS),
  detail: (teamId: string, commentId: QueryKeyId) =>
    createTeamScopeQueryKey(
      teamId,
      QUERY_KEY_RESOURCES.BOARD_COMMENTS,
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
        QUERY_KEY_RESOURCES.BOARD_COMMENTS,
        QUERY_KEY_SEGMENTS.INFINITE_LIST,
        articleId,
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
        QUERY_KEY_RESOURCES.BOARD_COMMENTS,
        QUERY_KEY_SEGMENTS.LIST,
        articleId,
      ),
      params,
    ),
} as const;
