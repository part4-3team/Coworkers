/**
 * 할 일 상세 페이지를 구성하는 파일입니다.
 */
'use client';
import TeamProgress from './components/TeamProgress';
import TeamTaskList from './components/TeamTaskList';
import TeamMemberList from './components/TeamMemberList';

export default function TaskDetailPage() {
  return (
    <main className="flex gap-4 px-16 py-16">
      <TeamProgress />
      <TeamTaskList />
      <TeamMemberList />
    </main>
  );
}
