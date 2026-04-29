'use client';

import { useState } from 'react';

import Link from 'next/link';

import ForgotPasswordModal from '@/app/(service)/login/components/ForgotPasswordModal';
import { LOGIN_LINKS, LOGIN_TEXT } from '@/app/(service)/login/constants';
import useLoginForm from '@/app/(service)/login/hooks/useLoginForm';
import { IcKakaotalk, ImgLogoFullLarge } from '@/assets';
import { PrimaryButton } from '@/components/common/button';
import { AuthInput } from '@/components/common/form';

export default function LoginForm() {
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] =
    useState(false);

  const {
    emailError,
    emailField,
    handleSubmit,
    isDisabled,
    passwordError,
    passwordField,
    serverError,
  } = useLoginForm();

  return (
    <section className="mx-auto w-full max-w-lg rounded-[20px] bg-background-inverse px-5.25 py-9.25 md:px-8 md:py-12.5">
      {/* 로고 */}
      <div className="mb-8 flex justify-center md:mb-10">
        <ImgLogoFullLarge
          width={210}
          height={35}
          className="h-auto w-52"
          style={{ height: 'auto' }}
          role="img"
          aria-label="Coworkers 로고"
        />
      </div>

      {/* 타이틀 */}
      <h1 className="mb-6 text-center text-base font-semibold text-text-primary md:mb-8 md:text-lg">
        {LOGIN_TEXT.title}
      </h1>

      {/* 폼 */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 md:px-6">
        <AuthInput
          label={LOGIN_TEXT.emailLabel}
          type="text"
          errorMessage={emailError}
          placeholder={LOGIN_TEXT.emailPlaceholder}
          {...emailField}
        />

        <AuthInput
          label={LOGIN_TEXT.passwordLabel}
          type="password"
          errorMessage={passwordError}
          placeholder={LOGIN_TEXT.passwordPlaceholder}
          {...passwordField}
        />

        {serverError && (
          <p className="text-center text-xs font-medium text-status-danger md:text-sm">
            {serverError}
          </p>
        )}

        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => setIsForgotPasswordModalOpen(true)}
            className="text-xs font-medium text-brand-primary underline md:text-sm"
          >
            {LOGIN_TEXT.forgotPassword}
          </button>
        </div>

        <PrimaryButton type="submit" disabled={isDisabled}>
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
        <IcKakaotalk
          width={42}
          height={42}
          className="h-11 w-11 cursor-pointer"
          role="img"
          aria-label="카카오 아이콘"
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
