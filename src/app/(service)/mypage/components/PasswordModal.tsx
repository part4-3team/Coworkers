'use client';

import { Input } from '@/components/common/form';
import Modal from '@/components/common/modal';

type Props = {
  onClose: () => void;
};

export default function PasswordModal({ onClose }: Props) {
  return (
    <Modal
      title="비밀번호 변경하기"
      hasCloseButton={false}
      lineButtonText="닫기"
      onLineButtonClick={onClose}
      primaryButtonText="변경하기"
      onPrimaryButtonClick={() => {}}
    >
      <form className="text-left flex flex-col gap-6 min-w-70">
        <div className="flex flex-col gap-2 relative">
          <label
            htmlFor="currentPassword"
            className="text-text-primary text-sm font-medium"
          >
            새 비밀번호
          </label>
          <Input
            name="currentPassword"
            type="password"
            placeholder="새 비밀번호를 입력해주세요."
          />
        </div>
        <div className="flex flex-col gap-2 relative">
          <label
            htmlFor="newPassword"
            className="text-text-primary text-sm font-medium"
          >
            새 비밀번호 확인
          </label>
          <Input
            name="newPassword"
            type="password"
            placeholder="새 비밀번호를 다시 한번 입력해주세요."
          />
        </div>
      </form>
    </Modal>
  );
}
