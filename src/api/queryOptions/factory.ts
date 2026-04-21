/**
 * 도메인별 query options 생성을 도와주는 공용 팩토리입니다.
 */

import {
  keepPreviousData,
  queryOptions,
  type QueryKey,
} from '@tanstack/react-query';

type CreateQueryOptionsParams<TData> = {
  queryFn: () => Promise<TData>;
  queryKey: QueryKey;
  staleTime?: number;
};

export function createQueryOptions<TData>({
  queryFn,
  queryKey,
  staleTime,
}: CreateQueryOptionsParams<TData>) {
  return queryOptions({
    queryFn,
    queryKey,
    staleTime,
  });
}

export function createListQueryOptions<TData>({
  queryFn,
  queryKey,
  staleTime,
}: CreateQueryOptionsParams<TData>) {
  return queryOptions({
    placeholderData: keepPreviousData,
    queryFn,
    queryKey,
    staleTime,
  });
}
