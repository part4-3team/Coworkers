import type {
  HistoryTaskListDescriptor,
  HistoryTeamDetail,
  MyHistoryCompletedTaskRecord,
} from '@/app/(service)/myhistory/types';

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
