'use client';

import Modal from '@/components/common/modal';

type TaskListColumnDeleteModalProps = {
  onClose: () => void;
  onConfirm: () => void;
};

export default function TaskListColumnDeleteModal({
  onClose,
  onConfirm,
}: TaskListColumnDeleteModalProps) {
  return (
    <Modal
      hasCloseButton={false}
      hasIcon
      title="할 일 목록을 삭제하시겠습니까?"
      description="할 일 목록 정보가 삭제됩니다."
      lineButtonText="닫기"
      onClose={onClose}
      onLineButtonClick={onClose}
      onSubButtonClick={onConfirm}
      subButtonText="삭제하기"
    />
  );
}
