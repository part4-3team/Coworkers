'use client';
import { useRef, useState } from 'react';

import PasswordModal from '@/app/(service)/mypage/components/PasswordModal';
import AddUserImg from '@/components/common/adduserimg/AddUserImg';
import { Input } from '@/components/common/form';
import { useToast } from '@/components/common/toast';

export default function AccountForm() {
  const [initialName] = useState('송현');
  // 이것도 데이터 불러오면서 수정할 예정입니다
  const [name, setName] = useState(initialName);
  const [isDirty, setIsDirty] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const { showToast, removeToast } = useToast();
  const toastIdRef = useRef<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setName(newValue);

    const changed = newValue !== initialName;

    if (changed && !isDirty) {
      toastIdRef.current = showToast(
        '저장하지 않은 변경사항이 있어요!',
        'error',
        {
          label: '변경사항 취소하기',
          textClassName: 'text-status-danger',
          onClick: () => {
            setName(initialName);
            setIsDirty(false);
          },
        },
      );
      setIsDirty(true);
    }
    if (!changed && isDirty) {
      if (toastIdRef.current) removeToast(toastIdRef.current);
      setIsDirty(false);
    }
  };

  return (
    <>
      <form id="accountForm" className="flex gap-6 flex-col">
        <AddUserImg />
        <div className="flex flex-col gap-3">
          <label
            htmlFor="userName"
            className="text-text-primary text-sm font-medium "
          >
            이름
          </label>
          <Input id="userName" value={name} onChange={handleChange} />
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="userEmail"
            className="text-text-primary text-sm font-medium "
          >
            이메일
          </label>
          <Input id="userEmail" value="ziy1027@naver.com" disabled />
        </div>
        <div className="flex flex-row gap-4 items-center">
          <label
            htmlFor="userPassword"
            className="text-text-primary text-sm font-medium w-fit"
          >
            비밀번호
          </label>
          <button
            type="button"
            onClick={() => setIsPasswordModalOpen(true)}
            className="bg-text-inverse text-brand-primary border border-brand-primary text-sm font-semibold rounded-lg h-8  w-fit px-2 hover:bg-brand-secondary"
          >
            비밀번호 변경하기
          </button>
        </div>
      </form>
      {isPasswordModalOpen && (
        <PasswordModal onClose={() => setIsPasswordModalOpen(false)} />
      )}
    </>
  );
}
