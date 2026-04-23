/**
 * 수정하기와 삭제하기 액션을 제공하는 작은 메뉴형 모달입니다.
 */

'use client';

import type { EditDeleteModalProps } from '@/components/common/modal/types';
import { cn } from '@/utils/cn';

export default function EditDeleteModal({
  className,
  deleteLabel = '삭제하기',
  editLabel = '수정하기',
  onDelete,
  onEdit,
}: EditDeleteModalProps) {
  return (
    <div
      className={cn(
        'flex h-20 w-30 flex-col overflow-hidden rounded-lg border border-background-tertiary bg-background-primary',
        className,
      )}
      role="menu"
    >
      <button
        type="button"
        role="menuitem"
        className="h-10 w-full text-center text-sm font-normal text-text-primary transition-colors hover:bg-background-secondary"
        onClick={onEdit}
      >
        {editLabel}
      </button>
      <button
        type="button"
        role="menuitem"
        className="h-10 w-full text-center text-sm font-normal text-text-primary transition-colors hover:bg-background-secondary"
        onClick={onDelete}
      >
        {deleteLabel}
      </button>
    </div>
  );
}
