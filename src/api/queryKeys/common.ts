/**
 * 인증, 사용자, 이미지 업로드 등 전역 범위 쿼리 키를 정의합니다.
 */

import {
  QUERY_KEY_RESOURCES,
  QUERY_KEY_SEGMENTS,
} from '@/api/queryKeys/constants';
import {
  createResourceQueryKeys,
  createTeamScopeQueryKey,
  withQueryParams,
} from '@/api/queryKeys/factory';
import type {
  CompletedTaskHistoryQueryParams,
  QueryParams,
} from '@/api/queryKeys/types';

const authResourceQueryKeys = createResourceQueryKeys([
  QUERY_KEY_RESOURCES.AUTH,
] as const);
const imageResourceQueryKeys = createResourceQueryKeys([
  QUERY_KEY_RESOURCES.IMAGES,
] as const);
const userResourceQueryKeys = createResourceQueryKeys([
  QUERY_KEY_RESOURCES.USER,
] as const);

export const authQueryKeys = {
  ...authResourceQueryKeys,
  me: () => [QUERY_KEY_RESOURCES.AUTH, QUERY_KEY_SEGMENTS.ME] as const,
  oauthProvider: (provider: string) =>
    [QUERY_KEY_RESOURCES.AUTH, QUERY_KEY_SEGMENTS.OAUTH, provider] as const,
  session: () =>
    [QUERY_KEY_RESOURCES.AUTH, QUERY_KEY_SEGMENTS.SESSION] as const,
} as const;

export const userQueryKeys = {
  ...userResourceQueryKeys,
  completedTaskSummary: (params?: CompletedTaskHistoryQueryParams) =>
    withQueryParams(
      [
        QUERY_KEY_RESOURCES.USER,
        QUERY_KEY_RESOURCES.COMPLETED_TASKS,
        QUERY_KEY_SEGMENTS.SUMMARY,
      ] as const,
      params,
    ),
  completedTasks: (params?: CompletedTaskHistoryQueryParams) =>
    withQueryParams(
      [
        QUERY_KEY_RESOURCES.USER,
        QUERY_KEY_RESOURCES.COMPLETED_TASKS,
        QUERY_KEY_SEGMENTS.LIST,
      ] as const,
      params,
    ),
  groups: (params?: QueryParams) =>
    withQueryParams(
      [
        QUERY_KEY_RESOURCES.USER,
        QUERY_KEY_RESOURCES.GROUPS,
        QUERY_KEY_SEGMENTS.LIST,
      ] as const,
      params,
    ),
  me: () => [QUERY_KEY_RESOURCES.USER, QUERY_KEY_SEGMENTS.ME] as const,
  memberships: (params?: QueryParams) =>
    withQueryParams(
      [
        QUERY_KEY_RESOURCES.USER,
        QUERY_KEY_RESOURCES.MEMBERSHIPS,
        QUERY_KEY_SEGMENTS.LIST,
      ] as const,
      params,
    ),
} as const;

export const imageQueryKeys = {
  ...imageResourceQueryKeys,
  upload: () =>
    [QUERY_KEY_RESOURCES.IMAGES, QUERY_KEY_SEGMENTS.UPLOAD] as const,
} as const;

export const oauthAppQueryKeys = {
  all: (teamId: string) =>
    createTeamScopeQueryKey(teamId, QUERY_KEY_RESOURCES.OAUTH_APPS),
  detail: (teamId: string, provider: string) =>
    createTeamScopeQueryKey(
      teamId,
      QUERY_KEY_RESOURCES.OAUTH_APPS,
      QUERY_KEY_SEGMENTS.DETAIL,
      provider,
    ),
  list: (teamId: string) =>
    createTeamScopeQueryKey(
      teamId,
      QUERY_KEY_RESOURCES.OAUTH_APPS,
      QUERY_KEY_SEGMENTS.LIST,
    ),
} as const;
