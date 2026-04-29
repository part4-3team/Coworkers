/**
 * 선택한 할 일 목록의 보드(제목·월 네비·주간 칩·할 일 목록)입니다.
 */

'use client';

import TaskListBoardEmptyTaskRow from '@/app/(service)/[teamid]/tasklist/components/TaskListBoardEmptyTaskRow';
import TaskListMonthNavigator from '@/app/(service)/[teamid]/tasklist/components/TaskListMonthNavigator';
import TaskListTaskDeleteModal from '@/app/(service)/[teamid]/tasklist/components/TaskListTaskDeleteModal';
import TaskListTaskDetailPanel from '@/app/(service)/[teamid]/tasklist/components/TaskListTaskDetailPanel';
import TaskListTaskRow from '@/app/(service)/[teamid]/tasklist/components/TaskListTaskRow';
import TaskListWeekStrip from '@/app/(service)/[teamid]/tasklist/components/TaskListWeekStrip';
import { TASK_LIST_DETAIL_CURRENT_USER_NAME } from '@/app/(service)/[teamid]/tasklist/constants';
import { useTaskListBoard } from '@/app/(service)/[teamid]/tasklist/hooks/useTaskListBoard';
import {
  TASK_LIST_BOARD_CARD_SHELL_CLASS,
  TASK_LIST_BOARD_COLUMN_TITLE_CLASS,
} from '@/app/(service)/[teamid]/tasklist/taskListBoardConstants';
import type { TaskListBoardProps } from '@/app/(service)/[teamid]/tasklist/types';
import { cn } from '@/utils/cn';

export default function TaskListBoard({
  columnTitle,
  className,
}: TaskListBoardProps) {
  const {
    handleApplyTaskDetailPatch,
    handleCloseDeleteModal,
    handleCloseTaskDetail,
    handleCompleteTaskFromDetail,
    handleConfirmDelete,
    handleOpenTaskDetail,
    handleRequestDelete,
    handleRequestDeleteFromDetail,
    handleToggleChecked,
    isTaskListEmpty,
    openTaskDetail,
    selectedDate,
    setSelectedDate,
    sortedTasks,
    taskPendingDelete,
  } = useTaskListBoard();

  return (
    <section
      className={cn(TASK_LIST_BOARD_CARD_SHELL_CLASS, className)}
      aria-label={isTaskListEmpty ? '할 일 보드' : `${columnTitle} 할 일 보드`}
    >
      <header className="flex min-w-0 flex-row items-center gap-2 sm:gap-6">
        {isTaskListEmpty ? (
          <h2 className="min-w-0 flex-1 text-base font-semibold leading-6 text-interaction-inactive md:text-xl md:leading-6">
            할 일을 입력해주세요..
          </h2>
        ) : (
          <h2 className={TASK_LIST_BOARD_COLUMN_TITLE_CLASS}>{columnTitle}</h2>
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
                onOpenDetail={handleOpenTaskDetail}
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

      {openTaskDetail && (
        <TaskListTaskDetailPanel
          key={`${openTaskDetail.task.id}-${openTaskDetail.mode}`}
          currentUserName={TASK_LIST_DETAIL_CURRENT_USER_NAME}
          initialMode={openTaskDetail.mode}
          task={openTaskDetail.task}
          onApplyPatch={handleApplyTaskDetailPatch}
          onClose={handleCloseTaskDetail}
          onCompleteTask={handleCompleteTaskFromDetail}
          onRequestDeleteTask={handleRequestDeleteFromDetail}
        />
      )}
    </section>
  );
}
