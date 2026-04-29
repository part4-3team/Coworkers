'use client';

import { IcCloseLarge } from '@/assets';
import type { RightPanelCloseButtonProps } from '@/components/common/rightPanel/types';

export default function RightPanelCloseButton({
  onClose,
}: RightPanelCloseButtonProps) {
  return (
    <button
      data-right-panel-close="true"
      type="button"
      aria-label="오른쪽 패널 닫기"
      onClick={onClose}
      className="flex size-6 items-center justify-center"
    >
      <IcCloseLarge width={24} height={24} aria-hidden="true" />
    </button>
  );
}
