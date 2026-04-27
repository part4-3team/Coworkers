'use client';

import { useState } from 'react';

export default function useLoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // 이메일 변경
  const handleChangeEmail = (value: string) => {
    setEmail(value);

    // 입력 중 실시간 검증
    if (!value) {
      setEmailError('');
    } else if (!value.includes('@')) {
      setEmailError('이메일 형식이 아닙니다');
    } else {
      setEmailError('');
    }
  };

  // 비밀번호 변경
  const handleChangePassword = (value: string) => {
    setPassword(value);

    if (!value) {
      setPasswordError('');
    } else if (value.length < 8) {
      setPasswordError('비밀번호는 8자 이상 입력해주세요');
    } else {
      setPasswordError('');
    }
  };

  // blur 시 한 번 더 검증 (선택)
  const handleBlurEmail = () => {
    if (email && !email.includes('@')) {
      setEmailError('이메일 형식이 아닙니다');
    }
  };

  const handleBlurPassword = () => {
    if (password && password.length < 8) {
      setPasswordError('비밀번호는 8자 이상 입력해주세요');
    }
  };

  // 전체 유효성
  const isValid =
    email.includes('@') &&
    password.length >= 8 &&
    !emailError &&
    !passwordError;

  return {
    email,
    password,
    emailError,
    passwordError,
    handleChangeEmail,
    handleChangePassword,
    handleBlurEmail,
    handleBlurPassword,
    isValid,
  };
}
