'use client';

import { useState } from 'react';

import {
  MY_HISTORY_DETAIL_ASSIGNEE,
  MY_HISTORY_DETAIL_COMMENTS,
  MY_HISTORY_DETAIL_DESCRIPTION,
  MY_HISTORY_DETAIL_STARTED_AT,
} from '@/app/(service)/myhistory/constants';
import type { UseHistoryTaskCardParams } from '@/app/(service)/myhistory/types';
import TaskDetailPanelContent from '@/components/common/rightPanel/components/TaskDetailPanelContent';
import { useToast } from '@/components/common/toast';
import useRightPanel from '@/components/layout/hooks/useRightPanel';

export default function useHistoryTaskCard({ task }: UseHistoryTaskCardParams) {
  const { openRightPanel } = useRightPanel();
  const { showToast } = useToast();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleEdit = () => {
    openRightPanel({
      content: (
        <TaskDetailPanelContent
          key={task.id}
          assigneeName={MY_HISTORY_DETAIL_ASSIGNEE}
          comments={MY_HISTORY_DETAIL_COMMENTS}
          description={MY_HISTORY_DETAIL_DESCRIPTION}
          frequency={task.frequency}
          startedAt={MY_HISTORY_DETAIL_STARTED_AT}
          title={task.title}
        />
      ),
    });
  };

  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleConfirmDelete = () => {
    setIsDeleteModalOpen(false);
    showToast('삭제 되었습니다.', 'error');
  };

  return {
    handleCloseDeleteModal,
    handleConfirmDelete,
    handleEdit,
    handleOpenDeleteModal,
    isDeleteModalOpen,
  } as const;
}
