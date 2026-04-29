'use client';

import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import ForgotPasswordModal from '@/app/(service)/login/components/ForgotPasswordModal';
import { LOGIN_LINKS, LOGIN_TEXT } from '@/app/(service)/login/constants';
import useLoginForm from '@/app/(service)/login/hooks/useLoginForm';
import { icKakaotalk, imgLogoFullLarge } from '@/assets';
import { PrimaryButton } from '@/components/common/button';
import { AuthInput } from '@/components/common/form';

export default function LoginForm() {
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] =
    useState(false);

  const {
    email,
    password,
    emailError,
    passwordError,
    handleChangeEmail,
    handleChangePassword,
    handleBlurEmail,
    handleBlurPassword,
    isValid,
  } = useLoginForm();

  return (
    <section className="mx-auto w-full max-w-lg rounded-[20px] bg-background-inverse px-6 py-8 shadow-md md:px-8 md:py-10">
      {/* 로고 */}
      <div className="mb-8 flex justify-center md:mb-10">
        <Image
          src={imgLogoFullLarge}
          alt="Coworkers 로고"
          width={210}
          height={35}
          className="h-auto w-52"
          style={{ height: 'auto' }}
        />
      </div>

      {/* 타이틀 */}
      <h1 className="mb-6 text-center text-base font-semibold text-text-primary md:mb-8 md:text-lg">
        {LOGIN_TEXT.title}
      </h1>

      {/* 폼 */}
      <form className="flex flex-col gap-5 md:px-6">
        <AuthInput
          label={LOGIN_TEXT.emailLabel}
          type="text"
          value={email}
          onChange={(e) => handleChangeEmail(e.target.value)}
          onBlur={handleBlurEmail}
          errorMessage={emailError}
          placeholder={LOGIN_TEXT.emailPlaceholder}
        />

        <AuthInput
          label={LOGIN_TEXT.passwordLabel}
          type="password"
          value={password}
          onChange={(e) => handleChangePassword(e.target.value)}
          onBlur={handleBlurPassword}
          errorMessage={passwordError}
          placeholder={LOGIN_TEXT.passwordPlaceholder}
        />

        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => setIsForgotPasswordModalOpen(true)}
            className="text-xs font-medium text-brand-primary underline md:text-sm"
          >
            {LOGIN_TEXT.forgotPassword}
          </button>
        </div>

        <PrimaryButton type="submit" disabled={!isValid}>
          {LOGIN_TEXT.loginButton}
        </PrimaryButton>
      </form>

      {/* 회원가입 */}
      <p className="mt-6 text-center text-xs text-text-secondary md:text-sm">
        아직 계정이 없으신가요?
        <Link
          href={LOGIN_LINKS.signup}
          className="ml-1 font-medium text-brand-primary underline"
        >
          가입하기
        </Link>
      </p>

      {/* OR */}
      <div className="mx-auto mt-10 flex w-full max-w-md items-center gap-4 md:px-6">
        <div className="h-px flex-1 bg-background-tertiary" />
        <span className="text-xs text-text-secondary md:text-sm">OR</span>
        <div className="h-px flex-1 bg-background-tertiary" />
      </div>

      {/* 간편 로그인 */}
      <div className="mx-auto mt-4 flex h-11 w-full max-w-md items-center justify-between md:px-6">
        <span className="text-sm text-text-secondary">간편 로그인하기</span>
        <Image
          src={icKakaotalk}
          alt="카카오 아이콘"
          width={42}
          height={42}
          className="h-11 w-11"
        />
      </div>

      {isForgotPasswordModalOpen && (
        <ForgotPasswordModal
          onClose={() => setIsForgotPasswordModalOpen(false)}
        />
      )}
    </section>
  );
}
