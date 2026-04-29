import type { Post } from '@/app/(service)/boards/types';

export type BoardDetailProps = {
  boardDetail: Post;
  userProfile: UserProfileResponse;
};

export type BoardDetailParams = {
  articleId: string;
};

type Group = {
  id: number;
  teamId: string;
  updatedAt: string;
  createdAt: string;
  image: string;
  name: string;
};

/** * 멤버십(그룹 가입 정보) 타입
 */
type Membership = {
  group: Group;
  role: 'ADMIN' | 'MEMBER';
  userImage?: string;
  userEmail: string;
  userName: string;
  groupId: number;
  userId: number;
};

/** * 최종 프로필 조회 응답 타입
 */
export type UserProfileResponse = {
  teamId: string;
  image: string;
  nickname: string;
  updatedAt: string;
  createdAt: string;
  email: string;
  id: number;
  memberships: Membership[];
};

type CommentWriter = {
  image: string | null;
  nickname: string;
  id: number;
};

export type Comment = {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  writer: CommentWriter;
};

export type CommentListResponse = {
  nextCursor: number | null;
  list: Comment[];
};
