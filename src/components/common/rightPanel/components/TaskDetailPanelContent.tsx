/**
 * 오른쪽 패널 상세 화면의 보기/수정 상태 전체를 관리하는 컴포넌트입니다.
 */

'use client';

import { useState } from 'react';

import { TaskDeleteConfirmModal } from '@/components/common/modal';
import TaskDetailPanelBody from '@/components/common/rightPanel/components/TaskDetailPanelBody';
import TaskDetailPanelFooter from '@/components/common/rightPanel/components/TaskDetailPanelFooter';
import TaskDetailPanelHeader from '@/components/common/rightPanel/components/TaskDetailPanelHeader';
import TaskDetailPanelMeta from '@/components/common/rightPanel/components/TaskDetailPanelMeta';
import useTaskDetailPanel from '@/components/common/rightPanel/hooks/useTaskDetailPanel';
import useUnsavedChangesToastGuard from '@/components/common/rightPanel/hooks/useUnsavedChangesToastGuard';
import type { RightPanelComment } from '@/components/common/rightPanel/types';
import { useToast } from '@/components/common/toast';

type TaskDetailPanelContentProps = {
  assigneeName: string;
  comments: readonly RightPanelComment[];
  description: string;
  frequency: string;
  startedAt: string;
  title: string;
};

export default function TaskDetailPanelContent({
  assigneeName,
  comments,
  description: initialDescription,
  frequency,
  startedAt,
  title: initialTitle,
}: TaskDetailPanelContentProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { showToast } = useToast();
  const {
    comments: editableComments,
    description,
    draftCommentContent,
    draftDescription,
    draftTitle,
    handleDeleteComment,
    handleDiscardUnsavedChanges,
    editingCommentId,
    handleCancelCommentEdit,
    handleStartCommentEdit,
    handleStartTaskEdit,
    handleSubmitCommentEdit,
    handleSubmitTaskEdit,
    hasUnsavedChanges,
    isTaskEditing,
    setDraftCommentContent,
    setDraftDescription,
    setDraftTitle,
    title,
  } = useTaskDetailPanel({
    initialComments: comments,
    initialDescription: initialDescription,
    initialTitle,
  });

  useUnsavedChangesToastGuard({
    hasUnsavedChanges,
    onDiscardChanges: handleDiscardUnsavedChanges,
  });

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    setIsDeleteModalOpen(false);
    showToast('삭제 되었습니다.', 'error');
  };

  return (
    <div className="relative flex h-full flex-col">
      <div className="min-h-0 flex-1 overflow-y-auto px-6 pb-36 pt-8 md:px-8 md:pb-40 md:pt-10">
        <TaskDetailPanelHeader
          draftTitle={draftTitle}
          isEditing={isTaskEditing}
          onChangeDraftTitle={setDraftTitle}
          onDelete={handleOpenDeleteModal}
          onStartEdit={handleStartTaskEdit}
          title={title}
        />

        <div className="mt-5 md:mt-6">
          <TaskDetailPanelMeta
            assigneeName={assigneeName}
            frequency={frequency}
            startedAt={startedAt}
          />
        </div>

        <TaskDetailPanelBody
          commentCount={editableComments.length}
          comments={editableComments}
          description={description}
          draftCommentContent={draftCommentContent}
          draftDescription={draftDescription}
          editingCommentId={editingCommentId}
          isTaskEditing={isTaskEditing}
          onCancelCommentEdit={handleCancelCommentEdit}
          onChangeDraftCommentContent={setDraftCommentContent}
          onChangeDraftDescription={setDraftDescription}
          onDeleteComment={handleDeleteComment}
          onStartCommentEdit={handleStartCommentEdit}
          onSubmitCommentEdit={handleSubmitCommentEdit}
        />
      </div>

      <div className="absolute inset-x-0 bottom-20 px-6 md:px-8">
        <TaskDetailPanelFooter
          isEditing={isTaskEditing}
          onSubmitEdit={handleSubmitTaskEdit}
        />
      </div>

      {isDeleteModalOpen && (
        <TaskDeleteConfirmModal
          onClose={handleCloseDeleteModal}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
}
