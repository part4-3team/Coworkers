// 할일 추가

import { ModalTaskProps } from '@/app/(service)/[teamid]/types';
import { Input } from '@/components/common/form';
import Modal from '@/components/common/modal';

export function ModalTaskAdd({
  onClose,
  onPrimaryButtonClick,
}: ModalTaskProps) {
  return (
    <Modal
      title="할 일 목록 추가"
      onClose={onClose}
      primaryButtonText="만들기"
      onPrimaryButtonClick={onPrimaryButtonClick}
    >
      <Input placeholder="할 일 목록 명을 입력해주세요." />
    </Modal>
  );
}

export function ModalTaskEdit({
  onClose,
  onPrimaryButtonClick,
}: ModalTaskProps) {
  return (
    <Modal
      title="할 일 목록 수정"
      onClose={onClose}
      primaryButtonText="수정하기"
      onPrimaryButtonClick={onPrimaryButtonClick}
    >
      <Input />
    </Modal>
  );
}
