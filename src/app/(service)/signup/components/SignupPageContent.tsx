/**
 * 회원가입 페이지의 전체 배치를 렌더링하는 컴포넌트입니다.
 */

'use client';

import SignupForm from '@/app/(service)/signup/components/SignupForm';

export default function SignupPageContent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background-secondary px-5 py-10">
      <SignupForm />
    </div>
  );
}
