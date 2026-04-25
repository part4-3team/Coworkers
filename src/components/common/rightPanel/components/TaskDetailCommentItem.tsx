/**
 * 오른쪽 패널 상세 화면 댓글 아이템 한 개를 렌더링하는 컴포넌트입니다.
 */

'use client';

import Image from 'next/image';

import { icMoreVerticalSmall, icUserLarge } from '@/assets';
import TaskDetailCommentActions from '@/components/common/rightPanel/components/TaskDetailCommentActions';
import type { RightPanelComment } from '@/components/common/rightPanel/types';
import { cn } from '@/utils/cn';

type TaskDetailCommentItemProps = {
  comment: RightPanelComment;
  draftContent: string;
  isActionOpen: boolean;
  isEditing: boolean;
  onCancelAction: () => void;
  onCancelEdit: () => void;
  onChangeDraftContent: (value: string) => void;
  onStartEdit: () => void;
  onSubmitEdit: () => void;
  onToggleAction: () => void;
};

export default function TaskDetailCommentItem({
  comment,
  draftContent,
  isActionOpen,
  isEditing,
  onCancelAction,
  onCancelEdit,
  onChangeDraftContent,
  onStartEdit,
  onSubmitEdit,
  onToggleAction,
}: TaskDetailCommentItemProps) {
  if (isEditing) {
    return (
      <li className="bg-background-secondary py-4 first:pt-4 last:pb-4">
        <div className="flex gap-3 px-4 md:px-5">
          <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-background-tertiary md:size-9">
            <Image src={icUserLarge} alt="" width={20} height={20} />
          </span>

          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-text-primary md:text-base">
              {comment.author}
            </p>

            <div className="mt-3 flex flex-col gap-3 md:flex-row md:items-end">
              <textarea
                value={draftContent}
                placeholder="내용을 입력하세요."
                className="min-h-18 w-full resize-none rounded-xl border border-background-tertiary bg-background-primary px-4 py-3 text-sm font-medium text-text-primary outline-none placeholder:text-text-default focus:border-brand-primary md:text-base"
                onChange={(event) => {
                  onChangeDraftContent(event.target.value);
                }}
              />

              <TaskDetailCommentActions
                primaryLabel="등록하기"
                onCancel={onCancelEdit}
                onPrimaryAction={onSubmitEdit}
              />
            </div>
          </div>
        </div>
      </li>
    );
  }

  return (
    <li className="py-4 first:pt-0 last:pb-0">
      <div className="flex gap-3">
        <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-background-tertiary md:size-9">
          <Image src={icUserLarge} alt="" width={20} height={20} />
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-sm font-bold text-text-primary md:text-base">
                {comment.author}
              </p>
              <p className="mt-1 whitespace-pre-line text-sm font-medium leading-5 text-text-secondary md:text-base">
                {comment.content}
              </p>
            </div>

            <button
              type="button"
              aria-label={`${comment.author} 댓글 더보기`}
              aria-expanded={isActionOpen}
              className="flex size-6 shrink-0 items-center justify-center"
              onClick={onToggleAction}
            >
              <Image src={icMoreVerticalSmall} alt="" width={20} height={20} />
            </button>
          </div>

          <div
            className={cn(
              'mt-2 text-sm font-medium text-text-default',
              isActionOpen && 'flex items-center justify-end gap-3',
            )}
          >
            {isActionOpen ? (
              <TaskDetailCommentActions
                primaryLabel="수정하기"
                onCancel={onCancelAction}
                onPrimaryAction={onStartEdit}
              />
            ) : (
              comment.meta
            )}
          </div>
        </div>
      </div>
    </li>
  );
}
