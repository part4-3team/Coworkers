import { withAuth } from 'next-auth/middleware';

export default withAuth({
  pages: {
    signIn: '/login',
  },
});

export const config = {
  // TODO: UI 구현 완료 후 인증/API 연결 단계에서 보호 라우트 matcher를 복구한다.
  matcher: [
    // '/addteam',
    // '/jointeam',
    // '/myhistory',
    // '/mypage',
    // '/boards/:path*',
    // '/((?!$|login|signup|oauth|api|_next/static|_next/image|favicon.ico|reset-password|password-reset).*)',
  ],
};
