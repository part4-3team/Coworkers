import type { MyHistoryCompletedTaskRecord } from '@/app/(service)/myhistory/types';
import type { HistoryTeamDetail } from '@/app/(service)/myhistory/utils/myHistoryTeamParsers';

export type HistoryTaskListDescriptor = {
  dateKey: string;
  displayIndex: number;
  taskListId: string;
  taskListName: string;
  teamId: string;
  teamName: string;
};

export function getCompletedDateKeys(
  completedTasks: readonly MyHistoryCompletedTaskRecord[],
) {
  return Array.from(
    new Set(
      completedTasks
        .map((task) => (task.date ?? task.doneAt)?.slice(0, 10))
        .filter((dateKey): dateKey is string => Boolean(dateKey)),
    ),
  );
}

export function getHistoryTaskListDescriptors(
  teamDetails: readonly HistoryTeamDetail[],
  completedDateKeys: readonly string[],
) {
  return teamDetails.flatMap((teamDetail) =>
    completedDateKeys.flatMap((dateKey) =>
      teamDetail.taskLists.map((taskList) => ({
        dateKey,
        displayIndex: taskList.displayIndex,
        taskListId: taskList.id,
        taskListName: taskList.name,
        teamId: teamDetail.id,
        teamName: teamDetail.name,
      })),
    ),
  ) satisfies HistoryTaskListDescriptor[];
}
