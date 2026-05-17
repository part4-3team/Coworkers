/** 유저 이미지 추가 버튼 컴포넌트 TypeScript 타입 정의 파일입니다. */

export type ImgAddButtonProps = {
  src?: string | null;
  onChangeFile?: (file: File | null) => void;
};
