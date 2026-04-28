/**
 * 선택한 할 일 목록의 보드(제목·월 네비·주간 칩·할 일 목록)입니다.
 */

'use client';

import { useMemo, useState } from 'react';

import TaskListBoardEmptyTaskRow from '@/app/(service)/[teamid]/tasklist/components/TaskListBoardEmptyTaskRow';
import TaskListMonthNavigator from '@/app/(service)/[teamid]/tasklist/components/TaskListMonthNavigator';
import TaskListTaskDeleteModal from '@/app/(service)/[teamid]/tasklist/components/TaskListTaskDeleteModal';
import TaskListTaskRow from '@/app/(service)/[teamid]/tasklist/components/TaskListTaskRow';
import TaskListWeekStrip from '@/app/(service)/[teamid]/tasklist/components/TaskListWeekStrip';
import { TASK_LIST_BOARD_MOCK } from '@/app/(service)/[teamid]/tasklist/constants';
import type { TaskListBoardTask } from '@/app/(service)/[teamid]/tasklist/types';
import { useToast } from '@/components/common/toast';
import { cn } from '@/utils/cn';

type TaskListBoardProps = {
  columnTitle: string;
  className?: string;
};

export default function TaskListBoard({
  columnTitle,
  className,
}: TaskListBoardProps) {
  const { showToast } = useToast();
  const [selectedDate, setSelectedDate] = useState(() => new Date(2025, 4, 21));
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

  const handleToggleChecked = (id: string, checked: boolean) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, checked } : t)));
  };

  const handleRequestDelete = (task: TaskListBoardTask) => {
    setTaskPendingDelete(task);
  };

  const handleCloseDeleteModal = () => {
    setTaskPendingDelete(null);
  };

  const handleConfirmDelete = () => {
    if (!taskPendingDelete) return;
    const id = taskPendingDelete.id;
    setTaskPendingDelete(null);
    setTasks((prev) => prev.filter((t) => t.id !== id));
    showToast('삭제되었습니다.', 'error');
  };

  return (
    <section
      className={cn(
        'flex w-full min-w-0 flex-1 flex-col rounded-[20px] border border-background-tertiary bg-background-primary px-4 py-6 shadow-[0_15px_50px_-12px_rgba(0,0,0,0.05)] sm:px-5 sm:py-8 md:px-8 md:py-10',
        className,
      )}
      aria-label={isTaskListEmpty ? '할 일 보드' : `${columnTitle} 할 일 보드`}
    >
      <header className="flex min-w-0 flex-row items-center gap-2 sm:gap-6">
        {isTaskListEmpty ? (
          <h2 className="min-w-0 flex-1 text-base font-semibold leading-6 text-interaction-inactive md:text-xl md:leading-6">
            할 일을 입력해주세요..
          </h2>
        ) : (
          <h2 className="min-w-0 flex-1 truncate text-[15px] font-bold leading-[21px] text-text-primary sm:text-xl sm:leading-normal md:text-2xl md:leading-normal">
            {columnTitle}
          </h2>
        )}
        <div className="shrink-0">
          <TaskListMonthNavigator
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
          />
        </div>
      </header>

      <TaskListWeekStrip
        className="mt-6 md:mt-8"
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
      />

      <ul className="mt-6 flex list-none flex-col gap-3 p-0 md:mt-8 md:gap-4">
        {isTaskListEmpty ? (
          <li className="list-none">
            <TaskListBoardEmptyTaskRow selectedDate={selectedDate} />
          </li>
        ) : (
          sortedTasks.map((task) => (
            <li key={task.id} className="list-none">
              <TaskListTaskRow
                task={task}
                onToggleChecked={handleToggleChecked}
                onRequestDelete={handleRequestDelete}
              />
            </li>
          ))
        )}
      </ul>

      {taskPendingDelete && (
        <TaskListTaskDeleteModal
          taskTitle={taskPendingDelete.title}
          onClose={handleCloseDeleteModal}
          onConfirm={handleConfirmDelete}
        />
      )}
    </section>
  );
}
