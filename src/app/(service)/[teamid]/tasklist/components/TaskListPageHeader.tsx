/**
 * 할 일 리스트 메인 영역 상단 팀 헤더입니다.
 * 치수·테두리·그림자는 피그마 스펙에 맞춥니다.
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
        'flex h-16 w-full items-center overflow-hidden rounded-xl border border-background-tertiary bg-background-primary shadow-[0_15px_50px_-12px_rgba(0,0,0,0.05)]',
        className,
      )}
      aria-label="팀 카드"
    >
      <h1 className="min-w-0 flex-1 truncate pl-[26px] text-2xl font-bold leading-7 text-text-primary">
        {teamName}
      </h1>
      <Link
        href={ROUTES.MY_PAGE}
        className="mr-[26px] inline-flex size-6 shrink-0 items-center justify-center"
        aria-label="계정 설정으로 이동"
      >
        <Image
          src={icSettingsSmall}
          alt=""
          width={24}
          height={24}
          className="md:hidden"
        />
        <Image
          src={icSettingsLarge}
          alt=""
          width={24}
          height={24}
          className="hidden md:block"
        />
      </Link>
    </header>
  );
}
