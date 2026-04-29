import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { ROUTES } from '@/constants/ROUTES';

const PUBLIC_PATH_PREFIXES = [
  ROUTES.LOGIN,
  ROUTES.SIGNUP,
  '/oauth',
  '/reset-password',
  '/password-reset',
] as const;

function isPublicPath(pathname: string) {
  return (
    pathname === ROUTES.HOME ||
    PUBLIC_PATH_PREFIXES.some((path) => pathname.startsWith(path))
  );
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  const accessToken = request.cookies.get('access-token')?.value;

  if (!accessToken) {
    return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
