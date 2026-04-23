/**
 * 도메인별 query options 생성을 도와주는 공용 팩토리입니다.
 */

import {
  keepPreviousData,
  type MutationKey,
  mutationOptions,
  type QueryKey,
  queryOptions,
  type UndefinedInitialDataOptions,
  type UseMutationOptions,
} from '@tanstack/react-query';

export type QueryOptionsOverrides<
  TQueryFnData,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> = Omit<
  UndefinedInitialDataOptions<TQueryFnData, Error, TData, TQueryKey>,
  'queryFn' | 'queryKey'
>;

export type MutationOptionsOverrides<
  TData,
  TVariables,
  TOnMutateResult = unknown,
> = Omit<
  UseMutationOptions<TData, Error, TVariables, TOnMutateResult>,
  'mutationFn' | 'mutationKey'
>;

type CreateQueryOptionsParams<
  TQueryFnData,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> = {
  options?: QueryOptionsOverrides<TQueryFnData, TData, TQueryKey>;
  queryFn: () => Promise<TQueryFnData>;
  queryKey: TQueryKey;
  staleTime?: number;
};

type CreateMutationOptionsParams<
  TData,
  TVariables,
  TOnMutateResult = unknown,
> = {
  mutationFn: (variables: TVariables) => Promise<TData>;
  mutationKey?: MutationKey;
  options?: MutationOptionsOverrides<TData, TVariables, TOnMutateResult>;
};

export function createQueryOptions<
  TQueryFnData,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>({
  options,
  queryFn,
  queryKey,
  staleTime,
}: CreateQueryOptionsParams<TQueryFnData, TData, TQueryKey>) {
  return queryOptions({
    queryFn,
    queryKey,
    staleTime,
    ...options,
  });
}

export function createListQueryOptions<
  TQueryFnData,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>({
  options,
  queryFn,
  queryKey,
  staleTime,
}: CreateQueryOptionsParams<TQueryFnData, TData, TQueryKey>) {
  return queryOptions({
    placeholderData: keepPreviousData,
    queryFn,
    queryKey,
    staleTime,
    ...options,
  });
}

export function createMutationOptions<
  TData,
  TVariables,
  TOnMutateResult = unknown,
>({
  mutationFn,
  mutationKey,
  options,
}: CreateMutationOptionsParams<TData, TVariables, TOnMutateResult>) {
  return mutationOptions({
    ...(mutationKey ? { mutationKey } : {}),
    mutationFn,
    ...options,
  });
}
