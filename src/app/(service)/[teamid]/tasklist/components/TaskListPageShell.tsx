/**
 * 할 일 리스트 페이지 클라이언트 영역(사이드바 상태·모달·FAB)입니다.
 */

'use client';

import { useMemo, useState } from 'react';

import TaskListBoard from '@/app/(service)/[teamid]/tasklist/components/TaskListBoard';
import TaskListColumnDeleteModal from '@/app/(service)/[teamid]/tasklist/components/TaskListColumnDeleteModal';
import TaskListContentArea from '@/app/(service)/[teamid]/tasklist/components/TaskListContentArea';
import TaskListCreateColumnModal from '@/app/(service)/[teamid]/tasklist/components/TaskListCreateColumnModal';
import TaskListCreateTaskModal from '@/app/(service)/[teamid]/tasklist/components/TaskListCreateTaskModal';
import TaskListFAB from '@/app/(service)/[teamid]/tasklist/components/TaskListFAB';
import TaskListPageHeader from '@/app/(service)/[teamid]/tasklist/components/TaskListPageHeader';
import TaskListSidebar from '@/app/(service)/[teamid]/tasklist/components/TaskListSidebar';
import { TASK_LIST_COLUMN_MOCK } from '@/app/(service)/[teamid]/tasklist/constants';
import type { TaskListColumnItem } from '@/app/(service)/[teamid]/tasklist/types';
import { useToast } from '@/components/common/toast';

type TaskListPageShellProps = {
  teamId: string;
};

export default function TaskListPageShell({ teamId }: TaskListPageShellProps) {
  const { showToast } = useToast();
  const [columns, setColumns] = useState<TaskListColumnItem[]>(() => [
    ...TASK_LIST_COLUMN_MOCK,
  ]);
  const [activeId, setActiveId] = useState<string>(
    TASK_LIST_COLUMN_MOCK[1]?.id ?? TASK_LIST_COLUMN_MOCK[0]?.id ?? '',
  );
  const [columnPendingDelete, setColumnPendingDelete] =
    useState<TaskListColumnItem | null>(null);
  const [isCreateColumnOpen, setIsCreateColumnOpen] = useState(false);
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);

  const columnTitle = useMemo(() => {
    const found = columns.find((c) => c.id === activeId);
    return found?.title ?? '할 일';
  }, [columns, activeId]);

  const handleRequestDeleteColumn = (item: TaskListColumnItem) => {
    setColumnPendingDelete(item);
  };

  const handleCloseColumnDeleteModal = () => {
    setColumnPendingDelete(null);
  };

  const handleConfirmDeleteColumn = () => {
    if (!columnPendingDelete) return;
    const removedId = columnPendingDelete.id;
    setColumnPendingDelete(null);
    const nextColumns = columns.filter((c) => c.id !== removedId);
    setColumns(nextColumns);
    if (activeId === removedId) {
      setActiveId(nextColumns[0]?.id ?? '');
    }
    showToast('삭제되었습니다.', 'error');
  };

  const handleCreateColumn = (name: string) => {
    const id = crypto.randomUUID();
    setColumns((prev) => [
      ...prev,
      { id, title: name, completed: 0, total: 0 },
    ]);
    setActiveId(id);
    setIsCreateColumnOpen(false);
  };

  return (
    <>
      <TaskListContentArea>
        <TaskListPageHeader teamId={teamId} teamName="경영관리팀" />
        <div className="flex min-w-0 flex-col gap-4 md:gap-6 lg:flex-row lg:items-start lg:gap-16">
          <TaskListSidebar
            columns={columns}
            activeId={activeId}
            onSelectColumn={setActiveId}
            onRequestDeleteColumn={handleRequestDeleteColumn}
            onAddListClick={() => setIsCreateColumnOpen(true)}
          />
          <TaskListBoard columnTitle={columnTitle} />
        </div>
      </TaskListContentArea>

      <TaskListFAB onClick={() => setIsCreateTaskOpen(true)} />

      {isCreateColumnOpen && (
        <TaskListCreateColumnModal
          onClose={() => setIsCreateColumnOpen(false)}
          onSubmit={handleCreateColumn}
        />
      )}

      {isCreateTaskOpen && (
        <TaskListCreateTaskModal onClose={() => setIsCreateTaskOpen(false)} />
      )}

      {columnPendingDelete && (
        <TaskListColumnDeleteModal
          onClose={handleCloseColumnDeleteModal}
          onConfirm={handleConfirmDeleteColumn}
        />
      )}
    </>
  );
}
