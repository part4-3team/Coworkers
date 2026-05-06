import type { ArticleListQueryParams } from '@/api/queryKeys';
import type { Post } from '@/app/(service)/boards/types';

export const BOARD_ORDER_BY = {
  RECENT: 'recent',
  LIKE: 'like',
} as const;

export const BOARD_BEST_LIST_PARAMS = {
  orderBy: BOARD_ORDER_BY.LIKE,
  page: 1,
  pageSize: 6,
} satisfies ArticleListQueryParams;

export const BOARD_MAIN_LIST_PARAMS = {
  orderBy: BOARD_ORDER_BY.RECENT,
  page: 1,
  pageSize: 8,
} satisfies ArticleListQueryParams;

export const BOARD_LIST_LOAD_MORE_ELEMENT_ID = 'board-list-load-more-sentinel';

export const BOARD_LIST_LOAD_MORE_ROOT_MARGIN = '240px';

export const BOARD_DEVICE_TYPE = {
  PC: 'PC',
  TABLET: 'TABLET',
  MOBILE: 'MOBILE',
} as const;

export const BOARD_DEVICE_TYPE_LIMIT = {
  [BOARD_DEVICE_TYPE.PC]: 3,
  [BOARD_DEVICE_TYPE.TABLET]: 2,
  [BOARD_DEVICE_TYPE.MOBILE]: 1,
} as const;

export const BOARD_SORT_OPTIONS = [
  { label: '최신순', value: 'latest' },
  { label: '좋아요순', value: 'likes' },
] as const;

/**
 * 베스트 영역용 게시글을 계산합니다.
 * 좋아요가 1개 이상인 글만 대상으로 좋아요순 상위를 반환합니다.
 */
export function getBoardBestPosts(posts: Post[]) {
  const withLikes = posts.filter((post) => post.likeCount > 0);

  if (withLikes.length === 0) {
    return [];
  }

  return [...withLikes]
    .sort((a, b) => b.likeCount - a.likeCount)
    .slice(0, BOARD_BEST_LIST_PARAMS.pageSize);
}

/** 전체 목록: 최신순(날짜 내림차순) */
export function sortBoardMainListPostsByRecent(posts: Post[]) {
  return [...posts].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}
