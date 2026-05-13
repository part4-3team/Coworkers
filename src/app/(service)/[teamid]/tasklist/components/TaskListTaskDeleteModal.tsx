/**
 * 할 일 삭제 확인 모달입니다.
 */

'use client';

import Modal from '@/components/common/modal';

type TaskListTaskDeleteModalProps = {
  onClose: () => void;
  onConfirm: () => void;
  taskTitle?: string;
};

export default function TaskListTaskDeleteModal({
  onClose,
  onConfirm,
  taskTitle,
}: TaskListTaskDeleteModalProps) {
  const modalTitle = taskTitle
    ? `'${taskTitle}'\n할 일을 정말 삭제하시겠어요?`
    : '할 일을 정말 삭제하시겠어요?';

  return (
    <Modal
      hasCloseButton={false}
      hasIcon
      title={modalTitle}
      description="삭제 후에는 되돌릴 수 없습니다."
      lineButtonText="취소"
      onClose={onClose}
      onLineButtonClick={onClose}
      onSubButtonClick={onConfirm}
      subButtonText="삭제하기"
    />
  );
}
