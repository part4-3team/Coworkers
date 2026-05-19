'use client';

import { useRouter } from 'next/navigation';

import BoardListCard from '@/app/(service)/boards/components/BoardListCard';
import {
  BOARD_LIST_LOAD_MORE_ELEMENT_ID,
  BOARD_LIST_LOAD_MORE_ROOT_MARGIN,
  BOARD_LIST_LOADING_MESSAGE,
  BOARD_MAIN_LIST_PARAMS,
  BOARD_SORT_OPTIONS,
  TEAM_ID,
} from '@/app/(service)/boards/constants';
import { useInfinitePages } from '@/app/(service)/boards/hooks/useInfinitePages';
import { useInfiniteScrollObserver } from '@/app/(service)/boards/hooks/useInfiniteScrollObserver';
import useSortedBoardPostsMemo from '@/app/(service)/boards/hooks/useSortedBoardPostsMemo';
import type { BoardListProps, Post } from '@/app/(service)/boards/types';
import {
  buildBoardListQueryString,
  hasPosts,
} from '@/app/(service)/boards/utils/boardListUtils';
import SelectDropdown from '@/components/common/dropdown/components/SelectDropdown';
import { ROUTES } from '@/constants/ROUTES';
import { useArticleInfiniteListQuery } from '@/hooks/useArticle';

export default function BoardList({
  isSearchMode,
  keyword,
  listSort,
}: BoardListProps) {
  const router = useRouter();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isPending,
  } = useArticleInfiniteListQuery({
    params: {
      ...BOARD_MAIN_LIST_PARAMS,
      keyword,
    },
    teamId: TEAM_ID,
  });

  /** 초기 로드가 아닌 검색어 변경·정렬 변경으로 재조회 중인 상태 */
  const isRefetching = isFetching && !isPending;

  const boardPosts = useInfinitePages<Post>({ pages: data?.pages });

  const sentinelRef = useInfiniteScrollObserver({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    rootMargin: BOARD_LIST_LOAD_MORE_ROOT_MARGIN,
  });
  const { sortedPosts } = useSortedBoardPostsMemo({
    boardPosts,
    sort: listSort,
  });
  const hasPostsValue = hasPosts(sortedPosts);

  const handleSortChange = (value: string) => {
    const nextSort = value as typeof listSort;
    router.replace(
      `${ROUTES.BOARDS}${buildBoardListQueryString({
        keyword,
        sort: nextSort,
      })}`,
    );
  };

  return (
    <section className="max-w-324.5 px-4 mt-7.25 pb-12.25 md:mt-7 md:px-6.5 lg:px-22.25 lg:mt-11.25">
      <div className="flex items-center justify-between">
        <p className="text-text-primary text-lg font-bold block leading-5.25 md:text-xl">
          {isSearchMode ? `"${keyword}" 검색 결과입니다.` : '전체'}
        </p>
        <SelectDropdown
          items={BOARD_SORT_OPTIONS.map((option) => ({
            label: option.label,
            value: option.value,
          }))}
          value={listSort}
          onChange={handleSortChange}
          className="w-23.5 md:w-30"
        />
      </div>

      {isPending ? (
        <div
          className="mt-5 flex justify-center px-6 py-12 md:mt-6 md:py-16"
          role="status"
          aria-label={BOARD_LIST_LOADING_MESSAGE}
        >
          <div className="sp-3balls">
            <div className="ball ball01" />
            <div className="ball ball02" />
            <div className="ball ball03" />
          </div>
        </div>
      ) : !hasPostsValue ? (
        <div
          className="mt-5 items-center px-6 py-12 text-center md:mt-6 md:py-16"
          role="status"
        >
          <span className="text-text-default text-sm font-regular md:text-sm">
            {isSearchMode
              ? `"${keyword}"에 대한 검색 결과가 없어요.`
              : '아직 게시글이 없어요.'}
          </span>
        </div>
      ) : (
        <div className="relative mt-5">
          {isRefetching && (
            <div
              className="absolute inset-0 z-10 flex items-center justify-center rounded-xl bg-background-primary/60"
              role="status"
              aria-label="검색 결과 불러오는 중"
            >
              <div className="sp-3balls">
                <div className="ball ball01" />
                <div className="ball ball02" />
                <div className="ball ball03" />
              </div>
            </div>
          )}
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
            {sortedPosts.map((post) => (
              <BoardListCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      )}

      {!isPending && hasPostsValue ? (
        <div
          ref={sentinelRef}
          id={BOARD_LIST_LOAD_MORE_ELEMENT_ID}
          aria-hidden
          className="pointer-events-none mt-4 h-2 w-full shrink-0 md:mt-5"
        />
      ) : null}
    </section>
  );
}
