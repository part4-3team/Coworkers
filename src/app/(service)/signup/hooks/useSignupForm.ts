'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useToast } from '@/components/common/toast';
import { ROUTES } from '@/constants/ROUTES';
import { AUTH_FORM_VALIDATION_RULES } from '@/constants/VALIDATION';
import { useSignUpMutation } from '@/hooks/useAuth';

const TEAM_ID = process.env.NEXT_PUBLIC_TEAM_ID;

const signupFormSchema = z
  .object({
    email: z
      .string()
      .trim()
      .min(1, '이메일을 입력해주세요.')
      .email('이메일 형식으로 작성해 주세요.'),
    nickname: z
      .string()
      .trim()
      .min(1, '닉네임을 입력해주세요.')
      .max(
        AUTH_FORM_VALIDATION_RULES.USER_NAME_MAX_LENGTH,
        `이름은 최대 ${AUTH_FORM_VALIDATION_RULES.USER_NAME_MAX_LENGTH}자까지 가능합니다.`,
      ),
    password: z
      .string()
      .min(
        AUTH_FORM_VALIDATION_RULES.USER_PASSWORD_MIN_LENGTH,
        `비밀번호는 최소 ${AUTH_FORM_VALIDATION_RULES.USER_PASSWORD_MIN_LENGTH}자 이상입니다.`,
      )
      .regex(
        AUTH_FORM_VALIDATION_RULES.USER_PASSWORD_ALLOWED_CHARACTERS_REGEX,
        '비밀번호는 숫자, 영문, 특수문자로만 가능합니다.',
      ),
    passwordConfirmation: z.string().min(1, '비밀번호 확인을 입력해주세요.'),
  })
  .refine((values) => values.password === values.passwordConfirmation, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordConfirmation'],
  });

type SignupFormValues = z.infer<typeof signupFormSchema>;

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
    formState: { errors, isValid },
    handleSubmit,
    register,
  } = useForm<SignupFormValues>({
    defaultValues: {
      email: '',
      nickname: '',
      password: '',
      passwordConfirmation: '',
    },
    mode: 'onBlur',
    reValidateMode: 'onChange',
    resolver: zodResolver(signupFormSchema),
  });

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
    isDisabled: !isValid || signUpMutation.isPending,
    nicknameError: errors.nickname?.message,
    nicknameField: register('nickname'),
    passwordConfirmationError: errors.passwordConfirmation?.message,
    passwordConfirmationField: register('passwordConfirmation'),
    passwordError: errors.password?.message,
    passwordField: register('password'),
    serverError,
  };
}
