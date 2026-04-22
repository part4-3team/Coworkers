export type TaskProps = {
  status: '시작 전' | '진행 중' | '완료';
};
export type TaskItemProps = {
  title: string;
};

export type MemberCardProps = {
  name: string;
  email: string;
  userImage: string;
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
  | 'todoDelete'
  | 'teamDelete'
  | 'teamLeave';

export type ModalMembersProps = {
  onClose: () => void;
  onPrimaryButtonClick?: () => void;
};
