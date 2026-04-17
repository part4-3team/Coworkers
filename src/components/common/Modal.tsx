/**
 * 공용 모달 컴포넌트입니다.
 */

import type { ReactNode } from 'react';

interface ModalProps {
  children?: ReactNode;
}

export default function Modal({ children }: ModalProps) {
  return <div role="dialog">{children}</div>;
}
