/**
 * Swagger 도메인 기준으로 재사용하는 TanStack Query 키 모음입니다.
 *
 * 용어 매핑:
 * - `team`은 Swagger의 Group 리소스를 의미합니다.
 * - `article`은 채용 / 홍보 게시글을 의미합니다.
 * - `articleComment`는 게시글 댓글을 의미합니다.
 */

import {
  articleCommentQueryKeys,
  articleQueryKeys,
} from '@/api/queryKeys/article';
import {
  authQueryKeys,
  imageQueryKeys,
  oauthAppQueryKeys,
  userQueryKeys,
} from '@/api/queryKeys/common';
import {
  commentQueryKeys,
  recurringQueryKeys,
  taskListQueryKeys,
  taskQueryKeys,
  teamQueryKeys,
} from '@/api/queryKeys/team';

export const queryKeys = {
  article: articleQueryKeys,
  articleComment: articleCommentQueryKeys,
  auth: authQueryKeys,
  comment: commentQueryKeys,
  image: imageQueryKeys,
  oauthApp: oauthAppQueryKeys,
  recurring: recurringQueryKeys,
  task: taskQueryKeys,
  taskList: taskListQueryKeys,
  team: teamQueryKeys,
  user: userQueryKeys,
} as const;

export {
  articleCommentQueryKeys,
  articleQueryKeys,
  authQueryKeys,
  commentQueryKeys,
  imageQueryKeys,
  oauthAppQueryKeys,
  recurringQueryKeys,
  taskListQueryKeys,
  taskQueryKeys,
  teamQueryKeys,
  userQueryKeys,
};

export type {
  ArticleListQueryParams,
  CompletedTaskHistoryQueryParams,
  CursorPaginationQueryParams,
  DateRangeQueryParams,
  OffsetPaginationQueryParams,
  QueryKeyId,
  QueryParams,
  TaskListQueryParams,
  TaskQueryParams,
  TeamScopedDateQueryParams,
} from '@/api/queryKeys/types';
