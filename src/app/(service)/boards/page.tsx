/**
 * 채용 / 홍보 페이지를 구성하는 파일입니다.
 * API 연동 전에는 `constants` 목업 데이터로 UI를 표시합니다.
 */

import BoardBestList from '@/app/(service)/boards/components/BoardBestList';
import BoardHeader from '@/app/(service)/boards/components/BoardHeader';
import BoardList from '@/app/(service)/boards/components/BoardList';
import BoardWriteFloatingButton from '@/app/(service)/boards/components/BoardWriteFloatingButton';
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

            <BoardWriteFloatingButton />
          </div>
        </>
      )}
    </>
  );
}
