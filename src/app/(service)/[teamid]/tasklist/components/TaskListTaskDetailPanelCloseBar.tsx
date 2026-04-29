'use client';

import Image from 'next/image';

import { icCloseSmall } from '@/assets';

type TaskListTaskDetailPanelCloseBarProps = {
  onClose: () => void;
};

export default function TaskListTaskDetailPanelCloseBar({
  onClose,
}: TaskListTaskDetailPanelCloseBarProps) {
  return (
    <div className="flex shrink-0 items-center px-6 pt-6 md:px-8 md:pt-8">
      <button
        type="button"
        className="flex size-10 items-center justify-center rounded-lg text-text-primary outline-none ring-brand-primary focus-visible:ring-2"
        aria-label="닫기"
        onClick={onClose}
      >
        <Image src={icCloseSmall} alt="" width={24} height={24} />
      </button>
    </div>
  );
}
