'use client';

import { useCallback, useMemo, useState } from 'react';

import { TASK_LIST_BOARD_MOCK } from '@/app/(service)/[teamid]/tasklist/constants';
import type {
  TaskListBoardTask,
  TaskListTaskDetailApplyPatch,
} from '@/app/(service)/[teamid]/tasklist/types';
import { useToast } from '@/components/common/toast';

export function useTaskListBoard() {
  const { showToast } = useToast();
  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const [tasks, setTasks] = useState<TaskListBoardTask[]>(
    () => TASK_LIST_BOARD_MOCK,
  );
  const [taskPendingDelete, setTaskPendingDelete] =
    useState<TaskListBoardTask | null>(null);

  const sortedTasks = useMemo(
    () => [...tasks].sort((a, b) => a.sortOrder - b.sortOrder),
    [tasks],
  );

  const isTaskListEmpty = sortedTasks.length === 0;

  const handleToggleChecked = useCallback((id: string, checked: boolean) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, checked } : t)));
  }, []);

  const handleRequestDelete = useCallback((task: TaskListBoardTask) => {
    setTaskPendingDelete(task);
  }, []);

  const handleCloseDeleteModal = useCallback(() => {
    setTaskPendingDelete(null);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    if (!taskPendingDelete) return;
    const id = taskPendingDelete.id;
    setTaskPendingDelete(null);
    setTasks((prev) => prev.filter((t) => t.id !== id));
    showToast('삭제되었습니다.', 'error');
  }, [taskPendingDelete, showToast]);

  const handleApplyTaskDetailPatch = useCallback(
    (taskId: string, patch: TaskListTaskDetailApplyPatch) => {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === taskId
            ? {
                ...t,
                title: patch.title,
                description: patch.description,
                comments: patch.comments,
                commentCount: patch.comments.length,
              }
            : t,
        ),
      );
    },
    [],
  );

  const handleCompleteTaskFromDetail = useCallback((taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, checked: true } : t)),
    );
  }, []);

  const handleRequestDeleteFromDetail = useCallback(
    (task: TaskListBoardTask) => {
      setTaskPendingDelete(task);
    },
    [],
  );

  return {
    handleApplyTaskDetailPatch,
    handleCloseDeleteModal,
    handleCompleteTaskFromDetail,
    handleConfirmDelete,
    handleRequestDelete,
    handleRequestDeleteFromDetail,
    handleToggleChecked,
    isTaskListEmpty,
    selectedDate,
    setSelectedDate,
    sortedTasks,
    taskPendingDelete,
  };
}
