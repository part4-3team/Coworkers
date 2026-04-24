import { useState } from 'react';

import type { RightPanelComment } from '@/components/common/rightPanel/types';

type UseTaskDetailPanelParams = {
  initialComments: readonly RightPanelComment[];
  initialDescription: string;
  initialTitle: string;
};

export default function useTaskDetailPanel({
  initialComments,
  initialDescription,
  initialTitle,
}: UseTaskDetailPanelParams) {
  const [activeCommentActionId, setActiveCommentActionId] = useState<
    string | null
  >(null);
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [comments, setComments] = useState<RightPanelComment[]>(() => [
    ...initialComments,
  ]);
  const [draftTitle, setDraftTitle] = useState(initialTitle);
  const [draftDescription, setDraftDescription] = useState(initialDescription);
  const [draftCommentContent, setDraftCommentContent] = useState('');
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [isTaskEditing, setIsTaskEditing] = useState(false);

  const handleStartTaskEdit = () => {
    setDraftTitle(title);
    setDraftDescription(description);
    setActiveCommentActionId(null);
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
    setActiveCommentActionId(comment.id);
    setEditingCommentId(comment.id);
    setDraftCommentContent(comment.content);
  };

  const handleToggleCommentAction = (commentId: string) => {
    setIsTaskEditing(false);
    setEditingCommentId(null);
    setDraftCommentContent('');
    setActiveCommentActionId((prev) => (prev === commentId ? null : commentId));
  };

  const handleCloseCommentAction = () => {
    setActiveCommentActionId(null);
  };

  const handleCancelCommentEdit = () => {
    setActiveCommentActionId(null);
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
    setActiveCommentActionId(null);
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
    activeCommentActionId,
    comments,
    description,
    draftCommentContent,
    draftDescription,
    draftTitle,
    handleDiscardUnsavedChanges,
    handleCloseCommentAction,
    editingCommentId,
    handleCancelCommentEdit,
    handleCancelTaskEdit,
    handleStartCommentEdit,
    handleStartTaskEdit,
    handleSubmitCommentEdit,
    handleSubmitTaskEdit,
    handleToggleCommentAction,
    hasUnsavedChanges,
    isTaskEditing,
    setDraftCommentContent,
    setDraftDescription,
    setDraftTitle,
    title,
  };
}
