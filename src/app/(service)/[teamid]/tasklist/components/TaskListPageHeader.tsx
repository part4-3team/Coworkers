/**
 * 할 일 리스트 메인 영역 상단 팀 헤더입니다.
 * 모바일·태블릿: 제목은 flex-none+max-w로 글자 너비만 쓰고 gap-1으로 톱니와 붙임. lg+: 제목 flex-1 팀 카드.
 */

import Image from 'next/image';
import Link from 'next/link';

import { icSettingsLarge, icSettingsSmall } from '@/assets';
import { ROUTES } from '@/constants/ROUTES';
import { cn } from '@/utils/cn';

type TaskListPageHeaderProps = {
  teamName: string;
  className?: string;
};

export default function TaskListPageHeader({
  teamName,
  className,
}: TaskListPageHeaderProps) {
  return (
    <header
      className={cn(
        'flex min-w-0 items-center bg-transparent p-0',
        'h-5 w-full max-w-24.5 gap-1',
        'md:h-7 md:w-34 md:max-w-34 md:shrink-0',
        'lg:h-16 lg:w-full lg:max-w-none lg:gap-0 lg:overflow-hidden lg:rounded-xl lg:border lg:border-background-tertiary lg:bg-background-primary lg:shadow-[0_15px_50px_-12px_rgba(0,0,0,0.05)]',
        className,
      )}
      aria-label="팀"
    >
      <h1
        className={cn(
          'min-w-0 flex-none truncate text-sm font-bold leading-5 text-text-primary',
          'max-w-[calc(100%-1.5rem)]',
          'md:text-lg md:leading-7 md:max-w-[calc(100%-1.75rem)]',
          'lg:max-w-none lg:flex-1 lg:pl-7 lg:text-2xl lg:leading-7',
        )}
      >
        {teamName}
      </h1>
      <Link
        href={ROUTES.MY_PAGE}
        className={cn(
          'inline-flex size-5 shrink-0 items-center justify-center',
          'md:size-6',
          'lg:mr-7',
        )}
        aria-label="계정 설정으로 이동"
      >
        <Image
          src={icSettingsSmall}
          alt=""
          width={24}
          height={24}
          className="size-5 md:size-6 lg:hidden"
        />
        <Image
          src={icSettingsLarge}
          alt=""
          width={24}
          height={24}
          className="hidden lg:block"
        />
      </Link>
    </header>
  );
}
