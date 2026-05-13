/**
 * 팀 삭제 확인 모달입니다.
 */

'use client';

import Modal from '@/components/common/modal';

type TaskListTeamPageDeleteModalProps = {
  onClose: () => void;
  onConfirm: () => void;
  teamName?: string;
};

export default function TaskListTeamPageDeleteModal({
  onClose,
  onConfirm,
  teamName,
}: TaskListTeamPageDeleteModalProps) {
  const modalTitle = teamName
    ? `'${teamName}'\n팀을 정말 삭제하시겠어요?`
    : '팀을 정말 삭제하시겠어요?';

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
