/**
 * 로그인, 회원가입, OAuth 로그인, 토큰 갱신을 담당하는 훅 파일입니다.
 */

'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  refreshAccessToken,
  signIn,
  signInWithOauth,
  signUp,
} from '@/api/authApi';
import { queryKeys } from '@/api/queryKeys';

type SignUpVariables = {
  body: {
    email: string;
    image?: string;
    nickname: string;
    password: string;
    passwordConfirmation: string;
  };
  teamId: string;
};

type SignInVariables = {
  body: {
    email: string;
    password: string;
  };
  teamId: string;
};

type RefreshTokenVariables = {
  body: {
    refreshToken: string;
  };
  teamId: string;
};

type SignInWithOauthVariables = {
  body: {
    redirectUri?: string;
    state?: string;
    token: string;
  };
  provider: string;
  teamId: string;
};

export function useSignUp() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ body, teamId }: SignUpVariables) => signUp(teamId, body),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: queryKeys.user.me() }),
        queryClient.invalidateQueries({ queryKey: queryKeys.user.groups() }),
        queryClient.invalidateQueries({
          queryKey: queryKeys.user.memberships(),
        }),
      ]);
    },
  });
}

export function useSignIn() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ body, teamId }: SignInVariables) => signIn(teamId, body),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: queryKeys.user.me() }),
        queryClient.invalidateQueries({ queryKey: queryKeys.user.groups() }),
        queryClient.invalidateQueries({
          queryKey: queryKeys.user.memberships(),
        }),
      ]);
    },
  });
}

export function useRefreshToken() {
  return useMutation({
    mutationFn: ({ body, teamId }: RefreshTokenVariables) =>
      refreshAccessToken(teamId, body),
  });
}

export function useSignInWithOauth() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ body, provider, teamId }: SignInWithOauthVariables) =>
      signInWithOauth(teamId, provider, body),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: queryKeys.user.me() }),
        queryClient.invalidateQueries({ queryKey: queryKeys.user.groups() }),
        queryClient.invalidateQueries({
          queryKey: queryKeys.user.memberships(),
        }),
      ]);
    },
  });
}
