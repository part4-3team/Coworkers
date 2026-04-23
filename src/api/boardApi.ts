/**
 * 채용 / 홍보 게시글 관련 API를 정의하는 파일입니다.
 */

import { apiClient, teamEndpoint } from '@/api/apiClient';
import { buildQueryString } from '@/api/buildQueryString';
import { API_PATH_SEGMENTS } from '@/api/constants';
import type { BoardListQueryParams, QueryKeyId } from '@/api/queryKeys';

export async function getBoardList(
  teamId: string,
  params?: BoardListQueryParams,
) {
  const endpoint = `${teamEndpoint(API_PATH_SEGMENTS.ARTICLES, teamId)}${buildQueryString(
    params,
  )}`;

  return apiClient<unknown>(endpoint);
}

export async function getBoardDetail(teamId: string, articleId: QueryKeyId) {
  return apiClient<unknown>(
    teamEndpoint(`${API_PATH_SEGMENTS.ARTICLES}/${articleId}`, teamId),
  );
}
