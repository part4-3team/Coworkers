/**
 * 팀 페이지를 구성하는 파일입니다.
 */
'use client';
import { use } from 'react';

import NoGroups from '@/app/(service)/[teamid]/components/NoGroups';
import TeamMemberList from '@/app/(service)/[teamid]/components/TeamMemberList';
import TeamProgress from '@/app/(service)/[teamid]/components/TeamProgress';
import TeamTaskList from '@/app/(service)/[teamid]/components/TeamTaskList';
import { SIDEBAR_TEAMS } from '@/components/layout/sidebar/constants';

export default function TaskDetailPage({
  params,
}: {
  params: Promise<{ teamid: string }>;
}) {
  const { teamid } = use(params);
  const teamName =
    SIDEBAR_TEAMS.find((team) => team.id === teamid)?.name ?? '팀 메인';

  if (teamid === 'nogroup') {
    return <NoGroups />;
  }

  return (
    <>
      <h1 className="sr-only">{teamName}</h1>
      <div className="flex gap-4 flex-wrap pb-30 md:gap-8 md:px-6 md:pt-18 xl:w-full xl:py-30 xl:max-w-7xl xl:px-20">
        <TeamProgress />
        <div className="flex w-full xl:border-t xl:border-background-tertiary xl:pt-8 xl:gap-6">
          <TeamTaskList />
          <TeamMemberList />
        </div>
      </div>
    </>
  );
}
