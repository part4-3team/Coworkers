/**
 * 랜딩 페이지의 초기 화면을 구성하는 페이지 컴포넌트입니다.
 */

import Logo from '@/components/common/Logo';

export default function MainPage() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-6 py-16 text-center">
      <section className="flex max-w-2xl flex-col items-center gap-5">
        <Logo />
        <h1 className="text-4xl font-bold text-text-primary md:text-5xl">
          함께 일하는 하루를 더 선명하게
        </h1>
        <p className="text-base leading-7 text-text-secondary md:text-lg">
          팀의 할 일과 진행 상황을 한곳에서 정리하는 협업 도구입니다.
        </p>
      </section>
    </main>
  );
}
