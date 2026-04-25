export const BOARD_ORDER_BY = {
  RECENT: 'recent',
  LIKE: 'like',
} as const;

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

export const MOCK_BEST_POSTS = [
  {
    id: '1',
    title: 'Next.js App Router 정복하기: 초보자를 위한 가이드',
    content: 'App Router의 기본 개념부터 고급 기능까지 상세히 알아봅니다.',
    writer: {
      nickname: '익명개발자',
      id: 6,
    },
    likeCount: 1024,
    createdAt: '2026.04.22',
    image: undefined,
  },
  {
    id: '2',
    title: 'Tailwind CSS로 10분 만에 반응형 레이아웃 잡기',
    content:
      '모바일 우선주의(Mobile-First) 전략을 활용한 스타일링 팁을 공유합니다.',
    writer: {
      nickname: '개발왕',
      id: 5,
    },
    likeCount: 120,
    createdAt: '2026.04.22',
    image: 'https://picsum.photos/seed/post2/400/250',
  },
  {
    id: '3',
    title: '프론트엔드 성능 최적화: Skeleton UI의 중요성',
    content: '사용자의 체감 속도를 높여주는 다양한 UX 기법들을 소개합니다.',
    writer: {
      nickname: 'UX디자이너',
      id: 1,
    },
    likeCount: 98,
    createdAt: '2026.04.22',
    image: 'https://picsum.photos/seed/post1/400/250',
  },
  {
    id: '4',
    title: 'TypeScript 타입을 더 똑똑하게 사용하는 법 (as const)',
    content: '상수 관리 시 타입 안정성을 높여주는 테크닉을 정리했습니다.',
    writer: {
      nickname: 'TS장인',
      id: 2,
    },
    likeCount: 85,
    createdAt: '2026.04.23',
    image: 'https://picsum.photos/seed/post4/400/250',
  },
  {
    id: '5',
    title: '팀 프로젝트 협업을 위한 Git 브랜치 전략',
    content:
      'feat, fix, refactor... 명확한 커밋 메시지 규칙이 필요한 이유입니다.',
    writer: {
      nickname: '홍길동',
      id: 3,
    },
    likeCount: 72,
    createdAt: '2026.04.20',
    image: 'https://picsum.photos/seed/post5/400/250',
  },
  {
    id: '6',
    title: '리액트 커스텀 훅으로 비즈니스 로직 분리하기',
    content: '컴포넌트를 가볍게 만드는 재사용 가능한 훅 설계 방법론입니다.',
    writer: {
      nickname: '시니어개발자',
      id: 4,
    },
    likeCount: 61,
    createdAt: '2026.04.16',
    image: 'https://picsum.photos/seed/post6/400/250',
  },
];
