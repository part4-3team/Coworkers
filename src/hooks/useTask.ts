/**
 * 할 일 조회, 수정, 삭제, 정렬과 할 일 댓글을 담당하는 훅 파일입니다.
 */

'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  createTaskComment,
  deleteTaskComment,
  updateTaskComment,
} from '@/api/commentApi';
import { commentQueryOptions, taskQueryOptions } from '@/api/queryOptions';
import type { QueryKeyId, TaskQueryParams } from '@/api/queryKeys';
import { queryKeys } from '@/api/queryKeys';

type UseTasksParams = {
  params: TaskQueryParams;
  teamId: string;
};

type UseTaskDetailParams = {
  taskId: QueryKeyId;
  taskListId: QueryKeyId;
  teamId: string;
};

type UseTaskCommentsParams = {
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

export function useTasks({ params, teamId }: UseTasksParams) {
  return useQuery(taskQueryOptions.list(teamId, params));
}

export function useTaskDetail({
  taskId,
  taskListId,
  teamId,
}: UseTaskDetailParams) {
  return useQuery(taskQueryOptions.detail(teamId, taskListId, taskId));
}

export function useTaskComments({ taskId, teamId }: UseTaskCommentsParams) {
  return useQuery(commentQueryOptions.taskComments(teamId, taskId));
}

export function useCreateTaskComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ body, taskId, teamId, token }: CreateTaskCommentVariables) =>
      createTaskComment(teamId, taskId, body, token),
    onSuccess: async (_, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: queryKeys.comment.list(variables.teamId, variables.taskId),
        }),
        queryClient.invalidateQueries({
          queryKey: queryKeys.task.lists(variables.teamId),
        }),
      ]);
    },
  });
}

export function useUpdateTaskComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      body,
      commentId,
      taskId,
      teamId,
      token,
    }: UpdateTaskCommentVariables) =>
      updateTaskComment(teamId, taskId, commentId, body, token),
    onSuccess: async (_, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: queryKeys.comment.list(variables.teamId, variables.taskId),
        }),
        queryClient.invalidateQueries({
          queryKey: queryKeys.task.lists(variables.teamId),
        }),
      ]);
    },
  });
}

export function useDeleteTaskComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      commentId,
      taskId,
      teamId,
      token,
    }: DeleteTaskCommentVariables) =>
      deleteTaskComment(teamId, taskId, commentId, token),
    onSuccess: async (_, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: queryKeys.comment.list(variables.teamId, variables.taskId),
        }),
        queryClient.invalidateQueries({
          queryKey: queryKeys.task.lists(variables.teamId),
        }),
      ]);
    },
  });
}
