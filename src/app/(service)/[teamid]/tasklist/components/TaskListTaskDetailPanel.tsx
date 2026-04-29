'use client';

import TaskListTaskDetailPanelContent from '@/app/(service)/[teamid]/tasklist/components/TaskListTaskDetailPanelContent';
import TaskListTaskDetailPanelFooterActions from '@/app/(service)/[teamid]/tasklist/components/TaskListTaskDetailPanelFooterActions';
import useTaskListTaskDetailPanel from '@/app/(service)/[teamid]/tasklist/hooks/useTaskListTaskDetailPanel';
import type { TaskListTaskDetailPanelProps } from '@/app/(service)/[teamid]/tasklist/types';
import useUnsavedChangesToastGuard from '@/components/common/rightPanel/hooks/useUnsavedChangesToastGuard';
import useRightPanel from '@/components/layout/hooks/useRightPanel';

export default function TaskListTaskDetailPanel({
  currentUserName,
  initialMode,
  onApplyPatch,
  onCompleteTask,
  onRequestDeleteTask,
  task,
}: TaskListTaskDetailPanelProps) {
  const { closeRightPanel } = useRightPanel();

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
    handleDiscardUnsavedChanges,
    hasUnsavedChanges,
    isTaskEditing,
    setDraftCommentContent,
    setDraftDescription,
    setDraftTitle,
    title,
    editingCommentId,
  } = useTaskListTaskDetailPanel({ currentUserName, initialMode, task });

  useUnsavedChangesToastGuard({
    hasUnsavedChanges,
    onDiscardChanges: handleDiscardUnsavedChanges,
  });

  const handleRegisterTask = () => {
    const patch = commitTaskEdit();
    onApplyPatch(task.id, patch);
    closeRightPanel();
  };

  const handleComplete = () => {
    onCompleteTask(task.id);
    closeRightPanel();
  };

  const handleDeleteFromPanel = () => {
    onRequestDeleteTask(task);
    closeRightPanel();
  };

  return (
    <div className="relative flex h-full flex-col">
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

      <div className="absolute inset-x-0 bottom-20 px-6 md:px-8">
        <TaskListTaskDetailPanelFooterActions
          isTaskEditing={isTaskEditing}
          onCancelTaskEdit={handleCancelTaskEdit}
          onComplete={handleComplete}
          onRegisterTask={handleRegisterTask}
        />
      </div>
    </div>
  );
}
