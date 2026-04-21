/**
 * 반복 일정 생성, 수정, 삭제를 담당하는 훅 파일입니다.
 */

'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  createRecurring,
  deleteRecurring,
  updateRecurring,
} from '@/api/taskApi';
import type { QueryParams } from '@/api/queryKeys';
import { queryKeys } from '@/api/queryKeys';

type RecurringBody = QueryParams;

type CreateRecurringVariables = {
  body: RecurringBody;
  taskListId: string | number;
  teamId: string;
  token?: string;
};

type UpdateRecurringVariables = {
  body: RecurringBody;
  recurringId: string | number;
  taskListId: string | number;
  teamId: string;
  token?: string;
};

type DeleteRecurringVariables = {
  recurringId: string | number;
  taskId: string | number;
  taskListId: string | number;
  teamId: string;
  token?: string;
};

async function invalidateRecurringRelatedQueries(
  queryClient: ReturnType<typeof useQueryClient>,
  teamId: string,
) {
  await Promise.all([
    queryClient.invalidateQueries({ queryKey: queryKeys.task.lists(teamId) }),
    queryClient.invalidateQueries({
      queryKey: queryKeys.taskList.lists(teamId),
    }),
    queryClient.invalidateQueries({
      queryKey: queryKeys.recurring.lists(teamId),
    }),
  ]);
}

export function useCreateRecurring() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      body,
      taskListId,
      teamId,
      token,
    }: CreateRecurringVariables) =>
      createRecurring(teamId, taskListId, body, token),
    onSuccess: async (_, variables) => {
      await invalidateRecurringRelatedQueries(queryClient, variables.teamId);
    },
  });
}

export function useUpdateRecurring() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      body,
      recurringId,
      taskListId,
      teamId,
      token,
    }: UpdateRecurringVariables) =>
      updateRecurring(teamId, taskListId, recurringId, body, token),
    onSuccess: async (_, variables) => {
      await invalidateRecurringRelatedQueries(queryClient, variables.teamId);
    },
  });
}

export function useDeleteRecurring() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      recurringId,
      taskId,
      taskListId,
      teamId,
      token,
    }: DeleteRecurringVariables) =>
      deleteRecurring(teamId, taskListId, taskId, recurringId, token),
    onSuccess: async (_, variables) => {
      await invalidateRecurringRelatedQueries(queryClient, variables.teamId);
    },
  });
}
