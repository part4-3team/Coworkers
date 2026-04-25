/**
 * 채용 / 홍보 페이지를 구성하는 파일입니다.
 */

import BoardBestList from '@/app/(service)/boards/components/BoardBestList';
import BoardHeader from '@/app/(service)/boards/components/BoardHeader';
import { MOCK_BEST_POSTS } from '@/app/(service)/boards/constants';
import type { Post } from '@/app/(service)/boards/types';

export default function BoardsPage() {
  /** 목업 데이터 */
  const bestPosts = MOCK_BEST_POSTS as unknown as Post[];

  return (
    <main className="bg-white min-h-full w-full">
      <BoardHeader />

      <BoardBestList bestPosts={bestPosts} />
    </main>
  );
}
