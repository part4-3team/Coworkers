import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { ROUTES } from '@/constants/ROUTES';

const SUPPORTED_OAUTH_PROVIDER = 'kakao';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ provider: string }> },
) {
  const { provider } = await context.params;

  if (provider !== SUPPORTED_OAUTH_PROVIDER) {
    return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url));
  }

  const clientId = process.env.KAKAO_CLIENT_ID;

  if (!clientId) {
    return NextResponse.redirect(
      new URL(`${ROUTES.LOGIN}?error=oauth_not_configured`, request.url),
    );
  }

  const redirectUri = new URL(ROUTES.OAUTH_CALLBACK(provider), request.url);
  const authorizeUrl = new URL('https://kauth.kakao.com/oauth/authorize');

  authorizeUrl.searchParams.set('client_id', clientId);
  authorizeUrl.searchParams.set('redirect_uri', redirectUri.toString());
  authorizeUrl.searchParams.set('response_type', 'code');

  return NextResponse.redirect(authorizeUrl);
}
