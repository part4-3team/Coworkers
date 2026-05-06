'use client';

import { useMemo } from 'react';

import { useQueries } from '@tanstack/react-query';

import { taskQueryOptions, teamQueryOptions } from '@/api/queryOptions';
import type {
  HistoryTaskListDetailSource,
  HistoryTeamDetail,
  UseHistoryBoardDataParams,
} from '@/app/(service)/myhistory/types';
import {
  getCompletedDateKeys,
  getHistoryTaskListDescriptors,
} from '@/app/(service)/myhistory/utils/historyBoardDataUtils';
import {
  getHistorySections,
  getHistorySummaryData,
  toHistoryCurrentUserId,
  toHistoryTaskListDetailSource,
  toHistoryTeamDetail,
  toHistoryTeams,
} from '@/app/(service)/myhistory/utils/myHistoryData';
import { useMeQuery, useMyMembershipsQuery } from '@/hooks/useUser';

function getTaskListDescriptorKey(
  descriptor: ReturnType<typeof getHistoryTaskListDescriptors>[number],
) {
  return `${descriptor.teamId}-${descriptor.taskListId}-${descriptor.dateKey}`;
}

export default function useHistoryBoardData({
  activeFilterId,
  completedTasks,
}: UseHistoryBoardDataParams) {
  const {
    data: meData,
    isLoading: isMeLoading,
    isError: isMeError,
  } = useMeQuery();

  const {
    data: membershipsData,
    isLoading: isMembershipsLoading,
    isError: isMembershipsError,
  } = useMyMembershipsQuery();

  const currentUserId = useMemo(() => toHistoryCurrentUserId(meData), [meData]);

  const teams = useMemo(
    () => toHistoryTeams(membershipsData),
    [membershipsData],
  );

  const completedDateKeys = useMemo(
    () => getCompletedDateKeys(completedTasks),
    [completedTasks],
  );

  const uniqueTeams = useMemo(() => {
    const map = new Map<string | number, (typeof teams)[number]>();

    teams.forEach((team) => {
      map.set(team.id, team);
    });

    return [...map.values()];
  }, [teams]);

  const teamDetailQueries = useQueries({
    queries: uniqueTeams.map((team) => teamQueryOptions.detail(team.id)),
  });

  const teamDetails = useMemo(
    () =>
      teamDetailQueries
        .map((query) => toHistoryTeamDetail(query.data))
        .filter((teamDetail): teamDetail is HistoryTeamDetail =>
          Boolean(teamDetail),
        ),
    [teamDetailQueries],
  );

  const taskListDescriptors = useMemo(
    () => getHistoryTaskListDescriptors(teamDetails, completedDateKeys),
    [completedDateKeys, teamDetails],
  );

  const uniqueTaskListDescriptors = useMemo(() => {
    const map = new Map<string, (typeof taskListDescriptors)[number]>();

    taskListDescriptors.forEach((descriptor) => {
      map.set(getTaskListDescriptorKey(descriptor), descriptor);
    });

    return [...map.values()];
  }, [taskListDescriptors]);

  const taskListDetailQueries = useQueries({
    queries: uniqueTaskListDescriptors.map((descriptor) =>
      taskQueryOptions.taskListDetail(
        descriptor.teamId,
        descriptor.taskListId,
        { date: descriptor.dateKey },
        {
          enabled:
            Boolean(descriptor.teamId) &&
            Boolean(descriptor.taskListId) &&
            Boolean(descriptor.dateKey),
        },
      ),
    ),
  });

  const taskListSources = useMemo(
    () =>
      uniqueTaskListDescriptors.reduce<HistoryTaskListDetailSource[]>(
        (sources, descriptor, index) => {
          const data = taskListDetailQueries[index]?.data;

          if (!data) {
            return sources;
          }

          sources.push(toHistoryTaskListDetailSource(data, descriptor));

          return sources;
        },
        [],
      ),
    [uniqueTaskListDescriptors, taskListDetailQueries],
  );

  const historySections = useMemo(
    () => getHistorySections(completedTasks, taskListSources, activeFilterId),
    [activeFilterId, completedTasks, taskListSources],
  );

  const summaryData = useMemo(
    () => getHistorySummaryData(currentUserId, teamDetails, taskListSources),
    [currentUserId, taskListSources, teamDetails],
  );

  return {
    filters: summaryData.filters,
    historySections,
    isError:
      isMeError ||
      isMembershipsError ||
      teamDetailQueries.some((query) => query.isError) ||
      taskListDetailQueries.some((query) => query.isError),
    isLoading:
      isMeLoading ||
      isMembershipsLoading ||
      teamDetailQueries.some((query) => query.isLoading) ||
      taskListDetailQueries.some((query) => query.isLoading),
    summaryItems: summaryData.items,
  } as const;
}
