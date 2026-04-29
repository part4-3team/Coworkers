'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { ERROR_MESSAGES } from '@/constants/ERROR_MESSAGES';
import { ROUTES } from '@/constants/ROUTES';
import { useSignInMutation } from '@/hooks/useAuth';
import { loginFormSchema, type LoginFormValues } from '@/types/auth';
import { extractAuthSession, saveAuthSession } from '@/utils/authSession';

const TEAM_ID = process.env.NEXT_PUBLIC_TEAM_ID;

export default function useLoginForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState('');
  const signInMutation = useSignInMutation({
    onError: () => {
      setServerError(ERROR_MESSAGES.LOGIN_FAILED);
    },
    onSuccess: (data) => {
      const session = extractAuthSession(data);

      if (!session) {
        setServerError('로그인 응답을 확인할 수 없습니다.');
        return;
      }

      saveAuthSession(session);

      if (!TEAM_ID) {
        router.push(ROUTES.HOME);
        return;
      }

      router.push(ROUTES.TEAM(TEAM_ID));
    },
  });

  const {
    formState: { errors, isValid },
    handleSubmit,
    register,
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur',
    reValidateMode: 'onChange',
    resolver: zodResolver(loginFormSchema),
  });

  const handleSubmitForm = handleSubmit((values) => {
    setServerError('');

    if (!TEAM_ID) {
      setServerError('팀 정보가 설정되지 않았습니다.');
      return;
    }

    signInMutation.mutate({
      body: values,
      teamId: TEAM_ID,
    });
  });

  return {
    emailError: errors.email?.message,
    emailField: register('email'),
    handleSubmit: handleSubmitForm,
    isDisabled: !isValid || signInMutation.isPending,
    passwordError: errors.password?.message,
    passwordField: register('password'),
    serverError,
  };
}
