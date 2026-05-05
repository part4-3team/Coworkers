/**
 * 할 일 조회, 수정, 삭제, 정렬과 할 일 댓글을 담당하는 훅 파일입니다.
 */

'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  createTaskComment,
  deleteTaskComment,
  getTaskComments,
  updateTaskComment,
} from '@/api/commentApi';
import type { QueryKeyId, TaskQueryParams } from '@/api/queryKeys';
import { commentQueryOptions, taskQueryOptions } from '@/api/queryOptions';
import {
  createMutationOptions,
  type MutationOptionsOverrides,
  type QueryOptionsOverrides,
} from '@/api/queryOptions/factory';
import { refetchTaskCommentQueries } from '@/api/queryRefetch';
import { getTaskDetail, getTasks } from '@/api/taskApi';

type TasksData = Awaited<ReturnType<typeof getTasks>>;
type TaskDetailData = Awaited<ReturnType<typeof getTaskDetail>>;
type TaskCommentsData = Awaited<ReturnType<typeof getTaskComments>>;
type CreateTaskCommentData = Awaited<ReturnType<typeof createTaskComment>>;
type UpdateTaskCommentData = Awaited<ReturnType<typeof updateTaskComment>>;
type DeleteTaskCommentData = Awaited<ReturnType<typeof deleteTaskComment>>;

type UseTasksParams<TData = TasksData> = {
  options?: QueryOptionsOverrides<TasksData, TData>;
  params: TaskQueryParams;
  teamId: string;
};

type UseTaskDetailParams<TData = TaskDetailData> = {
  options?: QueryOptionsOverrides<TaskDetailData, TData>;
  taskId: QueryKeyId;
  taskListId: QueryKeyId;
  teamId: string;
};

type UseTaskCommentsParams<TData = TaskCommentsData> = {
  options?: QueryOptionsOverrides<TaskCommentsData, TData>;
  taskId: QueryKeyId;
  teamId: string;
};

type CreateTaskCommentVariables = {
  body: {
    content: string;
  };
  taskId: QueryKeyId;
  teamId: string;
  token?: string;
};

type UpdateTaskCommentVariables = {
  body: {
    content: string;
  };
  commentId: QueryKeyId;
  taskId: QueryKeyId;
  teamId: string;
  token?: string;
};

type DeleteTaskCommentVariables = {
  commentId: QueryKeyId;
  taskId: QueryKeyId;
  teamId: string;
  token?: string;
};

export function useTasksQuery<TData = TasksData>({
  options,
  params,
  teamId,
}: UseTasksParams<TData>) {
  return useQuery(taskQueryOptions.list<TData>(teamId, params, options));
}

export function useTaskDetailQuery<TData = TaskDetailData>({
  options,
  taskId,
  taskListId,
  teamId,
}: UseTaskDetailParams<TData>) {
  return useQuery(
    taskQueryOptions.detail<TData>(teamId, taskListId, taskId, options),
  );
}

export function useTaskCommentsQuery<TData = TaskCommentsData>({
  options,
  taskId,
  teamId,
}: UseTaskCommentsParams<TData>) {
  return useQuery(
    commentQueryOptions.taskComments<TData>(teamId, taskId, options),
  );
}

export function useCreateTaskCommentMutation(
  options?: MutationOptionsOverrides<
    CreateTaskCommentData,
    CreateTaskCommentVariables
  >,
) {
  const queryClient = useQueryClient();
  const handleSuccess = options?.onSuccess;

  return useMutation(
    createMutationOptions({
      mutationFn: ({
        body,
        taskId,
        teamId,
        token,
      }: CreateTaskCommentVariables) =>
        createTaskComment(teamId, taskId, body, token),
      options: {
        ...options,
        onSuccess: async (data, variables, onMutateResult, context) => {
          await refetchTaskCommentQueries(
            queryClient,
            variables.teamId,
            variables.taskId,
          );
          await handleSuccess?.(data, variables, onMutateResult, context);
        },
      },
    }),
  );
}

export function useUpdateTaskCommentMutation(
  options?: MutationOptionsOverrides<
    UpdateTaskCommentData,
    UpdateTaskCommentVariables
  >,
) {
  const queryClient = useQueryClient();
  const handleSuccess = options?.onSuccess;

  return useMutation(
    createMutationOptions({
      mutationFn: ({
        body,
        commentId,
        taskId,
        teamId,
        token,
      }: UpdateTaskCommentVariables) =>
        updateTaskComment(teamId, taskId, commentId, body, token),
      options: {
        ...options,
        onSuccess: async (data, variables, onMutateResult, context) => {
          await refetchTaskCommentQueries(
            queryClient,
            variables.teamId,
            variables.taskId,
          );
          await handleSuccess?.(data, variables, onMutateResult, context);
        },
      },
    }),
  );
}

export function useDeleteTaskCommentMutation(
  options?: MutationOptionsOverrides<
    DeleteTaskCommentData,
    DeleteTaskCommentVariables
  >,
) {
  const queryClient = useQueryClient();
  const handleSuccess = options?.onSuccess;

  return useMutation(
    createMutationOptions({
      mutationFn: ({
        commentId,
        taskId,
        teamId,
        token,
      }: DeleteTaskCommentVariables) =>
        deleteTaskComment(teamId, taskId, commentId, token),
      options: {
        ...options,
        onSuccess: async (data, variables, onMutateResult, context) => {
          await refetchTaskCommentQueries(
            queryClient,
            variables.teamId,
            variables.taskId,
          );
          await handleSuccess?.(data, variables, onMutateResult, context);
        },
      },
    }),
  );
}
