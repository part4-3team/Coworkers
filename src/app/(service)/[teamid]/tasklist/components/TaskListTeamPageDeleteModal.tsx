'use client';

import Modal from '@/components/common/modal';

type TaskListTeamPageDeleteModalProps = {
  onClose: () => void;
  onConfirm: () => void;
};

export default function TaskListTeamPageDeleteModal({
  onClose,
  onConfirm,
}: TaskListTeamPageDeleteModalProps) {
  return (
    <Modal
      hasCloseButton={false}
      hasIcon
      title="페이지를 삭제하시겠습니까?"
      description="페이지에 관련된 모든 정보가 삭제됩니다."
      lineButtonText="닫기"
      onClose={onClose}
      onLineButtonClick={onClose}
      onSubButtonClick={onConfirm}
      subButtonText="삭제"
    />
  );
}
