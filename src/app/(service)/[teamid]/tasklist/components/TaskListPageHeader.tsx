/**
 * 할 일 리스트 메인 영역 상단 팀 헤더입니다.
 * 모바일·태블릿: 제목은 flex-none+max-w로 글자 너비만 쓰고 gap-1으로 톱니와 붙임. lg+: 제목 flex-1 팀 카드.
 * 톱니: 수정하기(팀 설정 이동) · 삭제하기(확인 모달) 드롭다운.
 */

'use client';

import { useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import TaskListTaskRowOptionsMenu from '@/app/(service)/[teamid]/tasklist/components/TaskListTaskRowOptionsMenu';
import TaskListTeamPageDeleteModal from '@/app/(service)/[teamid]/tasklist/components/TaskListTeamPageDeleteModal';
import { icSettingsLarge, icSettingsSmall } from '@/assets';
import { cn } from '@/utils/cn';

type TaskListPageHeaderProps = {
  teamId: string;
  teamName: string;
  className?: string;
  onConfirmTeamPageDelete?: () => void;
};

export default function TaskListPageHeader({
  teamId,
  teamName,
  className,
  onConfirmTeamPageDelete,
}: TaskListPageHeaderProps) {
  const router = useRouter();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleConfirmDelete = () => {
    onConfirmTeamPageDelete?.();
    setIsDeleteModalOpen(false);
  };

  return (
    <>
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
            'min-w-0 flex-none truncate font-bold text-text-primary',
            'text-base leading-5',
            'max-w-[calc(100%-1.5rem)]',
            'md:text-2xl md:leading-7 md:max-w-[calc(100%-1.75rem)]',
            'lg:max-w-none lg:flex-1 lg:pl-7',
          )}
        >
          {teamName}
        </h1>
        <TaskListTaskRowOptionsMenu
          className={cn(
            'inline-flex shrink-0 items-center justify-center',
            'lg:mr-7',
          )}
          items={[
            {
              label: '수정하기',
              onClick: () => {
                router.push(`/${teamId}/edit`);
              },
            },
            {
              label: '삭제하기',
              onClick: () => {
                setIsDeleteModalOpen(true);
              },
            },
          ]}
          trigger={
            <>
              <span className="sr-only">{`${teamName} 팀 메뉴 열기`}</span>
              <span className="inline-flex size-5 items-center justify-center md:size-6">
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
              </span>
            </>
          }
        />
      </header>

      {isDeleteModalOpen ? (
        <TaskListTeamPageDeleteModal
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleConfirmDelete}
        />
      ) : null}
    </>
  );
}
