/**
 * 로그인 페이지의 전체 배치를 렌더링하는 컴포넌트입니다.
 */

'use client';

import LoginForm from '@/app/(service)/login/components/LoginForm';

export default function LoginPageContent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background-secondary px-4 py-10">
      <LoginForm />
    </div>
  );
}
