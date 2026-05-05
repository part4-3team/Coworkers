/**
 * 카카오 OAuth 콜백 후 로그인을 이어서 처리하는 페이지입니다.
 */

import OAuthSignupPageContent from '@/app/(service)/oauth/signup/[provider]/components/OAuthSignupPageContent';

type OAuthCallbackPageProps = {
  params: Promise<{ provider: string }>;
  searchParams: Promise<{
    code?: string;
    error?: string;
    state?: string;
  }>;
};

export default async function OAuthCallbackPage({
  params,
  searchParams,
}: OAuthCallbackPageProps) {
  const { provider } = await params;
  const { code, error, state } = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center bg-background-secondary px-4 py-10">
      <OAuthSignupPageContent
        code={code}
        error={error}
        provider={provider}
        state={state}
      />
    </div>
  );
}
