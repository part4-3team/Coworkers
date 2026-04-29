/** 할 일 리스트 라우트에서 사용하는 타입 정의입니다. */

export type TaskListColumnItem = {
  id: string;
  title: string;
  completed: number;
  total: number;
};

export type TaskListTaskComment = {
  id: string;
  author: string;
  content: string;
  meta: string;
};

export type TaskListBoardTask = {
  id: string;
  title: string;
  checked: boolean;
  commentCount: number;
  dueDateLabel: string;
  repeatLabel: string;
  sortOrder: number;
  assigneeName: string;
  description: string;
  startedAtLabel: string;
  comments: TaskListTaskComment[];
};

export type TaskListTaskDetailOpenMode = 'view' | 'edit';

export type TaskListTaskDetailApplyPatch = {
  title: string;
  description: string;
  comments: TaskListTaskComment[];
};

/** 할 일 만들기 모달 — 반복 설정 값 */
export type TaskListCreateTaskRepeatValue =
  | 'once'
  | 'daily'
  | 'monthly'
  | 'weekly';

export type TaskListOpenTaskDetail = {
  mode: TaskListTaskDetailOpenMode;
  task: TaskListBoardTask;
};

export type TaskListBoardProps = {
  columnTitle: string;
  className?: string;
};

export type TaskListCreateTaskModalProps = {
  onClose: () => void;
  onSubmit?: () => void;
};

export type TaskListSidebarProps = {
  className?: string;
  columns: TaskListColumnItem[];
  activeId: string;
  onSelectColumn: (id: string) => void;
  onRequestDeleteColumn: (item: TaskListColumnItem) => void;
  onAddListClick: () => void;
};

export type TaskListTaskDetailPanelProps = {
  currentUserName: string;
  initialMode: TaskListTaskDetailOpenMode;
  onApplyPatch: (taskId: string, patch: TaskListTaskDetailApplyPatch) => void;
  onClose: () => void;
  onCompleteTask: (taskId: string) => void;
  onRequestDeleteTask: (task: TaskListBoardTask) => void;
  task: TaskListBoardTask;
};

export type TaskListTaskDetailCommentItemProps = {
  comment: TaskListTaskComment;
  currentUserName: string;
  draftContent: string;
  isEditing: boolean;
  onCancelEdit: () => void;
  onChangeDraftContent: (value: string) => void;
  onDelete: () => void;
  onStartEdit: () => void;
  onSubmitEdit: () => void;
};
