import type {
  HistoryTaskListDetailSource,
  HistoryTaskMeta,
  MyHistoryCompletedTaskRecord,
  MyHistoryTask,
} from '@/app/(service)/myhistory/types';
import {
  formatHistoryTaskFrequency,
  toDateLabel,
} from '@/app/(service)/myhistory/utils/myHistoryShared';

export function getTaskMetaMap(
  sources: readonly HistoryTaskListDetailSource[],
) {
  return sources.reduce<Map<string, HistoryTaskMeta>>((taskMetaMap, source) => {
    source.tasks.forEach((task) => {
      taskMetaMap.set(task.id, {
        commentCount: task.commentCount,
        taskDisplayIndex: task.displayIndex,
        taskListDisplayIndex: source.displayIndex,
        taskListId: source.taskListId,
        taskListName: source.taskListName,
        teamId: source.teamId,
        teamName: source.teamName,
      });
    });

    return taskMetaMap;
  }, new Map());
}

export function toHistoryTask(
  task: MyHistoryCompletedTaskRecord,
  meta?: HistoryTaskMeta,
) {
  return {
    commentCount: meta?.commentCount ?? 0,
    description: task.description ?? '',
    doneAt: toDateLabel(task.doneAt),
    dueDate: toDateLabel(task.date),
    frequency: formatHistoryTaskFrequency(task.frequency),
    id: String(task.id ?? `${task.name}-${task.doneAt}`),
    startedAt: toDateLabel(task.date),
    title: task.name ?? '이름 없는 할 일',
  } satisfies MyHistoryTask;
}
