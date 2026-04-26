/**
 * 할 일 리스트 페이지를 구성하는 파일입니다.
 */

import TaskListContentArea from '@/app/(service)/[teamid]/tasklist/components/TaskListContentArea';
import TaskListPageHeader from '@/app/(service)/[teamid]/tasklist/components/TaskListPageHeader';

export default function TaskListPage() {
  return (
    <div className="min-w-0 px-4 pb-4 pt-[120px] md:px-6 md:pb-6 md:pt-[120px]">
      <TaskListContentArea>
        <TaskListPageHeader teamName="경영관리팀" />
      </TaskListContentArea>
    </div>
  );
}
