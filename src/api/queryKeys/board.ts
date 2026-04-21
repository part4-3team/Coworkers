/**
 * 채용 / 홍보 게시글(백엔드 Article)과 게시글 댓글 쿼리 키를 정의합니다.
 */

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
  all: (teamId: string) => createTeamResourceQueryKeys(teamId, 'boards').all,
  detail: (teamId: string, articleId: QueryKeyId) =>
    createTeamResourceQueryKeys(teamId, 'boards').detail(articleId),
  infiniteList: (teamId: string, params?: BoardListQueryParams) =>
    createTeamResourceQueryKeys(teamId, 'boards').infiniteList(params),
  like: (teamId: string, articleId: QueryKeyId) =>
    createTeamScopeQueryKey(teamId, 'boards', 'detail', articleId, 'like'),
  list: (teamId: string, params?: BoardListQueryParams) =>
    createTeamResourceQueryKeys(teamId, 'boards').list(params),
  lists: (teamId: string) =>
    createTeamResourceQueryKeys(teamId, 'boards').lists(),
} as const;

export const boardCommentQueryKeys = {
  all: (teamId: string) => createTeamScopeQueryKey(teamId, 'boardComments'),
  detail: (teamId: string, commentId: QueryKeyId) =>
    createTeamScopeQueryKey(teamId, 'boardComments', 'detail', commentId),
  infiniteList: (
    teamId: string,
    articleId: QueryKeyId,
    params?: CursorPaginationQueryParams,
  ) =>
    withQueryParams(
      createTeamScopeQueryKey(
        teamId,
        'boardComments',
        'infiniteList',
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
      createTeamScopeQueryKey(teamId, 'boardComments', 'list', articleId),
      params,
    ),
} as const;
