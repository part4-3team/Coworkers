/**
 * 팀별 완료 요약 카드와 필터 계산에 필요한 세부 유틸입니다.
 */

import type {
  HistoryTaskListDetailSource,
  HistoryTaskMeta,
  HistoryTeamDetail,
  MyHistoryCompletedTaskRecord,
  MyHistoryFilter,
  MyHistorySummaryItem,
} from '@/app/(service)/myhistory/types';
import {
  buildTaskListTotalIdentityMap,
  toHistoryTaskListSummaryKey,
} from '@/app/(service)/myhistory/utils/myHistorySummaryCountUtils';

type HistoryTaskMetaMap = ReadonlyMap<string, HistoryTaskMeta>;
type HistoryTaskListSummaryBase = {
  displayIndex: number;
  id: string;
  name: string;
};

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

      const taskListKey = toHistoryTaskListSummaryKey(
        taskMeta.teamId,
        taskMeta.taskListId,
      );
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
  sources: readonly HistoryTaskListDetailSource[],
) {
  const taskListTotalIdentityMap = buildTaskListTotalIdentityMap(
    teamDetails,
    sources,
  );

  return teamDetails.map((teamDetail) => {
    const sourceTaskLists = sources.filter(
      (source) => source.teamId === teamDetail.id,
    );
    const taskListBaseMap = new Map<string, HistoryTaskListSummaryBase>();

    teamDetail.taskLists.forEach((taskList) => {
      taskListBaseMap.set(taskList.id, {
        displayIndex: taskList.displayIndex,
        id: taskList.id,
        name: taskList.name,
      });
    });

    sourceTaskLists.forEach((source) => {
      if (taskListBaseMap.has(source.taskListId)) {
        return;
      }

      taskListBaseMap.set(source.taskListId, {
        displayIndex: source.displayIndex,
        id: source.taskListId,
        name: source.taskListName,
      });
    });

    const details = Array.from(taskListBaseMap.values())
      .sort(
        (firstTaskList, secondTaskList) =>
          firstTaskList.displayIndex - secondTaskList.displayIndex,
      )
      .map((taskList) => {
        const taskListKey = toHistoryTaskListSummaryKey(
          teamDetail.id,
          taskList.id,
        );
        const doneCount = completedTaskCountMap.get(taskListKey)?.size ?? 0;
        const totalCount = taskListTotalIdentityMap.get(taskListKey)?.size ?? 0;

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
