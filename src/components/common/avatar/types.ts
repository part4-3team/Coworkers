/** 아바타 컴포넌트에서 사용하는 타입 정의입니다. */

/** 40: 사이드바 푸터와 동일(40px 프레임, 24px 이미지). 24: 한 칸 전체에 이미지 */
export type AvatarFrameSize = 40 | 24;

export type AvatarMember = {
  userId: number;
  userName: string;
  userImage: string;
};

export type AvatarProps = {
  src?: string;
  /** 생략 시 스크린리더용 기본 문구 사용. 가능하면 사용자 이름 등을 넘기는 것을 권장합니다. */
  alt?: string;
  /** 기본 40(사이드바와 동일). 24는 한 칸 전체를 이미지가 채우는 컴팩트 크기 */
  size?: AvatarFrameSize;
  className?: string;
};

export type AvatarStackProps = {
  members: AvatarMember[];
  className?: string;
};

export type UserProfileProps = {
  src?: string;
  name: string;
  description?: string;
  className?: string;
};
