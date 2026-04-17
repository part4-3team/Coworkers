/**
 * 모달의 공통 프레임을 담당하는 컴포넌트입니다.
 */

import type { ReactNode } from 'react';

interface ModalFrameProps {
  children?: ReactNode;
}

export default function ModalFrame({ children }: ModalFrameProps) {
  // TODO: 모달 뒤의 어두운 배경과 흰색 박스 레이아웃을 구현합니다.
  // TODO: 모달 내부 높이는 사용하는 모달마다 자유롭게 조절할 수 있게 props로 열어둡니다.
  return <div>{children}</div>;
}
