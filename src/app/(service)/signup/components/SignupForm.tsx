'use client';

import Link from 'next/link';

import { SIGNUP_LINKS, SIGNUP_TEXT } from '@/app/(service)/signup/constants';
import useSignupForm from '@/app/(service)/signup/hooks/useSignupForm';
import { IcKakaotalk, ImgLogoFullLarge } from '@/assets';
import { PrimaryButton } from '@/components/common/button';
import { AuthInput } from '@/components/common/form';

export default function SignupForm() {
  const {
    emailField,
    emailError,
    isDisabled,
    nicknameField,
    nicknameError,
    passwordConfirmationField,
    passwordConfirmationError,
    passwordField,
    passwordError,
    serverError,
    handleSubmit,
  } = useSignupForm();

  return (
    <section className="mx-auto w-full max-w-lg rounded-[20px] bg-background-inverse px-5.25 py-9.25 md:px-8 md:py-12.5">
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

      <h1 className="mb-6 text-center text-base font-semibold text-text-primary md:mb-8 md:text-lg">
        {SIGNUP_TEXT.title}
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5 md:px-6">
        <AuthInput
          label={SIGNUP_TEXT.nicknameLabel}
          placeholder={SIGNUP_TEXT.nicknamePlaceholder}
          errorMessage={nicknameError}
          {...nicknameField}
        />

        <AuthInput
          label={SIGNUP_TEXT.emailLabel}
          type="email"
          placeholder={SIGNUP_TEXT.emailPlaceholder}
          errorMessage={emailError}
          {...emailField}
        />

        <AuthInput
          label={SIGNUP_TEXT.passwordLabel}
          type="password"
          placeholder={SIGNUP_TEXT.passwordPlaceholder}
          errorMessage={passwordError}
          {...passwordField}
        />

        <AuthInput
          label={SIGNUP_TEXT.passwordConfirmationLabel}
          type="password"
          placeholder={SIGNUP_TEXT.passwordConfirmationPlaceholder}
          errorMessage={passwordConfirmationError}
          {...passwordConfirmationField}
        />

        {serverError && (
          <p className="text-center text-xs font-medium text-status-danger md:text-sm">
            {serverError}
          </p>
        )}

        <PrimaryButton
          type="submit"
          disabled={isDisabled}
          className="max-w-none"
        >
          {SIGNUP_TEXT.signupButton}
        </PrimaryButton>
      </form>

      <p className="mt-6 text-center text-xs text-text-secondary md:text-sm">
        {SIGNUP_TEXT.loginGuide}
        <Link
          href={SIGNUP_LINKS.login}
          className="ml-1 font-medium text-brand-primary underline"
        >
          {SIGNUP_TEXT.loginLink}
        </Link>
      </p>

      <div className="mx-auto mt-10 flex w-full max-w-md items-center gap-4 md:px-6">
        <div className="h-px flex-1 bg-background-tertiary" />
        <span className="text-xs text-text-secondary md:text-sm">
          {SIGNUP_TEXT.divider}
        </span>
        <div className="h-px flex-1 bg-background-tertiary" />
      </div>

      <div className="mx-auto mt-4 flex h-11 w-full max-w-md items-center justify-between md:px-6 ">
        <span className="text-sm text-text-secondary">
          {SIGNUP_TEXT.kakaoSignUp}
        </span>
        <IcKakaotalk
          width={44}
          height={44}
          className="h-11 w-11 cursor-pointer"
          role="img"
          aria-label="카카오 아이콘"
        />
      </div>
    </section>
  );
}
