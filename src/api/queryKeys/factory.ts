/**
 * TanStack Query 키를 일관된 형태로 생성하는 공용 팩토리입니다.
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
