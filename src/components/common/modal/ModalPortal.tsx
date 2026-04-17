/**
 * 모달을 최상단 DOM으로 렌더링하는 공용 포탈 컴포넌트입니다.
 */

import type { ReactNode } from 'react';

interface ModalPortalProps {
  children?: ReactNode;
}

export default function ModalPortal({ children }: ModalPortalProps) {
  // TODO: createPortal을 사용해 모달을 document.body 같은 최상단 DOM에 렌더링합니다.
  // TODO: z-index와 부모 요소의 overflow 영향을 피하기 위해 ModalFrame 바깥에서 사용합니다.
  // TODO: document 접근이 필요하므로 클라이언트 컴포넌트로 구현해야 합니다.
  return <>{children}</>;
}
