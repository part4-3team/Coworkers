import { withAuth } from 'next-auth/middleware';

export default withAuth({
  pages: {
    signIn: '/login',
  },
});

export const config = {
  matcher: [
    '/addteam',
    '/jointeam',
    '/myhistory',
    '/mypage',
    '/boards/:path*',
    // '/((?!$|login|signup|oauth|api|_next/static|_next/image|favicon.ico|reset-password|password-reset).*)',
  ],
};
