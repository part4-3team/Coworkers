'use client';

import { useMemo } from 'react';

import {
  MOVE_TO_BACK,
  MOVE_TO_FRONT,
} from '@/app/(service)/boards/[articleId]/constants';
import type { Comment } from '@/app/(service)/boards/[articleId]/types';

type UseSortedCommentsParams = {
  comments: Comment[];
  userId: number;
};

export const useSortedComments = ({
  comments,
  userId,
}: UseSortedCommentsParams) => {
  return useMemo(
    () =>
      [...comments].sort((a, b) => {
        const isAOwnComment = a.writer.id === userId;
        const isBOwnComment = b.writer.id === userId;

        if (isAOwnComment !== isBOwnComment) {
          return isAOwnComment ? MOVE_TO_FRONT : MOVE_TO_BACK;
        }

        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }),
    [comments, userId],
  );
};
