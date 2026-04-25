'use client';

import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { icKakaotalk } from '@/assets';
import { PrimaryButton } from '@/components/common/button';
import { AuthInput } from '@/components/common/form';
import Logo from '@/components/common/logo/Logo';
import Modal from '@/components/common/modal';

import { LOGIN_LINKS, LOGIN_TEXT } from '../constants';
import useLoginForm from '../hooks/useLoginForm';

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
    <section className="mx-auto h-[720px] w-full max-w-[550px] rounded-[20px] bg-background-inverse px-6 py-8 shadow-sm md:px-8 md:py-10">
      {/* 로고 */}
      <div className="mb-8 flex justify-center md:mb-10">
        <Logo className="h-auto w-32 md:w-40" />
      </div>

      {/* 타이틀 */}
      <h1 className="mb-6 text-center text-base font-semibold text-text-primary md:mb-8 md:text-lg">
        {LOGIN_TEXT.title}
      </h1>

      {/* 폼 */}
      <form className="flex flex-col gap-5 px-[45px]">
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

        <PrimaryButton type="button" disabled={!isValid}>
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
      <div className="mx-auto mt-10 flex w-full max-w-[460px] items-center gap-4 px-[45px]">
        <div className="h-px flex-1 bg-background-tertiary" />
        <span className="text-xs text-text-secondary md:text-sm">OR</span>
        <div className="h-px flex-1 bg-background-tertiary" />
      </div>

      {/* 간편 로그인 */}
      <div className="mx-auto mt-4 flex h-[42px] w-full max-w-[460px] items-center justify-between px-[45px]">
        <span className="text-sm text-text-secondary">간편 로그인하기</span>
        <Image
          src={icKakaotalk}
          alt="카카오 아이콘"
          width={42}
          height={42}
          className="h-[42px] w-[42px]"
        />
      </div>

      {/* 비밀번호 찾기 모달 */}
      {isForgotPasswordModalOpen && (
        <Modal
          hasCloseButton
          title="비밀번호를 잊으셨나요?"
          description="가입한 이메일을 입력하시면 비밀번호 재설정 링크를 보내드립니다."
          lineButtonText="닫기"
          primaryButtonText="링크 보내기"
          onClose={() => setIsForgotPasswordModalOpen(false)}
          onLineButtonClick={() => setIsForgotPasswordModalOpen(false)}
          onPrimaryButtonClick={() => setIsForgotPasswordModalOpen(false)}
        >
          <div className="mt-4">
            <input
              type="text"
              placeholder="이메일을 입력해주세요"
              className="h-12 w-80 rounded-xl border border-border-secondary px-4 text-sm outline-none placeholder:text-text-secondary focus:border-brand-primary"
            />
          </div>
        </Modal>
      )}
    </section>
  );
}
