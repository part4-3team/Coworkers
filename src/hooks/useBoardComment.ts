/**
 * 게시글 댓글 목록과 댓글 CRUD를 담당하는 훅 파일입니다.
 */

'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  createBoardComment,
  deleteBoardComment,
  getBoardComments,
  updateBoardComment,
} from '@/api/commentApi';
import type { CursorPaginationQueryParams, QueryKeyId } from '@/api/queryKeys';
import { queryKeys } from '@/api/queryKeys';
import { boardCommentQueryOptions } from '@/api/queryOptions';
import {
  createMutationOptions,
  type MutationOptionsOverrides,
  type QueryOptionsOverrides,
} from '@/api/queryOptions/factory';

type BoardCommentsData = Awaited<ReturnType<typeof getBoardComments>>;
type CreateBoardCommentData = Awaited<ReturnType<typeof createBoardComment>>;
type UpdateBoardCommentData = Awaited<ReturnType<typeof updateBoardComment>>;
type DeleteBoardCommentData = Awaited<ReturnType<typeof deleteBoardComment>>;

type UseBoardCommentsParams<TData = BoardCommentsData> = {
  articleId: QueryKeyId;
  options?: QueryOptionsOverrides<BoardCommentsData, TData>;
  params: CursorPaginationQueryParams;
  teamId: string;
};

type CreateBoardCommentVariables = {
  articleId: QueryKeyId;
  body: {
    content: string;
  };
  teamId: string;
  token?: string;
};

type UpdateBoardCommentVariables = {
  articleId: QueryKeyId;
  body: {
    content: string;
  };
  commentId: QueryKeyId;
  teamId: string;
  token?: string;
};

type DeleteBoardCommentVariables = {
  articleId: QueryKeyId;
  commentId: QueryKeyId;
  teamId: string;
  token?: string;
};

export function useBoardCommentsQuery<TData = BoardCommentsData>({
  articleId,
  options,
  params,
  teamId,
}: UseBoardCommentsParams<TData>) {
  return useQuery(
    boardCommentQueryOptions.list<TData>(teamId, articleId, params, options),
  );
}

export function useCreateBoardCommentMutation(
  options?: MutationOptionsOverrides<
    CreateBoardCommentData,
    CreateBoardCommentVariables
  >,
) {
  const queryClient = useQueryClient();
  const handleSuccess = options?.onSuccess;

  return useMutation(
    createMutationOptions({
      mutationFn: ({
        articleId,
        body,
        teamId,
        token,
      }: CreateBoardCommentVariables) =>
        createBoardComment(teamId, articleId, body, token),
      options: {
        ...options,
        onSuccess: async (data, variables, onMutateResult, context) => {
          await Promise.all([
            queryClient.invalidateQueries({
              queryKey: queryKeys.boardComment.list(
                variables.teamId,
                variables.articleId,
              ),
            }),
            queryClient.invalidateQueries({
              queryKey: queryKeys.board.detail(
                variables.teamId,
                variables.articleId,
              ),
            }),
          ]);
          await handleSuccess?.(data, variables, onMutateResult, context);
        },
      },
    }),
  );
}

export function useUpdateBoardCommentMutation(
  options?: MutationOptionsOverrides<
    UpdateBoardCommentData,
    UpdateBoardCommentVariables
  >,
) {
  const queryClient = useQueryClient();
  const handleSuccess = options?.onSuccess;

  return useMutation(
    createMutationOptions({
      mutationFn: ({
        body,
        commentId,
        teamId,
        token,
      }: UpdateBoardCommentVariables) =>
        updateBoardComment(teamId, commentId, body, token),
      options: {
        ...options,
        onSuccess: async (data, variables, onMutateResult, context) => {
          await Promise.all([
            queryClient.invalidateQueries({
              queryKey: queryKeys.boardComment.list(
                variables.teamId,
                variables.articleId,
              ),
            }),
            queryClient.invalidateQueries({
              queryKey: queryKeys.board.detail(
                variables.teamId,
                variables.articleId,
              ),
            }),
          ]);
          await handleSuccess?.(data, variables, onMutateResult, context);
        },
      },
    }),
  );
}

export function useDeleteBoardCommentMutation(
  options?: MutationOptionsOverrides<
    DeleteBoardCommentData,
    DeleteBoardCommentVariables
  >,
) {
  const queryClient = useQueryClient();
  const handleSuccess = options?.onSuccess;

  return useMutation(
    createMutationOptions({
      mutationFn: ({ commentId, teamId, token }: DeleteBoardCommentVariables) =>
        deleteBoardComment(teamId, commentId, token),
      options: {
        ...options,
        onSuccess: async (data, variables, onMutateResult, context) => {
          await Promise.all([
            queryClient.invalidateQueries({
              queryKey: queryKeys.boardComment.list(
                variables.teamId,
                variables.articleId,
              ),
            }),
            queryClient.invalidateQueries({
              queryKey: queryKeys.board.detail(
                variables.teamId,
                variables.articleId,
              ),
            }),
          ]);
          await handleSuccess?.(data, variables, onMutateResult, context);
        },
      },
    }),
  );
}
