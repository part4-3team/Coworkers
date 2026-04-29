import type { CommentListResponse } from '@/app/(service)/boards/[articleId]/types';

export const BOARD_DETAIL_MENU = {
  EDIT: '수정하기',
  DELETE: '삭제하기',
} as const;

export const BOARD_DETAIL_DROPDOWN_ITEMS = [
  { label: BOARD_DETAIL_MENU.EDIT },
  { label: BOARD_DETAIL_MENU.DELETE },
];

export const MOCK_COMMENT_LIST: CommentListResponse = {
  nextCursor: 2,
  list: [
    {
      id: 1,
      content: '와, 정말 유익한 정보네요! 감사합니다.',
      createdAt: '2026.04.28',
      updatedAt: '2026.04.28',
      writer: {
        id: 101,
        nickname: '프론트엔드꿈나무',
        image: null,
      },
    },
    {
      id: 2,
      content: '혹시 사용하신 기술 스택에 대해 더 자세히 알 수 있을까요?',
      createdAt: '2026.04.28',
      updatedAt: '2026.04.28',
      writer: {
        id: 102,
        nickname: '클린코드빌런',
        image: 'https://picsum.photos/seed/post6/400/250',
      },
    },
  ],
};
