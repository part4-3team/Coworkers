/**
 * 헤더 폴더에서 사용하는 TypeScript 타입을 정의하는 파일입니다.
 */

import type { RefObject } from 'react';

export type MobileSidebarDrawerProps = {
  isRendered: boolean;
  isVisible: boolean;
  onClose: () => void;
};

export type UseMobileSidebarReturn = {
  handleClose: () => void;
  handleToggle: () => void;
  isRendered: boolean;
  isVisible: boolean;
  menuButtonRef: RefObject<HTMLButtonElement | null>;
};
