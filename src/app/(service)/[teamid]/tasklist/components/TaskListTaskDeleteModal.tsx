'use client';

import Modal from '@/components/common/modal';

type TaskListTaskDeleteModalProps = {
  onClose: () => void;
  onConfirm: () => void;
};

export default function TaskListTaskDeleteModal({
  onClose,
  onConfirm,
}: TaskListTaskDeleteModalProps) {
  return (
    <Modal
      hasCloseButton={false}
      hasIcon
      title="할 일을 삭제하시겠습니까?"
      description="할 일 정보가 삭제됩니다."
      lineButtonText="닫기"
      onClose={onClose}
      onLineButtonClick={onClose}
      onSubButtonClick={onConfirm}
      subButtonText="삭제"
    />
  );
}
