/**
 * Swagger 도메인 기준으로 재사용하는 TanStack Query 키 모음입니다.
 *
 * 용어 매핑:
 * - `team`은 Swagger의 Group 리소스를 의미합니다.
 * - `article`은 채용 / 홍보 게시글을 의미합니다.
 * - `articleComment`는 게시글 댓글을 의미합니다.
 *
 * 화면 / 훅 코드에서는 보통 이 `queryKeys` 객체를 기준으로 접근합니다.
 *
 * 예:
 * - 게시글 상세 invalidate -> `queryKeys.article.detail(teamId, articleId)`
 * - 할 일 댓글 전체 invalidate -> `queryKeys.comment.task(teamId, taskId)`
 *
 * 즉 "어떤 캐시를 다시 받아와야 하지?"가 궁금할 때
 * 가장 먼저 보면 되는 진입점입니다.
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
