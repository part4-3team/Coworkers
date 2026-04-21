/**
 * 로그인, 회원가입, 토큰 갱신 등 인증 관련 API를 정의하는 파일입니다.
 */

import { apiClient, teamEndpoint } from '@/api/apiClient';
import type { QueryKeyId } from '@/api/queryKeys';

type SignUpBody = {
  email: string;
  image?: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
};

type SignInBody = {
  email: string;
  password: string;
};

type RefreshTokenBody = {
  refreshToken: string;
};

type SignInWithOauthBody = {
  redirectUri?: string;
  state?: string;
  token: string;
};

export async function signUp(teamId: string, body: SignUpBody) {
  return apiClient<unknown>(teamEndpoint('/auth/signUp', teamId), {
    body: JSON.stringify(body),
    method: 'POST',
  });
}

export async function signIn(teamId: string, body: SignInBody) {
  return apiClient<unknown>(teamEndpoint('/auth/signIn', teamId), {
    body: JSON.stringify(body),
    method: 'POST',
  });
}

export async function refreshAccessToken(
  teamId: string,
  body: RefreshTokenBody,
) {
  return apiClient<unknown>(teamEndpoint('/auth/refresh-token', teamId), {
    body: JSON.stringify(body),
    method: 'POST',
  });
}

export async function signInWithOauth(
  teamId: string,
  provider: QueryKeyId,
  body: SignInWithOauthBody,
) {
  return apiClient<unknown>(teamEndpoint(`/auth/signIn/${provider}`, teamId), {
    body: JSON.stringify(body),
    method: 'POST',
  });
}
