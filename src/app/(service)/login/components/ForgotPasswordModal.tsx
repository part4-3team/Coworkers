'use client';

import { useState } from 'react';

import { AuthInput } from '@/components/common/form';
import Modal from '@/components/common/modal';

type ForgotPasswordModalProps = {
  onClose: () => void;
};

export default function ForgotPasswordModal({
  onClose,
}: ForgotPasswordModalProps) {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleChangeEmail = (value: string) => {
    setEmail(value);

    if (!value) {
      setEmailError('');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setEmailError('이메일 형식이 아닙니다');
    } else {
      setEmailError('');
    }
  };

  const handleBlurEmail = () => {
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('이메일 형식이 아닙니다');
    }
  };

  return (
    <Modal
      hasCloseButton
      title="비밀번호를 잊으셨나요?"
      description="가입한 이메일을 입력하시면 비밀번호 재설정 링크를 보내드립니다."
      lineButtonText="닫기"
      primaryButtonText="링크 보내기"
      onClose={onClose}
      onLineButtonClick={onClose}
      onPrimaryButtonClick={onClose}
    >
      <div className="mt-4 w-80">
        <AuthInput
          label="이메일"
          type="text"
          value={email}
          onChange={(e) => handleChangeEmail(e.target.value)}
          onBlur={handleBlurEmail}
          errorMessage={emailError}
          placeholder="이메일을 입력해주세요"
        />
      </div>
    </Modal>
  );
}
