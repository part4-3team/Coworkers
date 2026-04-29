import type { ArticleListQueryParams } from '@/api/queryKeys';

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

/**
 * 하단 무한 스크롤 감지 요소용 id.
 * 나중에 `document.getElementById(BOARD_LIST_LOAD_MORE_ELEMENT_ID)` 또는 ref 연동 시 사용.
 */
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
 * UI 목업용 게시글 단일 소스입니다. API 연동 시 제거하거나 개발 전용으로만 사용합니다.
 * `Post`와 동일.
 */
export const MOCK_BOARD_POSTS = [
  {
    id: 1,
    title: 'Next.js App Router 정복하기: 초보자를 위한 가이드',
    content: 'App Router의 기본 개념부터 고급 기능까지 상세히 알아봅니다.',
    writer: {
      nickname: '익명개발자',
      id: 6,
    },
    likeCount: 0,
    commentCount: 12,
    createdAt: '2026.04.22',
    updatedAt: '2026.04.22',
    image: undefined,
  },
  {
    id: 2,
    title: 'Tailwind CSS로 10분 만에 반응형 레이아웃 잡기',
    content:
      '모바일 우선주의(Mobile-First) 전략을 활용한 스타일링 팁을 공유합니다.',
    writer: {
      nickname: '개발왕',
      id: 5,
    },
    likeCount: 120,
    commentCount: 4,
    createdAt: '2026.04.22',
    updatedAt: '2026.04.22',
    image: 'https://picsum.photos/seed/post2/400/250',
  },
  {
    id: 3,
    title: '프론트엔드 성능 최적화: Skeleton UI의 중요성',
    content: '사용자의 체감 속도를 높여주는 다양한 UX 기법들을 소개합니다.',
    writer: {
      nickname: 'UX디자이너',
      id: 1,
    },
    likeCount: 98,
    commentCount: 8,
    createdAt: '2026.04.22',
    updatedAt: '2026.04.22',
    image: 'https://picsum.photos/seed/post1/400/250',
  },
  {
    id: 4,
    title: 'TypeScript 타입을 더 똑똑하게 사용하는 법 (as const)',
    content: '상수 관리 시 타입 안정성을 높여주는 테크닉을 정리했습니다.',
    writer: {
      nickname: 'TS장인',
      id: 2,
    },
    likeCount: 85,
    commentCount: 3,
    createdAt: '2026.04.23',
    updatedAt: '2026.04.23',
    image: 'https://picsum.photos/seed/post4/400/250',
  },
  {
    id: 5,
    title: '팀 프로젝트 협업을 위한 Git 브랜치 전략',
    content:
      'feat, fix, refactor... 명확한 커밋 메시지 규칙이 필요한 이유입니다.',
    writer: {
      nickname: '홍길동',
      id: 3,
    },
    likeCount: 72,
    commentCount: 5,
    createdAt: '2026.04.20',
    updatedAt: '2026.04.20',
    image: 'https://picsum.photos/seed/post5/400/250',
  },
  {
    id: 6,
    title: '리액트 커스텀 훅으로 비즈니스 로직 분리하기',
    content: '컴포넌트를 가볍게 만드는 재사용 가능한 훅 설계 방법론입니다.',
    writer: {
      nickname: '시니어개발자',
      id: 4,
    },
    likeCount: 61,
    commentCount: 2,
    createdAt: '2026.04.16',
    updatedAt: '2026.04.16',
    image: 'https://picsum.photos/seed/post6/400/250',
  },
  {
    id: 7,
    title: '리액트 중간 개발자 채용 게시글',
    content:
      '중간 개발자를 채용하는 게시글입니다.중간 개발자를 채용하는 게시글입니다.중간 개발자를 채용하는 게시글입니다.',
    writer: {
      nickname: '중간 개발자',
      id: 7,
    },
    likeCount: 361,
    commentCount: 19,
    createdAt: '2026.04.27',
    updatedAt: '2026.04.27',
    image: 'https://picsum.photos/seed/post6/400/250',
  },
  {
    id: 8,
    title: '리액트 초보 개발자 채용 게시글',
    content: '초보 개발자를 채용하는 게시글입니다.',
    writer: {
      nickname: '초보 개발자',
      id: 8,
    },
    likeCount: 615,
    commentCount: 31,
    createdAt: '2026.04.25',
    updatedAt: '2026.04.25',
    image: 'https://picsum.photos/seed/post6/400/250',
  },
  {
    id: 9,
    title: '리액트 신입 개발자 채용 게시글',
    content: '신입 개발자를 채용하는 게시글입니다.',
    writer: {
      nickname: '신입 개발자',
      id: 9,
    },
    likeCount: 611,
    commentCount: 2,
    createdAt: '2026.04.13',
    updatedAt: '2026.04.13',
    image: 'https://picsum.photos/seed/post6/400/250',
  },
  {
    id: 10,
    title: '리액트 중고 신입 개발자 채용 게시글',
    content: '중고 신입 개발자를 채용하는 게시글입니다.',
    writer: {
      nickname: '중고 신입 개발자',
      id: 10,
    },
    likeCount: 6151,
    commentCount: 1,
    createdAt: '2026.04.15',
    updatedAt: '2026.04.15',
    image: 'https://picsum.photos/seed/post6/400/250',
  },
  {
    id: 11,
    title: '리액트 개발자 지망생 채용 게시글',
    content: '개발자 지망생을 채용하는 게시글입니다.',
    writer: {
      nickname: '개발자 지망생',
      id: 11,
    },
    likeCount: 151,
    commentCount: 12,
    createdAt: '2026.04.11',
    updatedAt: '2026.04.11',
    image: 'https://picsum.photos/seed/post6/400/250',
  },
] as const;

/**
 * 베스트 영역: 좋아요가 1개 이상인 글만 대상으로 좋아요순 상위
 * `BOARD_BEST_LIST_PARAMS.pageSize`개. 전부 0이면 빈 배열.
 */
export function getMockBoardBestPosts() {
  const withLikes = MOCK_BOARD_POSTS.filter((post) => post.likeCount > 0);

  if (withLikes.length === 0) {
    return [];
  }

  return [...withLikes]
    .sort((a, b) => b.likeCount - a.likeCount)
    .slice(0, BOARD_BEST_LIST_PARAMS.pageSize);
}

/** 전체 목록: 최신순(날짜 내림차순) */
export function getMockBoardMainListPosts() {
  return [...MOCK_BOARD_POSTS].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}
