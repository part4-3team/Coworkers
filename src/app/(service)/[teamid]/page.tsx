/**
 * 할 일 상세 페이지를 구성하는 파일입니다.
 */
'use client';
import TeamProgress from './components/TeamProgress';
import TeamTaskList from './components/TeamTaskList';
import TeamMemberList from './components/TeamMemberList';

import { use } from 'react';
import { notFound } from 'next/navigation';

export default function TaskDetailPage({
  params,
}: {
  params: Promise<{ teamid: string }>;
}) {
  const { teamid } = use(params);

  console.log('teamid:', teamid); // 실제 값 확인용

  if (!/^\d+$/.test(teamid)) {
    notFound();
  }

  return (
    <main className="flex gap-4 flex-wrap md:px-6 md:py-18 xl:w-full xl:py-30 xl:max-w-6xl xl:px-20">
      <TeamProgress />
      <TeamTaskList />
      <TeamMemberList />
    </main>
  );
}
