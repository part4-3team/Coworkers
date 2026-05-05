/**
 * 인증, 사용자, 이미지 업로드 등 전역 범위 쿼리 키 모음입니다.
 *
 * 이 파일은 아래 상황에서 보면 됩니다.
 * - 로그인 / 회원가입 / OAuth 이후 어떤 사용자 캐시를 다시 받아올지 찾을 때
 * - 마이페이지, 마이히스토리처럼 "현재 로그인한 사용자" 기준 데이터를 조회할 때
 * - 팀에 소속된 내 그룹 / 멤버십 / 내 정보 캐시 키 범위를 확인할 때
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

/** 인증 관련 캐시 키입니다. 로그인 세션 흐름에서 사용합니다. */
export const authQueryKeys = {
  ...authResourceQueryKeys,
  me: () => [QUERY_KEY_RESOURCES.AUTH, QUERY_KEY_SEGMENTS.ME] as const,
  oauthProvider: (provider: string) =>
    [QUERY_KEY_RESOURCES.AUTH, QUERY_KEY_SEGMENTS.OAUTH, provider] as const,
  session: () =>
    [QUERY_KEY_RESOURCES.AUTH, QUERY_KEY_SEGMENTS.SESSION] as const,
} as const;

/**
 * 현재 로그인한 사용자 기준 캐시 키입니다.
 *
 * 예:
 * - 내 정보 조회 -> `me`
 * - 내가 속한 팀 목록 -> `memberships`
 * - 내가 만든 / 속한 그룹 목록 -> `groups`
 * - 마이히스토리 완료 목록 -> `completedTasks`
 */
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

/** 이미지 업로드 mutation과 연결할 때 사용하는 키입니다. */
export const imageQueryKeys = {
  ...imageResourceQueryKeys,
  upload: () =>
    [QUERY_KEY_RESOURCES.IMAGES, QUERY_KEY_SEGMENTS.UPLOAD] as const,
} as const;

/** OAuth 앱 설정 조회 시 사용하는 키입니다. */
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
