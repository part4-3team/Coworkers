'use client';

import Image from 'next/image';

import { icCheckInverse } from '@/assets';

type TaskDetailPanelFooterProps = {
  isEditing: boolean;
  onSubmitEdit: () => void;
};

export default function TaskDetailPanelFooter({
  isEditing,
  onSubmitEdit,
}: TaskDetailPanelFooterProps) {
  return (
    <div className="flex justify-end">
      {isEditing ? (
        <button
          data-allow-unsaved="true"
          type="button"
          className="inline-flex h-11 items-center gap-1.5 rounded-full bg-brand-primary px-5 text-sm font-semibold text-text-inverse md:h-12 md:px-6 md:text-base"
          onClick={onSubmitEdit}
        >
          <Image
            src={icCheckInverse}
            alt=""
            width={16}
            height={16}
            className="size-4"
          />
          등록하기
        </button>
      ) : (
        <button
          type="button"
          className="inline-flex h-11 items-center gap-1.5 rounded-full bg-brand-primary px-5 text-sm font-semibold text-text-inverse md:h-12 md:px-6 md:text-base"
        >
          <Image
            src={icCheckInverse}
            alt=""
            width={16}
            height={16}
            className="size-4"
          />
          완료하기
        </button>
      )}
    </div>
  );
}
