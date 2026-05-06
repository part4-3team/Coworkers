'use client';

import { useState } from 'react';

import type { UseHistoryTaskCardParams } from '@/app/(service)/myhistory/types';
import TaskDetailPanelContent from '@/components/common/rightPanel/components/TaskDetailPanelContent';
import { useToast } from '@/components/common/toast';
import useRightPanel from '@/components/layout/hooks/useRightPanel';
import { useMeQuery } from '@/hooks/useUser';

export default function useHistoryTaskCard({ task }: UseHistoryTaskCardParams) {
  const { openRightPanel } = useRightPanel();
  const { showToast } = useToast();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { data: meData } = useMeQuery();
  const assigneeName =
    typeof meData === 'object' &&
    meData !== null &&
    'nickname' in meData &&
    typeof meData.nickname === 'string'
      ? meData.nickname
      : '';

  const handleEdit = () => {
    openRightPanel({
      content: (
        <TaskDetailPanelContent
          key={task.id}
          assigneeName={assigneeName}
          comments={[]}
          description={task.description}
          frequency={task.frequency}
          initialMode="edit"
          startedAt={task.startedAt}
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
