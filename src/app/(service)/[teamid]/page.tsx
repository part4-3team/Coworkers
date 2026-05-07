/**
 * 팀 페이지를 구성하는 파일입니다.
 */
'use client';
import { use } from 'react';

import { useQuery } from '@tanstack/react-query';

import { getMyGroups } from '@/api/userApi';
import NoGroups from '@/app/(service)/[teamid]/components/NoGroups';
import TeamMemberList from '@/app/(service)/[teamid]/components/TeamMemberList';
import TeamProgress from '@/app/(service)/[teamid]/components/TeamProgress';
import TeamTaskList from '@/app/(service)/[teamid]/components/TeamTaskList';

import { GroupType } from './types';

export default function TaskDetailPage({
  params,
}: {
  params: Promise<{ teamid: string }>;
}) {
  const { teamid } = use(params);

  const { data, isLoading } = useQuery({
    queryKey: ['myGroups'],
    queryFn: () => getMyGroups() as Promise<GroupType[]>,
  });

  console.log('data', data);
  if (isLoading) return <div>로딩 중...</div>;

  const isMyGroup = (data ?? []).some((group) => String(group.id) === teamid);

  if (!isMyGroup) return <NoGroups />;

  return (
    <div className="flex gap-4 flex-wrap pb-30 md:gap-8 md:px-6 md:pt-18 xl:w-full xl:py-30 xl:max-w-7xl xl:px-20">
      <TeamProgress />
      <div className="flex w-full xl:border-t xl:border-background-tertiary xl:pt-8 xl:gap-6">
        <TeamTaskList />
        <TeamMemberList />
      </div>
    </div>
  );
}
