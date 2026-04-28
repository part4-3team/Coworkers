'use client';

import { useState } from 'react';

import type { BoardDetailProps } from '@/app/(service)/boards/[articleId]/types';

export const useLike = (boardDetail: BoardDetailProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(boardDetail.boardDetail.likeCount);

  const handleLikeClick = () => {
    if (isLiked) {
      setIsLiked(false);
      setLikeCount((prev) => prev - 1);
    } else {
      setIsLiked(true);
      setLikeCount((prev) => prev + 1);
    }
  };

  return { isLiked, likeCount, handleLikeClick };
};
