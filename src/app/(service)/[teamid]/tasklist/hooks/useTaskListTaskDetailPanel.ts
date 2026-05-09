'use client';

import { useCallback, useEffect, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import {
  createTaskComment,
  deleteTaskComment,
  getTaskComments,
  updateTaskComment,
} from '@/api/commentApi';
import type {
  TaskListBoardTask,
  TaskListTaskComment,
  TaskListTaskDetailApplyPatch,
  TaskListTaskDetailOpenMode,
} from '@/app/(service)/[teamid]/tasklist/types';

type UseTaskListTaskDetailPanelParams = {
  currentUserName: string;
  initialMode: TaskListTaskDetailOpenMode;
  task: TaskListBoardTask;
  taskId: string;
  teamId: string;
};

type ApiComment = {
  id: number;
  content: string;
  createdAt: string;
  user: { nickname: string; image: string | null };
};

function toLocalComments(data: ApiComment[]): TaskListTaskComment[] {
  return data.map((c) => ({
    id: String(c.id),
    author: c.user.nickname,
    authorImage: c.user.image,
    content: c.content,
    meta: c.createdAt,
  }));
}

export default function useTaskListTaskDetailPanel({
  currentUserName,
  initialMode,
  task,
  taskId,
  teamId,
}: UseTaskListTaskDetailPanelParams) {
  const queryClient = useQueryClient();

  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [comments, setComments] = useState<TaskListTaskComment[]>(() =>
    task.comments.map((comment) => ({ ...comment })),
  );
  const [draftTitle, setDraftTitle] = useState(task.title);
  const [draftDescription, setDraftDescription] = useState(task.description);
  const [draftCommentContent, setDraftCommentContent] = useState('');
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [isTaskEditing, setIsTaskEditing] = useState(
    () => initialMode === 'edit',
  );

  // 패널 열릴 때 댓글 조회
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await getTaskComments(teamId, taskId);
        setComments(toLocalComments(data as ApiComment[]));
      } catch {
        // TODO: 에러 처리
      }
    };
    fetchComments();
  }, [teamId, taskId]);

  const handleStartTaskEdit = useCallback(() => {
    setDraftTitle(title);
    setDraftDescription(description);
    setEditingCommentId(null);
    setDraftCommentContent('');
    setIsTaskEditing(true);
  }, [description, title]);

  const handleCancelTaskEdit = useCallback(() => {
    setDraftTitle(title);
    setDraftDescription(description);
    setIsTaskEditing(false);
  }, [description, title]);

  const commitTaskEdit = useCallback((): TaskListTaskDetailApplyPatch => {
    const patch: TaskListTaskDetailApplyPatch = {
      title: draftTitle,
      description: draftDescription,
      comments: comments.map((comment) => ({ ...comment })),
    };
    setTitle(draftTitle);
    setDescription(draftDescription);
    setIsTaskEditing(false);
    return patch;
  }, [comments, draftDescription, draftTitle]);

  /** 댓글 작성 */
  const handleCreateComment = useCallback(
    async (content: string) => {
      try {
        await createTaskComment(teamId, taskId, { content });
        const updated = await getTaskComments(teamId, taskId);
        setComments(toLocalComments(updated as ApiComment[]));
        await queryClient.invalidateQueries({ queryKey: ['teams'] });
      } catch {
        // TODO: 에러 처리
      }
    },
    [teamId, taskId, queryClient],
  );

  const handleStartCommentEdit = useCallback(
    (comment: TaskListTaskComment) => {
      if (comment.author !== currentUserName) return;
      setIsTaskEditing(false);
      setEditingCommentId(comment.id);
      setDraftCommentContent(comment.content);
    },
    [currentUserName],
  );

  const handleCancelCommentEdit = useCallback(() => {
    setEditingCommentId(null);
    setDraftCommentContent('');
  }, []);

  /** 댓글 수정 */
  const handleSubmitCommentEdit = useCallback(async () => {
    if (!editingCommentId) return;
    const edited = comments.find((c) => c.id === editingCommentId);
    if (!edited || edited.author !== currentUserName) return;

    try {
      await updateTaskComment(teamId, taskId, editingCommentId, {
        content: draftCommentContent,
      });
      const updated = await getTaskComments(teamId, taskId);
      setComments(toLocalComments(updated as ApiComment[]));
      setEditingCommentId(null);
      setDraftCommentContent('');
      await queryClient.invalidateQueries({ queryKey: ['teams'] });
    } catch {
      // TODO: 에러 처리
    }
  }, [
    comments,
    currentUserName,
    draftCommentContent,
    editingCommentId,
    teamId,
    taskId,
    queryClient,
  ]);

  /** 댓글 삭제 */
  const handleDeleteComment = useCallback(
    async (commentId: string) => {
      const target = comments.find((c) => c.id === commentId);
      if (!target || target.author !== currentUserName) return;

      try {
        await deleteTaskComment(teamId, taskId, commentId);
        const updated = await getTaskComments(teamId, taskId);
        setComments(toLocalComments(updated as ApiComment[]));
        if (editingCommentId === commentId) {
          setEditingCommentId(null);
          setDraftCommentContent('');
        }
        await queryClient.invalidateQueries({ queryKey: ['teams'] });
      } catch {
        // TODO: 에러 처리
      }
    },
    [comments, currentUserName, editingCommentId, teamId, taskId, queryClient],
  );

  const editingComment = editingCommentId
    ? (comments.find((c) => c.id === editingCommentId) ?? null)
    : null;
  const hasUnsavedTaskChanges =
    isTaskEditing && (draftTitle !== title || draftDescription !== description);
  const hasUnsavedCommentChanges =
    editingComment !== null && draftCommentContent !== editingComment.content;
  const hasUnsavedChanges = hasUnsavedTaskChanges || hasUnsavedCommentChanges;

  const handleDiscardUnsavedChanges = useCallback(() => {
    if (isTaskEditing) {
      handleCancelTaskEdit();
      return;
    }
    if (!editingCommentId) return;
    handleCancelCommentEdit();
  }, [
    editingCommentId,
    handleCancelCommentEdit,
    handleCancelTaskEdit,
    isTaskEditing,
  ]);

  return {
    comments,
    commitTaskEdit,
    description,
    draftCommentContent,
    draftDescription,
    draftTitle,
    editingCommentId,
    handleCreateComment,
    handleDiscardUnsavedChanges,
    handleCancelCommentEdit,
    handleCancelTaskEdit,
    handleDeleteComment,
    handleStartCommentEdit,
    handleStartTaskEdit,
    handleSubmitCommentEdit,
    hasUnsavedChanges,
    isTaskEditing,
    setDraftCommentContent,
    setDraftDescription,
    setDraftTitle,
    title,
  };
}
