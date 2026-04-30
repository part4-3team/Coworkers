export const BOARD_DETAIL_MENU = {
  EDIT: '수정하기',
  DELETE: '삭제하기',
} as const;

export const BOARD_DETAIL_DROPDOWN_ITEMS = [
  { label: BOARD_DETAIL_MENU.EDIT },
  { label: BOARD_DETAIL_MENU.DELETE },
];
