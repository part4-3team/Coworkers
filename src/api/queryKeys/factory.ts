/**
 * TanStack Query 키를 일관된 형태로 생성하는 공용 팩토리입니다.
 *
 * 이 파일은 새 query key를 만들 때 "형태를 통일"하기 위해 사용합니다.
 *
 * 언제 보면 좋은가:
 * - 새 도메인의 `list`, `detail`, `all` 키를 만들 때
 * - params 객체 순서 때문에 query key가 매번 달라지는 문제를 막고 싶을 때
 * - 팀 스코프(`/teams/{teamId}/...`) 키를 공통 형식으로 만들고 싶을 때
 *
 * 핵심 역할:
 * - `normalizeQueryParams`: params 순서를 고정해서 같은 요청은 같은 key가 되게 함
 * - `createResourceQueryKeys`: 일반적인 list/detail/all 패턴 생성
 * - `createTeamResourceQueryKeys`: 팀 스코프 리소스용 list/detail/all 패턴 생성
 */

import {
  QUERY_KEY_RESOURCES,
  QUERY_KEY_SEGMENTS,
} from '@/api/queryKeys/constants';
import type {
  QueryKeyId,
  QueryParams,
  QueryParamValue,
} from '@/api/queryKeys/types';

function normalizeQueryParamValue(value: QueryParamValue): QueryParamValue {
  if (Array.isArray(value)) {
    return value.map((item) => normalizeQueryParamValue(item));
  }

  if (value && typeof value === 'object') {
    return normalizeQueryParams(value as QueryParams);
  }

  return value;
}

export function normalizeQueryParams<TParams extends QueryParams>(
  params: TParams,
): TParams {
  const normalizedEntries = Object.entries(params)
    .filter(
      (entry): entry is [string, Exclude<(typeof entry)[1], undefined>] =>
        entry[1] !== undefined,
    )
    .sort(([leftKey], [rightKey]) => leftKey.localeCompare(rightKey))
    .map(([key, value]) => [key, normalizeQueryParamValue(value)] as const);

  return Object.fromEntries(normalizedEntries) as TParams;
}

export function withQueryParams<
  const TBase extends readonly unknown[],
  TParams extends QueryParams,
>(base: TBase, params?: TParams) {
  if (!params) {
    return base;
  }

  const normalized = normalizeQueryParams(params);

  if (Object.keys(normalized).length === 0) {
    return base;
  }

  return [...base, normalized] as const;
}

export function createResourceQueryKeys<const TBase extends readonly unknown[]>(
  base: TBase,
) {
  return {
    all: base,
    detail: (id: QueryKeyId) =>
      [...base, QUERY_KEY_SEGMENTS.DETAIL, id] as const,
    details: () => [...base, QUERY_KEY_SEGMENTS.DETAIL] as const,
    infiniteList: <TParams extends QueryParams>(params?: TParams) =>
      withQueryParams(
        [...base, QUERY_KEY_SEGMENTS.INFINITE_LIST] as const,
        params,
      ),
    infiniteLists: () => [...base, QUERY_KEY_SEGMENTS.INFINITE_LIST] as const,
    list: <TParams extends QueryParams>(params?: TParams) =>
      withQueryParams([...base, QUERY_KEY_SEGMENTS.LIST] as const, params),
    lists: () => [...base, QUERY_KEY_SEGMENTS.LIST] as const,
  };
}

export function createTeamScopeQueryKey<
  const TSegments extends readonly unknown[],
>(teamId: string, ...segments: TSegments) {
  return [QUERY_KEY_RESOURCES.TEAMS, teamId, ...segments] as const;
}

export function createTeamResourceQueryKeys<const TResource extends string>(
  teamId: string,
  resource: TResource,
) {
  return createResourceQueryKeys(createTeamScopeQueryKey(teamId, resource));
}
