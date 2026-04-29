/**
 * 할 일 목록 추가 시 목록 이름을 입력하는 모달입니다.
 * 공용 Modal(ModalPortal + ModalFrame)을 사용합니다.
 */

'use client';

import { useState } from 'react';

import TitleInput from '@/components/common/form/components/TitleInput';
import Modal from '@/components/common/modal';

type TaskListCreateColumnModalProps = {
  onClose: () => void;
  onSubmit: (name: string) => void;
};

export default function TaskListCreateColumnModal({
  onClose,
  onSubmit,
}: TaskListCreateColumnModalProps) {
  const [name, setName] = useState('');

  const handleCreate = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    onSubmit(trimmed);
    setName('');
  };

  return (
    <Modal
      hasCloseButton
      title="할 일 목록"
      onClose={onClose}
      primaryButtonText="만들기"
      onPrimaryButtonClick={handleCreate}
    >
      <div className="w-full text-left">
        <TitleInput
          id="tasklist-column-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="목록 명을 입력해주세요."
          aria-label="목록 이름"
          className="placeholder:text-interaction-inactive"
        />
      </div>
    </Modal>
  );
}
