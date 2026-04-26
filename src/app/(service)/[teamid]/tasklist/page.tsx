/**
 * 할 일 리스트 페이지를 구성하는 파일입니다.
 * 태블릿(md~lg)은 상단 패딩을 넉넉히 두어 사이드바와 시각적으로 맞춥니다.
 */

import TaskListContentArea from '@/app/(service)/[teamid]/tasklist/components/TaskListContentArea';
import TaskListPageHeader from '@/app/(service)/[teamid]/tasklist/components/TaskListPageHeader';
import TaskListSidebar from '@/app/(service)/[teamid]/tasklist/components/TaskListSidebar';

export default function TaskListPage() {
  return (
    <div className="min-w-0 px-4 pb-4 pt-[13px] sm:px-5 sm:pt-4 md:px-6 md:pb-6 md:pt-20 lg:pt-[120px]">
      <TaskListContentArea>
        <TaskListPageHeader teamName="경영관리팀" />
        <div className="flex min-w-0 flex-col gap-4 md:gap-6 lg:flex-row lg:items-start lg:gap-8">
          <TaskListSidebar />
          <div
            className="min-h-[320px] min-w-0 flex-1 rounded-xl border border-dashed border-background-tertiary bg-background-secondary"
            aria-label="할 일 보드 영역(추가 예정)"
          />
        </div>
      </TaskListContentArea>
    </div>
  );
}
