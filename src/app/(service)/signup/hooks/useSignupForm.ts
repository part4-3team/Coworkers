'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';

import { useToast } from '@/components/common/toast';
import { ROUTES } from '@/constants/ROUTES';
import { useSignUpMutation } from '@/hooks/useAuth';
import { signUpFormSchema, type SignUpFormValues } from '@/types/auth';

const TEAM_ID = process.env.NEXT_PUBLIC_TEAM_ID;

export default function useSignupForm() {
  const router = useRouter();
  const { showToast } = useToast();
  const [serverError, setServerError] = useState('');
  const signUpMutation = useSignUpMutation({
    onError: (error) => {
      setServerError(error.message);
    },
    onSuccess: () => {
      showToast('가입이 완료되었습니다.', 'success');
      router.push(ROUTES.LOGIN);
    },
  });
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<SignUpFormValues>({
    defaultValues: {
      email: '',
      nickname: '',
      password: '',
      passwordConfirmation: '',
    },
    mode: 'onBlur',
    reValidateMode: 'onChange',
    resolver: zodResolver(signUpFormSchema),
  });
  const [email, nickname, password, passwordConfirmation] = useWatch({
    control,
    name: ['email', 'nickname', 'password', 'passwordConfirmation'],
  });
  const isSubmittable = signUpFormSchema.safeParse({
    email,
    nickname,
    password,
    passwordConfirmation,
  }).success;

  const handleSubmitForm = handleSubmit((values) => {
    setServerError('');

    if (!TEAM_ID) {
      setServerError('팀 정보가 설정되지 않았습니다.');
      return;
    }

    signUpMutation.mutate({
      body: values,
      teamId: TEAM_ID,
    });
  });

  return {
    emailError: errors.email?.message,
    emailField: register('email'),
    handleSubmit: handleSubmitForm,
    isDisabled: !isSubmittable || signUpMutation.isPending,
    nicknameError: errors.nickname?.message,
    nicknameField: register('nickname'),
    passwordConfirmationError: errors.passwordConfirmation?.message,
    passwordConfirmationField: register('passwordConfirmation'),
    passwordError: errors.password?.message,
    passwordField: register('password'),
    serverError,
  };
}
