'use client';

import { useState } from 'react';

import TitleInput from '@/components/common/form/components/TitleInput';
import Modal from '@/components/common/modal';

type TaskListRenameColumnModalProps = {
  initialName: string;
  onClose: () => void;
  onSubmit: (name: string) => void;
};

export default function TaskListRenameColumnModal({
  initialName,
  onClose,
  onSubmit,
}: TaskListRenameColumnModalProps) {
  const [name, setName] = useState(initialName);

  const handleRename = () => {
    const trimmed = name.trim();
    if (!trimmed) {
      return;
    }

    onSubmit(trimmed);
  };

  return (
    <Modal
      hasCloseButton
      title="할 일 목록"
      onClose={onClose}
      primaryButtonText="변경하기"
      onPrimaryButtonClick={handleRename}
    >
      <div className="w-full text-left">
        <TitleInput
          id="tasklist-column-rename"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="목록 명을 입력해주세요."
          aria-label="목록 이름 변경"
          className="placeholder:text-interaction-inactive"
        />
      </div>
    </Modal>
  );
}
