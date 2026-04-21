/**
 * 게시글 댓글 목록과 댓글 CRUD를 담당하는 훅 파일입니다.
 */

'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  createBoardComment,
  deleteBoardComment,
  updateBoardComment,
} from '@/api/commentApi';
import { boardCommentQueryOptions } from '@/api/queryOptions';
import type { CursorPaginationQueryParams, QueryKeyId } from '@/api/queryKeys';
import { queryKeys } from '@/api/queryKeys';

type UseBoardCommentsParams = {
  articleId: QueryKeyId;
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

export function useBoardComments({
  articleId,
  params,
  teamId,
}: UseBoardCommentsParams) {
  return useQuery(boardCommentQueryOptions.list(teamId, articleId, params));
}

export function useCreateBoardComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      articleId,
      body,
      teamId,
      token,
    }: CreateBoardCommentVariables) =>
      createBoardComment(teamId, articleId, body, token),
    onSuccess: async (_, variables) => {
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
    },
  });
}

export function useUpdateBoardComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      body,
      commentId,
      teamId,
      token,
    }: UpdateBoardCommentVariables) =>
      updateBoardComment(teamId, commentId, body, token),
    onSuccess: async (_, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: queryKeys.boardComment.all(variables.teamId),
        }),
        queryClient.invalidateQueries({
          queryKey: queryKeys.board.detail(
            variables.teamId,
            variables.articleId,
          ),
        }),
      ]);
    },
  });
}

export function useDeleteBoardComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ commentId, teamId, token }: DeleteBoardCommentVariables) =>
      deleteBoardComment(teamId, commentId, token),
    onSuccess: async (_, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: queryKeys.boardComment.all(variables.teamId),
        }),
        queryClient.invalidateQueries({
          queryKey: queryKeys.board.detail(
            variables.teamId,
            variables.articleId,
          ),
        }),
      ]);
    },
  });
}
