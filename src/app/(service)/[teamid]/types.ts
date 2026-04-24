import type { ReactNode } from 'react';

export type TaskProps = {
  status: '시작 전' | '진행 중' | '완료';
};
export type TaskItemProps = {
  title: string;
  status: string;
};

export type MemberCardProps = {
  name: string;
  email: string;
  userImage: string;
  onClick: () => void;
};

export type MemberChipsProps = {
  role: string;
  userImage: string;
  userEmail: string;
  userName: string;
  groupId: number;
  userId: number;
};

export type ModalKey =
  | 'memberList'
  | 'memberInvite'
  | 'memberDetail'
  | 'memberDelete'
  | 'taskAdd'
  | 'taskEdit'
  | 'taskDelete'
  | 'teamDelete'
  | 'teamLeave';

export type ModalMembersProps = {
  onClose: () => void;
  onPrimaryButtonClick?: () => void;
  member?: MemberChipsProps | null; // ✅ null 추가
};
export type ModalTaskProps = {
  onClose: () => void;
  onPrimaryButtonClick?: () => void;
};

export type ConfirmModalProps = {
  title?: string;
  description?: string;
  confirmText: string;
  toastMessage: string;
  onClose: () => void;
  onConfirm?: () => void;
  children?: ReactNode;
};
