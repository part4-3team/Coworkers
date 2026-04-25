'use client';

import { useState } from 'react';

import BoardBestCard from '@/app/(service)/boards/components/BoardBestCard';
import BoardBestPagination from '@/app/(service)/boards/components/BoardBestPagination';
import { BOARD_DEVICE_TYPE_LIMIT } from '@/app/(service)/boards/constants';
import type { Post } from '@/app/(service)/boards/types';
import useDeviceType from '@/hooks/useDeviceType';

export default function BoardBestList({ bestPosts }: { bestPosts: Post[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const deviceType = useDeviceType();
  const currentPosts = bestPosts.slice(
    (currentPage - 1) * BOARD_DEVICE_TYPE_LIMIT[deviceType],
    currentPage * BOARD_DEVICE_TYPE_LIMIT[deviceType],
  );

  return (
    <section
      className="max-w-280 px-4 py-6.75 mt-5 bg-background-secondary 
      md:mx-0 md:px-6.5 md:mt-7.5 
      lg:mx-22.25 lg:px-5.75 lg:pt-10.25 lg:pb-5 lg:rounded-[20px]"
    >
      <div>
        <span className="shrink-0 block text-text-primary text-lg font-bold leading-5.25 md:text-xl">
          베스트 게시글
        </span>
        <div className="grid grid-cols-1 gap-3 mt-5 md:grid-cols-2 xl:grid-cols-3 xl:mt-6.25">
          {currentPosts.map((post) => (
            <BoardBestCard key={post.id} post={post} />
          ))}
        </div>
        <div>
          <BoardBestPagination />
        </div>
      </div>
    </section>
  );
}
