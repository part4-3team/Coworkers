/**
 * 인증, 사용자, 이미지 업로드 등 전역 범위 쿼리 키를 정의합니다.
 */

import {
  createResourceQueryKeys,
  createTeamScopeQueryKey,
  withQueryParams,
} from '@/api/queryKeys/factory';
import type {
  CompletedTaskHistoryQueryParams,
  QueryParams,
} from '@/api/queryKeys/types';

const authResourceQueryKeys = createResourceQueryKeys(['auth'] as const);
const imageResourceQueryKeys = createResourceQueryKeys(['images'] as const);
const userResourceQueryKeys = createResourceQueryKeys(['user'] as const);

export const authQueryKeys = {
  ...authResourceQueryKeys,
  me: () => ['auth', 'me'] as const,
  oauthProvider: (provider: string) => ['auth', 'oauth', provider] as const,
  session: () => ['auth', 'session'] as const,
} as const;

export const userQueryKeys = {
  ...userResourceQueryKeys,
  completedTaskSummary: (params?: CompletedTaskHistoryQueryParams) =>
    withQueryParams(['user', 'completedTasks', 'summary'] as const, params),
  completedTasks: (params?: CompletedTaskHistoryQueryParams) =>
    withQueryParams(['user', 'completedTasks', 'list'] as const, params),
  groups: (params?: QueryParams) =>
    withQueryParams(['user', 'groups', 'list'] as const, params),
  me: () => ['user', 'me'] as const,
  memberships: (params?: QueryParams) =>
    withQueryParams(['user', 'memberships', 'list'] as const, params),
} as const;

export const imageQueryKeys = {
  ...imageResourceQueryKeys,
  upload: () => ['images', 'upload'] as const,
} as const;

export const oauthAppQueryKeys = {
  all: (teamId: string) => createTeamScopeQueryKey(teamId, 'oauthApps'),
  detail: (teamId: string, provider: string) =>
    createTeamScopeQueryKey(teamId, 'oauthApps', 'detail', provider),
  list: (teamId: string) =>
    createTeamScopeQueryKey(teamId, 'oauthApps', 'list'),
} as const;
