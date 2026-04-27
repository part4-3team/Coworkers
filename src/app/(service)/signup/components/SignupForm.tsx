'use client';

import Image from 'next/image';
import Link from 'next/link';

import { SIGNUP_LINKS, SIGNUP_TEXT } from '@/app/(service)/signup/constants';
import useSignupForm from '@/app/(service)/signup/hooks/useSignupForm';
import { icKakaotalk, imgLogoFullLarge } from '@/assets';
import { PrimaryButton } from '@/components/common/button';
import { AuthInput } from '@/components/common/form';

export default function SignupForm() {
  const {
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
  } = useSignupForm();

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
        />
      </div>

      {/* 타이틀 */}
      <h1 className="mb-6 text-center text-base font-semibold text-text-primary md:mb-8 md:text-lg">
        {SIGNUP_TEXT.title}
      </h1>

      {/* 폼 */}
      <form className="flex flex-col gap-5 md:px-6">
        <AuthInput
          label={SIGNUP_TEXT.nameLabel}
          type="text"
          value={name}
          onChange={(e) => handleChangeName(e.target.value)}
          onBlur={handleBlurName}
          errorMessage={nameError}
          placeholder={SIGNUP_TEXT.namePlaceholder}
        />

        <AuthInput
          label={SIGNUP_TEXT.emailLabel}
          type="text"
          value={email}
          onChange={(e) => handleChangeEmail(e.target.value)}
          onBlur={handleBlurEmail}
          errorMessage={emailError}
          placeholder={SIGNUP_TEXT.emailPlaceholder}
        />

        <AuthInput
          label={SIGNUP_TEXT.passwordLabel}
          type="password"
          value={password}
          onChange={(e) => handleChangePassword(e.target.value)}
          onBlur={handleBlurPassword}
          errorMessage={passwordError}
          placeholder={SIGNUP_TEXT.passwordPlaceholder}
        />

        <AuthInput
          label={SIGNUP_TEXT.passwordConfirmLabel}
          type="password"
          value={passwordConfirm}
          onChange={(e) => handleChangePasswordConfirm(e.target.value)}
          onBlur={handleBlurPasswordConfirm}
          errorMessage={passwordConfirmError}
          placeholder={SIGNUP_TEXT.passwordConfirmPlaceholder}
        />

        <PrimaryButton type="submit" disabled={!isValid}>
          {SIGNUP_TEXT.signupButton}
        </PrimaryButton>
      </form>

      {/* 로그인 */}
      <p className="mt-6 text-center text-xs text-text-secondary md:text-sm">
        {SIGNUP_TEXT.loginGuide}
        <Link
          href={SIGNUP_LINKS.login}
          className="ml-1 font-medium text-brand-primary underline"
        >
          {SIGNUP_TEXT.loginLink}
        </Link>
      </p>

      {/* OR */}
      <div className="mx-auto mt-10 flex w-full max-w-md items-center gap-4 md:px-6">
        <div className="h-px flex-1 bg-background-tertiary" />
        <span className="text-xs text-text-secondary md:text-sm">OR</span>
        <div className="h-px flex-1 bg-background-tertiary" />
      </div>

      {/* 간편 회원가입 */}
      <div className="mx-auto mt-4 flex h-11 w-full max-w-md items-center justify-between md:px-6">
        <span className="text-sm text-text-secondary">
          {SIGNUP_TEXT.kakaoSignup}
        </span>
        <Image
          src={icKakaotalk}
          alt="카카오 아이콘"
          width={42}
          height={42}
          className="h-11 w-11"
        />
      </div>
    </section>
  );
}
