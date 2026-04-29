import { useState } from 'react';

import type { RightPanelComment } from '@/components/common/rightPanel/types';

type UseTaskDetailPanelParams = {
  initialComments: readonly RightPanelComment[];
  initialDescription: string;
  initialMode?: 'view' | 'edit';
  initialTitle: string;
};

export default function useTaskDetailPanel({
  initialComments,
  initialDescription,
  initialMode = 'view',
  initialTitle,
}: UseTaskDetailPanelParams) {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [comments, setComments] = useState<RightPanelComment[]>(() => [
    ...initialComments,
  ]);
  const [draftTitle, setDraftTitle] = useState(initialTitle);
  const [draftDescription, setDraftDescription] = useState(initialDescription);
  const [draftCommentContent, setDraftCommentContent] = useState('');
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [isTaskEditing, setIsTaskEditing] = useState(initialMode === 'edit');

  const handleStartTaskEdit = () => {
    setDraftTitle(title);
    setDraftDescription(description);
    setEditingCommentId(null);
    setDraftCommentContent('');
    setIsTaskEditing(true);
  };

  const handleCancelTaskEdit = () => {
    setDraftTitle(title);
    setDraftDescription(description);
    setIsTaskEditing(false);
  };

  const handleSubmitTaskEdit = () => {
    setTitle(draftTitle);
    setDescription(draftDescription);
    setIsTaskEditing(false);
  };

  const handleStartCommentEdit = (comment: RightPanelComment) => {
    setIsTaskEditing(false);
    setEditingCommentId(comment.id);
    setDraftCommentContent(comment.content);
  };

  const handleDeleteComment = (commentId: string) => {
    setComments((prev) => prev.filter((comment) => comment.id !== commentId));

    if (editingCommentId !== commentId) {
      return;
    }

    setEditingCommentId(null);
    setDraftCommentContent('');
  };

  const handleCancelCommentEdit = () => {
    setEditingCommentId(null);
    setDraftCommentContent('');
  };

  const handleSubmitCommentEdit = () => {
    if (!editingCommentId) {
      return;
    }

    setComments((prev) =>
      prev.map((comment) => {
        if (comment.id !== editingCommentId) {
          return comment;
        }

        return {
          ...comment,
          content: draftCommentContent,
        };
      }),
    );
    setEditingCommentId(null);
    setDraftCommentContent('');
  };

  const editingComment = editingCommentId
    ? (comments.find((comment) => comment.id === editingCommentId) ?? null)
    : null;
  const hasUnsavedTaskChanges =
    isTaskEditing && (draftTitle !== title || draftDescription !== description);
  const hasUnsavedCommentChanges =
    editingComment !== null && draftCommentContent !== editingComment.content;
  const hasUnsavedChanges = hasUnsavedTaskChanges || hasUnsavedCommentChanges;

  const handleDiscardUnsavedChanges = () => {
    if (isTaskEditing) {
      handleCancelTaskEdit();
      return;
    }

    if (!editingCommentId) {
      return;
    }

    handleCancelCommentEdit();
  };

  return {
    comments,
    description,
    draftCommentContent,
    draftDescription,
    draftTitle,
    handleDeleteComment,
    handleDiscardUnsavedChanges,
    editingCommentId,
    handleCancelCommentEdit,
    handleCancelTaskEdit,
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
  };
}
