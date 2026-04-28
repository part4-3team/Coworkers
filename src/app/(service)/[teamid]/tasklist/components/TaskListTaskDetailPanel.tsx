'use client';

import { useEffect, useSyncExternalStore } from 'react';

import Image from 'next/image';

import { createPortal } from 'react-dom';

import TaskListTaskDetailCommentInput from '@/app/(service)/[teamid]/tasklist/components/TaskListTaskDetailCommentInput';
import TaskListTaskDetailCommentItem from '@/app/(service)/[teamid]/tasklist/components/TaskListTaskDetailCommentItem';
import TaskListTaskDetailMeta from '@/app/(service)/[teamid]/tasklist/components/TaskListTaskDetailMeta';
import useTaskListTaskDetailPanel from '@/app/(service)/[teamid]/tasklist/hooks/useTaskListTaskDetailPanel';
import type {
  TaskListBoardTask,
  TaskListTaskDetailApplyPatch,
  TaskListTaskDetailOpenMode,
} from '@/app/(service)/[teamid]/tasklist/types';
import { icCheckInverse, icCloseSmall, icMoreVerticalSmall } from '@/assets';
import { ListDropdown } from '@/components/common/dropdown';
import { ContentTextarea, TitleInput } from '@/components/common/form';

type TaskListTaskDetailPanelProps = {
  currentUserName: string;
  initialMode: TaskListTaskDetailOpenMode;
  onApplyPatch: (taskId: string, patch: TaskListTaskDetailApplyPatch) => void;
  onClose: () => void;
  onCompleteTask: (taskId: string) => void;
  onRequestDeleteTask: (task: TaskListBoardTask) => void;
  task: TaskListBoardTask;
};

export default function TaskListTaskDetailPanel({
  currentUserName,
  initialMode,
  onApplyPatch,
  onClose,
  onCompleteTask,
  onRequestDeleteTask,
  task,
}: TaskListTaskDetailPanelProps) {
  const canUseDom = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const {
    comments,
    commitTaskEdit,
    description,
    draftCommentContent,
    draftDescription,
    draftTitle,
    handleCancelCommentEdit,
    handleCancelTaskEdit,
    handleDeleteComment,
    handleStartCommentEdit,
    handleStartTaskEdit,
    handleSubmitCommentEdit,
    isTaskEditing,
    setDraftCommentContent,
    setDraftDescription,
    setDraftTitle,
    title,
    editingCommentId,
  } = useTaskListTaskDetailPanel({ currentUserName, initialMode, task });

  const handleBackdropPointerDown = (event: React.PointerEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleRegisterTask = () => {
    const patch = commitTaskEdit();
    onApplyPatch(task.id, patch);
    onClose();
  };

  const handleComplete = () => {
    onCompleteTask(task.id);
    onClose();
  };

  const handleDeleteFromPanel = () => {
    onRequestDeleteTask(task);
    onClose();
  };

  if (!canUseDom) {
    return null;
  }

  return createPortal(
    <div
      className="fixed inset-x-0 bottom-0 top-13 z-50 flex justify-end bg-black/25 md:inset-0"
      role="presentation"
      onPointerDown={handleBackdropPointerDown}
    >
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="task-list-detail-title"
        className="flex h-full w-full shrink-0 flex-col bg-background-inverse shadow-xl md:max-w-xl lg:max-w-3xl"
        onPointerDown={(event) => {
          event.stopPropagation();
        }}
      >
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

        <div className="min-h-0 flex-1 overflow-y-auto px-6 pb-36 pt-6 md:px-8 md:pb-40 md:pt-8">
          {isTaskEditing ? (
            <TitleInput
              value={draftTitle}
              placeholder="제목을 입력해주세요."
              onChange={(event) => {
                setDraftTitle(event.target.value);
              }}
            />
          ) : (
            <div className="flex items-start justify-between gap-4">
              <h2
                id="task-list-detail-title"
                className="min-w-0 flex-1 text-xl font-bold text-text-primary md:text-2xl"
              >
                {title}
              </h2>

              <ListDropdown
                className="shrink-0"
                items={[
                  { label: '수정하기', onClick: handleStartTaskEdit },
                  { label: '삭제하기', onClick: handleDeleteFromPanel },
                ]}
                trigger={
                  <>
                    <span className="sr-only">{`${title} 더보기`}</span>
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
          )}

          <div className="mt-5 md:mt-6">
            <TaskListTaskDetailMeta
              assigneeName={task.assigneeName}
              frequency={task.repeatLabel}
              startedAtLabel={task.startedAtLabel}
            />
          </div>

          <div className="mt-6 border-t border-background-tertiary pt-6 md:mt-7 md:pt-7">
            {isTaskEditing ? (
              <ContentTextarea
                value={draftDescription}
                placeholder="내용을 입력하세요."
                className="min-h-24 md:min-h-28"
                onChange={(event) => {
                  setDraftDescription(event.target.value);
                }}
              />
            ) : (
              <p className="text-sm font-medium leading-6 text-text-secondary md:text-base">
                {description}
              </p>
            )}

            <section className="mt-8 md:mt-9">
              <h3 className="text-lg font-bold text-text-primary md:text-xl">
                댓글{' '}
                <span className="text-brand-primary">{comments.length}</span>
              </h3>

              <div className="mt-4">
                <TaskListTaskDetailCommentInput />
              </div>

              <ul className="mt-5 divide-y divide-background-tertiary">
                {comments.map((comment) => (
                  <TaskListTaskDetailCommentItem
                    key={comment.id}
                    comment={comment}
                    currentUserName={currentUserName}
                    draftContent={draftCommentContent}
                    isEditing={editingCommentId === comment.id}
                    onCancelEdit={handleCancelCommentEdit}
                    onChangeDraftContent={setDraftCommentContent}
                    onDelete={() => {
                      handleDeleteComment(comment.id);
                    }}
                    onStartEdit={() => {
                      handleStartCommentEdit(comment);
                    }}
                    onSubmitEdit={handleSubmitCommentEdit}
                  />
                ))}
              </ul>
            </section>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-8 px-6 md:bottom-10 md:px-8">
          <div className="flex justify-end">
            {isTaskEditing ? (
              <div className="flex items-center gap-3 text-sm font-medium text-text-default md:text-base">
                <button
                  data-allow-unsaved="true"
                  type="button"
                  className="text-text-default"
                  onClick={handleCancelTaskEdit}
                >
                  취소
                </button>
                <button
                  data-allow-unsaved="true"
                  type="button"
                  className="inline-flex h-11 items-center gap-1.5 rounded-full bg-brand-primary px-5 font-semibold text-text-inverse md:h-12 md:px-6"
                  onClick={handleRegisterTask}
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
              </div>
            ) : (
              <button
                type="button"
                className="inline-flex h-11 items-center gap-1.5 rounded-full bg-brand-primary px-5 text-sm font-semibold text-text-inverse md:h-12 md:px-6 md:text-base"
                onClick={handleComplete}
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
        </div>
      </aside>
    </div>,
    document.body,
  );
}
