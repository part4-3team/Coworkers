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
import {
  createMutationOptions,
  type MutationOptionsOverrides,
} from '@/api/queryOptions/factory';

type SignUpData = Awaited<ReturnType<typeof signUp>>;
type SignInData = Awaited<ReturnType<typeof signIn>>;
type RefreshAccessTokenData = Awaited<ReturnType<typeof refreshAccessToken>>;
type SignInWithOauthData = Awaited<ReturnType<typeof signInWithOauth>>;

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

export function useSignUpMutation(
  options?: MutationOptionsOverrides<SignUpData, SignUpVariables>,
) {
  const queryClient = useQueryClient();
  const handleSuccess = options?.onSuccess;

  return useMutation(
    createMutationOptions({
      mutationFn: ({ body, teamId }: SignUpVariables) => signUp(teamId, body),
      options: {
        ...options,
        onSuccess: async (data, variables, onMutateResult, context) => {
          await Promise.all([
            queryClient.invalidateQueries({ queryKey: queryKeys.user.me() }),
            queryClient.invalidateQueries({
              queryKey: queryKeys.user.groups(),
            }),
            queryClient.invalidateQueries({
              queryKey: queryKeys.user.memberships(),
            }),
          ]);
          await handleSuccess?.(data, variables, onMutateResult, context);
        },
      },
    }),
  );
}

export function useSignInMutation(
  options?: MutationOptionsOverrides<SignInData, SignInVariables>,
) {
  const queryClient = useQueryClient();
  const handleSuccess = options?.onSuccess;

  return useMutation(
    createMutationOptions({
      mutationFn: ({ body, teamId }: SignInVariables) => signIn(teamId, body),
      options: {
        ...options,
        onSuccess: async (data, variables, onMutateResult, context) => {
          await Promise.all([
            queryClient.invalidateQueries({ queryKey: queryKeys.user.me() }),
            queryClient.invalidateQueries({
              queryKey: queryKeys.user.groups(),
            }),
            queryClient.invalidateQueries({
              queryKey: queryKeys.user.memberships(),
            }),
          ]);
          await handleSuccess?.(data, variables, onMutateResult, context);
        },
      },
    }),
  );
}

export function useRefreshTokenMutation(
  options?: MutationOptionsOverrides<
    RefreshAccessTokenData,
    RefreshTokenVariables
  >,
) {
  return useMutation(
    createMutationOptions({
      mutationFn: ({ body, teamId }: RefreshTokenVariables) =>
        refreshAccessToken(teamId, body),
      options,
    }),
  );
}

export function useSignInWithOauthMutation(
  options?: MutationOptionsOverrides<
    SignInWithOauthData,
    SignInWithOauthVariables
  >,
) {
  const queryClient = useQueryClient();
  const handleSuccess = options?.onSuccess;

  return useMutation(
    createMutationOptions({
      mutationFn: ({ body, provider, teamId }: SignInWithOauthVariables) =>
        signInWithOauth(teamId, provider, body),
      options: {
        ...options,
        onSuccess: async (data, variables, onMutateResult, context) => {
          await Promise.all([
            queryClient.invalidateQueries({ queryKey: queryKeys.user.me() }),
            queryClient.invalidateQueries({
              queryKey: queryKeys.user.groups(),
            }),
            queryClient.invalidateQueries({
              queryKey: queryKeys.user.memberships(),
            }),
          ]);
          await handleSuccess?.(data, variables, onMutateResult, context);
        },
      },
    }),
  );
}
