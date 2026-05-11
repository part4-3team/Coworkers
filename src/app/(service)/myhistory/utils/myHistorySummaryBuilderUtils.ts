/**
 * 팀별 완료 요약 카드와 필터 계산에 필요한 세부 유틸입니다.
 */

import type {
  HistoryTaskMeta,
  HistoryTeamDetail,
  MyHistoryCompletedTaskRecord,
  MyHistoryFilter,
  MyHistorySummaryItem,
} from '@/app/(service)/myhistory/types';
import { toHistoryTaskIdentityKey } from '@/app/(service)/myhistory/utils/myHistoryShared';

type HistoryTaskMetaMap = ReadonlyMap<string, HistoryTaskMeta>;

function countUniqueTaskListTotal(
  taskList: HistoryTeamDetail['taskLists'][number],
) {
  return new Set(
    taskList.tasks.map((task) =>
      toHistoryTaskIdentityKey(task.id, task.recurringId),
    ),
  ).size;
}

function getTaskId(task: MyHistoryCompletedTaskRecord) {
  return typeof task.id === 'string' || typeof task.id === 'number'
    ? String(task.id)
    : null;
}

export function buildCompletedTaskCountMap(
  completedTasks: readonly MyHistoryCompletedTaskRecord[],
  taskMetaMap: HistoryTaskMetaMap,
) {
  const completedTaskMap = completedTasks.reduce<Map<string, Set<string>>>(
    (taskCountMap, task) => {
      const taskId = getTaskId(task);

      if (!taskId) {
        return taskCountMap;
      }

      const taskMeta = taskMetaMap.get(taskId);

      if (!taskMeta) {
        return taskCountMap;
      }

      const taskListKey = `${taskMeta.teamId}:${taskMeta.taskListId}`;
      const completedTaskSet =
        taskCountMap.get(taskListKey) ?? new Set<string>();

      completedTaskSet.add(taskMeta.taskIdentityKey);
      taskCountMap.set(taskListKey, completedTaskSet);

      return taskCountMap;
    },
    new Map(),
  );

  return completedTaskMap;
}

export function buildTeamSummaryCards(
  teamDetails: readonly HistoryTeamDetail[],
  completedTaskCountMap: ReadonlyMap<string, Set<string>>,
) {
  return teamDetails.map((teamDetail) => {
    const details = teamDetail.taskLists.map((taskList) => {
      const doneCount =
        completedTaskCountMap.get(`${teamDetail.id}:${taskList.id}`)?.size ?? 0;
      const totalCount = countUniqueTaskListTotal(taskList);

      return {
        doneCount,
        countText: `${doneCount}/${totalCount}`,
        id: taskList.id,
        totalCount,
        title: taskList.name,
      };
    });
    const doneCount = details.reduce(
      (sum, detail) => sum + detail.doneCount,
      0,
    );

    return {
      count: doneCount,
      countText: `${doneCount}개`,
      details,
      id: teamDetail.id,
      title: teamDetail.name,
    };
  });
}

export function buildHistoryTeamFilters(
  summaryItems: readonly MyHistorySummaryItem[],
) {
  return summaryItems.map(
    (item) =>
      ({
        count: item.count,
        id: item.id,
        label: item.title,
      }) satisfies MyHistoryFilter,
  );
}
