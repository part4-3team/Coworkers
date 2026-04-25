/** 아바타 컴포넌트에서 사용하는 타입 정의입니다. */

/** 40: 사이드바 푸터와 동일(40px 프레임, 24px 이미지). 24: 한 칸 전체에 이미지 */
export type AvatarFrameSize = 40 | 24;

export type AvatarMember = {
  userId: number;
  userName: string;
  userImage: string;
};
