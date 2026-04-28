'use client';

import { useState } from 'react';

export default function useSignupForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordConfirmError, setPasswordConfirmError] = useState('');

  const handleChangeName = (value: string) => {
    setName(value);
    if (!value) {
      setNameError('');
    } else if (value.length < 2) {
      setNameError('이름은 2자 이상 입력해주세요');
    } else {
      setNameError('');
    }
  };

  const handleChangeEmail = (value: string) => {
    setEmail(value);
    if (!value) {
      setEmailError('');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setEmailError('이메일 형식이 아닙니다');
    } else {
      setEmailError('');
    }
  };

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

  const handleChangePasswordConfirm = (value: string) => {
    setPasswordConfirm(value);
    if (!value) {
      setPasswordConfirmError('');
    } else if (value !== password) {
      setPasswordConfirmError('비밀번호가 일치하지 않습니다');
    } else {
      setPasswordConfirmError('');
    }
  };

  const handleBlurName = () => {
    if (name && name.length < 2) {
      setNameError('이름은 2자 이상 입력해주세요');
    }
  };

  const handleBlurEmail = () => {
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('이메일 형식이 아닙니다');
    }
  };

  const handleBlurPassword = () => {
    if (password && password.length < 8) {
      setPasswordError('비밀번호는 8자 이상 입력해주세요');
    }
  };

  const handleBlurPasswordConfirm = () => {
    if (passwordConfirm && passwordConfirm !== password) {
      setPasswordConfirmError('비밀번호가 일치하지 않습니다');
    }
  };

  const isValid =
    name.length >= 2 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
    password.length >= 8 &&
    passwordConfirm === password &&
    !nameError &&
    !emailError &&
    !passwordError &&
    !passwordConfirmError;

  return {
    name,
    email,
    password,
    passwordConfirm,
    nameError,
    emailError,
    passwordError,
    passwordConfirmError,
    handleChangeName,
    handleChangeEmail,
    handleChangePassword,
    handleChangePasswordConfirm,
    handleBlurName,
    handleBlurEmail,
    handleBlurPassword,
    handleBlurPasswordConfirm,
    isValid,
  };
}
