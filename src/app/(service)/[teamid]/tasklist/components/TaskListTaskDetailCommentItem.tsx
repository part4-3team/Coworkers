'use client';

import Image from 'next/image';

import TaskListTaskDetailCommentActions from '@/app/(service)/[teamid]/tasklist/components/TaskListTaskDetailCommentActions';
import type { TaskListTaskComment } from '@/app/(service)/[teamid]/tasklist/types';
import { icMoreVerticalSmall, icUserLarge } from '@/assets';
import { ListDropdown } from '@/components/common/dropdown';
import { cn } from '@/utils/cn';

/** 스크롤 영역 `px-6 md:px-8` 과 맞춰 배경만 가로 풀폭으로 깔기 (콘텐츠 정렬은 그대로) */
const commentRowBleedXClassName = '-mx-6 px-6 md:-mx-8 md:px-8';

const commentFormTextareaClassName =
  'min-h-20 resize-none rounded-xl border border-background-tertiary bg-background-primary px-4 py-3 text-sm font-medium leading-5 text-text-primary outline-none placeholder:text-text-default focus:border-brand-primary md:min-h-24 md:text-base';

/** lg+: 본문/인풋 왼쪽 · 취소·(등록|수정) 오른쪽 한 줄. 태블릿·모바일은 세로. */
const commentBodyActionsRowClassName =
  'flex min-w-0 flex-col items-stretch gap-3 md:gap-4 lg:flex-row lg:items-end';

const commentActionsSlotClassName =
  'flex w-full shrink-0 justify-end pt-1 lg:w-auto lg:shrink-0 lg:pt-0';

/** 편집 textarea / 보기 본문+메타+삭제 — 오른쪽 버튼 열과 같은 flex 슬롯 */
const commentBodyLeftSlotClassName =
  'flex min-w-0 w-full max-w-full flex-col gap-2 lg:w-auto lg:flex-1 lg:min-w-0';

type TaskListTaskDetailCommentItemProps = {
  comment: TaskListTaskComment;
  currentUserName: string;
  draftContent: string;
  isEditing: boolean;
  onCancelEdit: () => void;
  onChangeDraftContent: (value: string) => void;
  onDelete: () => void;
  onStartEdit: () => void;
  onSubmitEdit: () => void;
};

export default function TaskListTaskDetailCommentItem({
  comment,
  currentUserName,
  draftContent,
  isEditing,
  onCancelEdit,
  onChangeDraftContent,
  onDelete,
  onStartEdit,
  onSubmitEdit,
}: TaskListTaskDetailCommentItemProps) {
  const isOwnComment = comment.author === currentUserName;

  if (isEditing) {
    return (
      <li className={cn('bg-icon-inverse py-4', commentRowBleedXClassName)}>
        <div className="flex gap-3">
          <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-background-tertiary md:size-9">
            <Image src={icUserLarge} alt="" width={20} height={20} />
          </span>

          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-text-primary md:text-base">
              {comment.author}
            </p>

            <div className={cn('mt-3', commentBodyActionsRowClassName)}>
              <div className={commentBodyLeftSlotClassName}>
                <textarea
                  value={draftContent}
                  placeholder="내용을 입력하세요."
                  className={cn(commentFormTextareaClassName, 'w-full min-w-0')}
                  onChange={(event) => {
                    onChangeDraftContent(event.target.value);
                  }}
                />
              </div>

              <div className={commentActionsSlotClassName}>
                <TaskListTaskDetailCommentActions
                  primaryLabel="등록하기"
                  onCancel={onCancelEdit}
                  onPrimaryAction={onSubmitEdit}
                />
              </div>
            </div>
          </div>
        </div>
      </li>
    );
  }

  return (
    <li
      className={cn(
        'py-4',
        isOwnComment && ['bg-icon-inverse', commentRowBleedXClassName],
      )}
    >
      <div className="flex gap-3">
        <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-background-tertiary md:size-9">
          <Image src={icUserLarge} alt="" width={20} height={20} />
        </span>

        <div className="min-w-0 flex-1">
          {isOwnComment ? (
            <>
              <p className="text-sm font-bold text-text-primary md:text-base">
                {comment.author}
              </p>
              <div className={cn('mt-3', commentBodyActionsRowClassName)}>
                <div className={commentBodyLeftSlotClassName}>
                  <p className="whitespace-pre-line text-sm font-medium leading-5 text-text-secondary md:text-base">
                    {comment.content}
                  </p>
                  <div className="text-sm font-medium text-interaction-inactive">
                    {comment.meta}
                  </div>
                  <button
                    data-allow-unsaved="true"
                    type="button"
                    className="self-start text-sm font-medium text-text-default hover:text-text-primary"
                    onClick={onDelete}
                  >
                    삭제하기
                  </button>
                </div>

                <div className={commentActionsSlotClassName}>
                  <TaskListTaskDetailCommentActions
                    primaryLabel="수정하기"
                    onCancel={() => {
                      /* 보기 모드: 시안상 취소 노출, 동작은 추후 연결 */
                    }}
                    onPrimaryAction={onStartEdit}
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-sm font-bold text-text-primary md:text-base">
                    {comment.author}
                  </p>
                  <p className="mt-1 whitespace-pre-line text-sm font-medium leading-5 text-text-secondary md:text-base">
                    {comment.content}
                  </p>
                </div>

                <ListDropdown
                  className="shrink-0"
                  items={[
                    { label: '수정하기', onClick: onStartEdit },
                    { label: '삭제하기', onClick: onDelete },
                  ]}
                  trigger={
                    <>
                      <span className="sr-only">{`${comment.author} 댓글 더보기`}</span>
                      <span
                        className="flex size-6 items-center justify-center"
                        aria-hidden="true"
                      >
                        <Image
                          src={icMoreVerticalSmall}
                          alt=""
                          width={20}
                          height={20}
                          className="size-5"
                        />
                      </span>
                    </>
                  }
                />
              </div>

              <div className="mt-2 text-sm font-medium text-interaction-inactive">
                {comment.meta}
              </div>
            </>
          )}
        </div>
      </div>
    </li>
  );
}
