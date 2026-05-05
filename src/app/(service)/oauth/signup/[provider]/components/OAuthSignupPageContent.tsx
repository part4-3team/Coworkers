'use client';

import Link from 'next/link';

import { OAUTH_SIGNUP_TEXT } from '@/app/(service)/oauth/signup/[provider]/constants';
import useOauthSignupPage from '@/app/(service)/oauth/signup/[provider]/hooks/useOauthSignupPage';
import { PrimaryButton } from '@/components/common/button';
import FullLogo from '@/components/common/logo/FullLogo';
import { ROUTES } from '@/constants/ROUTES';

type OAuthSignupPageContentProps = {
  code?: string;
  error?: string;
  provider: string;
  state?: string;
};

export default function OAuthSignupPageContent({
  code,
  error,
  provider,
  state,
}: OAuthSignupPageContentProps) {
  const { errorMessage, handleGoLogin, isPending } = useOauthSignupPage({
    code,
    error,
    provider,
    state,
  });
  const isLoading = !errorMessage && (isPending || Boolean(code));

  return (
    <section className="mx-auto w-full max-w-lg rounded-[20px] bg-background-inverse px-5.25 py-9.25 md:px-8 md:py-12.5">
      <h1 className="mb-8 flex justify-center md:mb-10">
        <Link href={ROUTES.HOME} aria-label="Coworkers 홈으로 이동">
          <FullLogo
            size="auth"
            className="origin-center scale-90 md:scale-100"
          />
        </Link>
      </h1>

      <h2 className="mb-4 text-center text-base font-semibold text-text-primary md:text-lg">
        {isLoading
          ? OAUTH_SIGNUP_TEXT.loadingTitle
          : OAUTH_SIGNUP_TEXT.errorTitle}
      </h2>

      <p className="text-center text-sm leading-6 text-text-secondary">
        {isLoading
          ? OAUTH_SIGNUP_TEXT.loadingDescription
          : errorMessage || OAUTH_SIGNUP_TEXT.defaultError}
      </p>

      {!isLoading && (
        <div className="mt-8">
          <PrimaryButton
            type="button"
            className="max-w-none"
            onClick={handleGoLogin}
          >
            {OAUTH_SIGNUP_TEXT.loginButton}
          </PrimaryButton>
        </div>
      )}
    </section>
  );
}
