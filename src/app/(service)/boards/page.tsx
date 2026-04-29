/**
 * 채용 / 홍보 페이지를 구성하는 파일입니다.
 * API 연동 전에는 `constants` 목업 데이터로 UI를 표시합니다.
 */

import Link from 'next/link';

import BoardBestList from '@/app/(service)/boards/components/BoardBestList';
import BoardHeader from '@/app/(service)/boards/components/BoardHeader';
import BoardList from '@/app/(service)/boards/components/BoardList';
import PostCreateForm from '@/app/(service)/boards/components/PostCreateForm';
import {
  getMockBoardBestPosts,
  getMockBoardMainListPosts,
} from '@/app/(service)/boards/constants';
import type { Post } from '@/app/(service)/boards/types';
import {
  filterPostsByKeyword,
  hasPosts,
  isSearchMode,
} from '@/app/(service)/boards/utils/boardUtils';
import { IcPencil } from '@/assets';
import { ROUTES } from '@/constants/ROUTES';

export default async function BoardsPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; write?: string }>;
}) {
  const parsedParams = await searchParams;
  const keyword = parsedParams.search;
  const isSearchModeValue = isSearchMode(keyword);
  const isWriteMode = parsedParams.write === 'true';
  const bestPosts = getMockBoardBestPosts() as unknown as Post[];
  const listPosts = getMockBoardMainListPosts() as unknown as Post[];
  const filteredListPosts = filterPostsByKeyword(listPosts, keyword ?? '');

  return (
    <>
      {isWriteMode ? (
        <PostCreateForm />
      ) : (
        <>
          <div className="bg-white min-h-full w-full">
            <BoardHeader />

            {!isSearchModeValue && (
              <BoardBestList
                boardBestPosts={bestPosts}
                hasBoardPosts={hasPosts(listPosts)}
              />
            )}

            <BoardList
              boardPosts={filteredListPosts}
              isSearchMode={isSearchModeValue}
              keyword={keyword}
            />

            <Link href={`${ROUTES.BOARDS}?write=true`} scroll={false}>
              <div
                className="fixed bottom-10 right-3.5 z-100 md:right-6 md:bottom-20 lg:right-10 
                bg-brand-primary rounded-full w-14 h-14 hover:bg-interaction-hover shadow-floating"
              >
                <IcPencil
                  width={24}
                  height={24}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  role="img"
                  aria-label="게시글 작성"
                />
              </div>
            </Link>
          </div>
        </>
      )}
    </>
  );
}
