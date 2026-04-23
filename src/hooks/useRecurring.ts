/**
 * 반복 일정 생성, 수정, 삭제를 담당하는 훅 파일입니다.
 */

'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { QueryParams } from '@/api/queryKeys';
import { queryKeys } from '@/api/queryKeys';
import {
  createMutationOptions,
  type MutationOptionsOverrides,
} from '@/api/queryOptions/factory';
import {
  createRecurring,
  deleteRecurring,
  updateRecurring,
} from '@/api/taskApi';

type CreateRecurringData = Awaited<ReturnType<typeof createRecurring>>;
type UpdateRecurringData = Awaited<ReturnType<typeof updateRecurring>>;
type DeleteRecurringData = Awaited<ReturnType<typeof deleteRecurring>>;

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

export function useCreateRecurringMutation(
  options?: MutationOptionsOverrides<
    CreateRecurringData,
    CreateRecurringVariables
  >,
) {
  const queryClient = useQueryClient();
  const handleSuccess = options?.onSuccess;

  return useMutation(
    createMutationOptions({
      mutationFn: ({
        body,
        taskListId,
        teamId,
        token,
      }: CreateRecurringVariables) =>
        createRecurring(teamId, taskListId, body, token),
      options: {
        ...options,
        onSuccess: async (data, variables, onMutateResult, context) => {
          await invalidateRecurringRelatedQueries(
            queryClient,
            variables.teamId,
          );
          await handleSuccess?.(data, variables, onMutateResult, context);
        },
      },
    }),
  );
}

export function useUpdateRecurringMutation(
  options?: MutationOptionsOverrides<
    UpdateRecurringData,
    UpdateRecurringVariables
  >,
) {
  const queryClient = useQueryClient();
  const handleSuccess = options?.onSuccess;

  return useMutation(
    createMutationOptions({
      mutationFn: ({
        body,
        recurringId,
        taskListId,
        teamId,
        token,
      }: UpdateRecurringVariables) =>
        updateRecurring(teamId, taskListId, recurringId, body, token),
      options: {
        ...options,
        onSuccess: async (data, variables, onMutateResult, context) => {
          await invalidateRecurringRelatedQueries(
            queryClient,
            variables.teamId,
          );
          await handleSuccess?.(data, variables, onMutateResult, context);
        },
      },
    }),
  );
}

export function useDeleteRecurringMutation(
  options?: MutationOptionsOverrides<
    DeleteRecurringData,
    DeleteRecurringVariables
  >,
) {
  const queryClient = useQueryClient();
  const handleSuccess = options?.onSuccess;

  return useMutation(
    createMutationOptions({
      mutationFn: ({
        recurringId,
        taskId,
        taskListId,
        teamId,
        token,
      }: DeleteRecurringVariables) =>
        deleteRecurring(teamId, taskListId, taskId, recurringId, token),
      options: {
        ...options,
        onSuccess: async (data, variables, onMutateResult, context) => {
          await invalidateRecurringRelatedQueries(
            queryClient,
            variables.teamId,
          );
          await handleSuccess?.(data, variables, onMutateResult, context);
        },
      },
    }),
  );
}
