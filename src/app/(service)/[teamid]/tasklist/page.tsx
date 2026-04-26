/**
 * 할 일 리스트 페이지를 구성하는 파일입니다.
 * 태블릿(md~lg)은 상단 패딩을 넉넉히 둡니다.
 * md+: 사이드바 노출 구간부터 좌우 패딩 확보. lg+는 더 넓게.
 */

import TaskListBoard from '@/app/(service)/[teamid]/tasklist/components/TaskListBoard';
import TaskListContentArea from '@/app/(service)/[teamid]/tasklist/components/TaskListContentArea';
import TaskListPageHeader from '@/app/(service)/[teamid]/tasklist/components/TaskListPageHeader';
import TaskListSidebar from '@/app/(service)/[teamid]/tasklist/components/TaskListSidebar';
import { TASK_LIST_COLUMN_MOCK } from '@/app/(service)/[teamid]/tasklist/constants';

const TASK_LIST_DEFAULT_COLUMN_TITLE =
  TASK_LIST_COLUMN_MOCK[1]?.title ?? '할 일';

export default function TaskListPage() {
  return (
    <div className="min-w-0 px-4 pb-4 pt-3.25 sm:px-5 sm:pt-4 md:px-10 md:pb-6 md:pt-20 lg:px-16 lg:pt-30">
      <TaskListContentArea>
        <TaskListPageHeader teamName="경영관리팀" />
        <div className="flex min-w-0 flex-col gap-4 md:gap-6 lg:flex-row lg:items-start lg:gap-16">
          <TaskListSidebar />
          <TaskListBoard columnTitle={TASK_LIST_DEFAULT_COLUMN_TITLE} />
        </div>
      </TaskListContentArea>
    </div>
  );
}
