/**
 * 오른쪽 패널 상세 화면 댓글 아이템 한 개를 렌더링하는 컴포넌트입니다.
 */

'use client';

import Image from 'next/image';

import { icMoreVerticalSmall, icUserLarge } from '@/assets';
import type { RightPanelComment } from '@/components/common/rightPanel/types';
import { cn } from '@/utils/cn';

type TaskDetailCommentItemProps = {
  comment: RightPanelComment;
  isActionOpen: boolean;
  onCloseAction: () => void;
  onToggleAction: () => void;
};

export default function TaskDetailCommentItem({
  comment,
  isActionOpen,
  onCloseAction,
  onToggleAction,
}: TaskDetailCommentItemProps) {
  return (
    <li className="py-4 first:pt-0 last:pb-0">
      <div className="flex gap-3">
        <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-background-secondary md:size-9">
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
              aria-haspopup="menu"
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
              <>
                <button
                  type="button"
                  className="text-text-default"
                  onClick={onCloseAction}
                >
                  취소
                </button>
                <button
                  type="button"
                  className="h-8 rounded-lg border border-brand-primary px-3 text-brand-primary"
                  onClick={onCloseAction}
                >
                  수정하기
                </button>
              </>
            ) : (
              comment.meta
            )}
          </div>
        </div>
      </div>
    </li>
  );
}
