/**
 * 할 일 상세 댓글과 채용 / 홍보 게시글 댓글 관련 API를 정의하는 파일입니다.
 */

import { apiClient, teamEndpoint } from '@/api/apiClient';
import { buildQueryString } from '@/api/buildQueryString';
import type { CursorPaginationQueryParams, QueryKeyId } from '@/api/queryKeys';

type CommentBody = {
  content: string;
};

export async function getTaskComments(teamId: string, taskId: QueryKeyId) {
  return apiClient<unknown>(teamEndpoint(`/tasks/${taskId}/comments`, teamId));
}

export async function createTaskComment(
  teamId: string,
  taskId: QueryKeyId,
  body: CommentBody,
  token?: string,
) {
  return apiClient<unknown>(teamEndpoint(`/tasks/${taskId}/comments`, teamId), {
    body: JSON.stringify(body),
    method: 'POST',
    token,
  });
}

export async function updateTaskComment(
  teamId: string,
  taskId: QueryKeyId,
  commentId: QueryKeyId,
  body: CommentBody,
  token?: string,
) {
  return apiClient<unknown>(
    teamEndpoint(`/tasks/${taskId}/comments/${commentId}`, teamId),
    {
      body: JSON.stringify(body),
      method: 'PATCH',
      token,
    },
  );
}

export async function deleteTaskComment(
  teamId: string,
  taskId: QueryKeyId,
  commentId: QueryKeyId,
  token?: string,
) {
  return apiClient<unknown>(
    teamEndpoint(`/tasks/${taskId}/comments/${commentId}`, teamId),
    {
      method: 'DELETE',
      token,
    },
  );
}

export async function getBoardComments(
  teamId: string,
  articleId: QueryKeyId,
  params: CursorPaginationQueryParams,
) {
  const endpoint = `${teamEndpoint(
    `/articles/${articleId}/comments`,
    teamId,
  )}${buildQueryString(params)}`;

  return apiClient<unknown>(endpoint);
}

export async function createBoardComment(
  teamId: string,
  articleId: QueryKeyId,
  body: CommentBody,
  token?: string,
) {
  return apiClient<unknown>(
    teamEndpoint(`/articles/${articleId}/comments`, teamId),
    {
      body: JSON.stringify(body),
      method: 'POST',
      token,
    },
  );
}

export async function updateBoardComment(
  teamId: string,
  commentId: QueryKeyId,
  body: CommentBody,
  token?: string,
) {
  return apiClient<unknown>(teamEndpoint(`/comments/${commentId}`, teamId), {
    body: JSON.stringify(body),
    method: 'PATCH',
    token,
  });
}

export async function deleteBoardComment(
  teamId: string,
  commentId: QueryKeyId,
  token?: string,
) {
  return apiClient<unknown>(teamEndpoint(`/comments/${commentId}`, teamId), {
    method: 'DELETE',
    token,
  });
}
