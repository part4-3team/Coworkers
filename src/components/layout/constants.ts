/**
 * 공통 레이아웃에서 사용하는 목업 인증 상태와 사용자 정보를 정의합니다.
 */

import { ROUTES } from '@/constants/ROUTES';

export type LayoutCurrentUser = {
  name: string;
  teamName: string;
};

export const LAYOUT_AUTH_STATE = {
  // TODO: 인증 API 연결 후 실제 로그인 상태로 교체합니다.
  isAuthenticated: true,
  currentUser: {
    name: '안예나',
    teamName: '경영관리팀',
  } satisfies LayoutCurrentUser,
} as const;

export function isGuestLayoutPath(pathname: string | null) {
  return (
    pathname === ROUTES.LOGIN ||
    pathname === ROUTES.SIGNUP ||
    pathname?.startsWith('/oauth/signup/') === true
  );
}

export function getLayoutAuthState(pathname: string | null) {
  return {
    ...LAYOUT_AUTH_STATE,
    isAuthenticated:
      LAYOUT_AUTH_STATE.isAuthenticated && !isGuestLayoutPath(pathname),
  } as const;
}
