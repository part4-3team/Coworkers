'use client';

import Image from 'next/image';

import { icCloseLarge } from '@/assets';
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
      <Image src={icCloseLarge} alt="" width={24} height={24} />
    </button>
  );
}
