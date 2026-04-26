/** 할 일 리스트 라우트에서 사용하는 타입 정의입니다. */

export type TaskListColumnItem = {
  id: string;
  title: string;
  completed: number;
  total: number;
};

export type TaskListBoardTask = {
  id: string;
  title: string;
  checked: boolean;
  commentCount: number;
  dueDateLabel: string;
  repeatLabel: string;
  sortOrder: number;
};
