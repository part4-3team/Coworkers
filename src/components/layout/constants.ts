/**
 * 공통 레이아웃 인증 상태 계산에 사용하는 상수와 헬퍼입니다.
 */

import { ROUTES } from '@/constants/ROUTES';

export type LayoutCurrentUser = {
  name: string;
  teamName: string;
};

export const DEFAULT_LAYOUT_CURRENT_USER = {
  name: '사용자',
  teamName: 'Coworkers',
} satisfies LayoutCurrentUser;

export function isGuestLayoutPath(pathname: string | null) {
  return (
    pathname === ROUTES.LOGIN ||
    pathname === ROUTES.SIGNUP ||
    pathname?.startsWith('/oauth/signup/') === true
  );
}
