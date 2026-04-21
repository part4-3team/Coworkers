/**
 * API 요청용 검색 파라미터 문자열을 생성하는 유틸입니다.
 */

import { normalizeQueryParams } from '@/api/queryKeys/factory';
import type { QueryParamValue, QueryParams } from '@/api/queryKeys/types';

function appendSearchParam(
  searchParams: URLSearchParams,
  key: string,
  value: QueryParamValue,
) {
  if (Array.isArray(value)) {
    value.forEach((item) => appendSearchParam(searchParams, key, item));
    return;
  }

  if (value && typeof value === 'object') {
    searchParams.append(key, JSON.stringify(value));
    return;
  }

  searchParams.append(key, String(value));
}

export function buildQueryString(params?: QueryParams) {
  if (!params) {
    return '';
  }

  const normalizedParams = normalizeQueryParams(params);
  const searchParams = new URLSearchParams();

  Object.entries(normalizedParams).forEach((entry) => {
    const [key, value] = entry;

    if (value === undefined) {
      return;
    }

    appendSearchParam(searchParams, key, value);
  });

  const queryString = searchParams.toString();

  return queryString ? `?${queryString}` : '';
}
