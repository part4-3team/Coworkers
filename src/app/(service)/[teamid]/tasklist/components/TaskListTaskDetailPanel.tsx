'use client';

import { useEffect, useSyncExternalStore } from 'react';

import { createPortal } from 'react-dom';

import TaskListTaskDetailPanelCloseBar from '@/app/(service)/[teamid]/tasklist/components/TaskListTaskDetailPanelCloseBar';
import TaskListTaskDetailPanelContent from '@/app/(service)/[teamid]/tasklist/components/TaskListTaskDetailPanelContent';
import TaskListTaskDetailPanelFooterActions from '@/app/(service)/[teamid]/tasklist/components/TaskListTaskDetailPanelFooterActions';
import useTaskListTaskDetailPanel from '@/app/(service)/[teamid]/tasklist/hooks/useTaskListTaskDetailPanel';
import type { TaskListTaskDetailPanelProps } from '@/app/(service)/[teamid]/tasklist/types';

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
        <TaskListTaskDetailPanelCloseBar onClose={onClose} />

        <TaskListTaskDetailPanelContent
          comments={comments}
          currentUserName={currentUserName}
          description={description}
          draftCommentContent={draftCommentContent}
          draftDescription={draftDescription}
          draftTitle={draftTitle}
          editingCommentId={editingCommentId}
          isTaskEditing={isTaskEditing}
          onCancelCommentEdit={handleCancelCommentEdit}
          onChangeDraftContent={setDraftCommentContent}
          onDeleteComment={handleDeleteComment}
          onStartCommentEdit={handleStartCommentEdit}
          onSubmitCommentEdit={handleSubmitCommentEdit}
          onDeleteFromPanel={handleDeleteFromPanel}
          onStartTaskEdit={handleStartTaskEdit}
          setDraftDescription={setDraftDescription}
          setDraftTitle={setDraftTitle}
          task={task}
          title={title}
        />

        <TaskListTaskDetailPanelFooterActions
          isTaskEditing={isTaskEditing}
          onCancelTaskEdit={handleCancelTaskEdit}
          onComplete={handleComplete}
          onRegisterTask={handleRegisterTask}
        />
      </aside>
    </div>,
    document.body,
  );
}
