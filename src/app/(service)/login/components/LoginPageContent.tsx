/**
 * 로그인 페이지의 전체 배치를 렌더링하는 컴포넌트입니다.
 */

'use client';

import LoginForm from './LoginForm';

export default function LoginPageContent() {
  return (
    <div className="min-h-screen bg-background-secondary px-5 py-10 md:px-6.5 md:py-17.5 2xl:px-21 2xl:py-22.5">
      <div className="mx-auto flex min-h-[calc(100vh-80px)] w-full items-center justify-center">
        <LoginForm />
      </div>
    </div>
  );
}
