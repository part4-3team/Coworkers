'use client';
import { useState } from 'react';

import AddUserImg from '@/components/common/adduserimg/AddUserImg';
import { Input } from '@/components/common/form';
import { useToast } from '@/components/common/toast';

import PasswordModal from './PasswordModal';

export default function AccountForm() {
  const [initialName] = useState('송현');
  const [name, setName] = useState(initialName);
  const [isDirty, setIsDirty] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const { showToast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setName(newValue);

    const changed = newValue !== initialName;
    if (changed && !isDirty) {
      showToast('저장하지 않은 변경사항이 있어요!', 'success', {
        label: '변경사항 취소하기',
        onClick: () => {},
      });
      setIsDirty(true);
    }
    if (!changed && isDirty) setIsDirty(false);
  };

  return (
    <>
      <form action="" className="flex gap-6 flex-col">
        <AddUserImg />
        <div className="flex flex-col gap-3">
          <label
            htmlFor="userName"
            className="text-text-primary text-sm font-medium "
          >
            이름
          </label>
          <Input name="userName" value={name} onChange={handleChange} />
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="userEmail"
            className="text-text-primary text-sm font-medium "
          >
            이메일
          </label>
          <Input name="userEmail" value="ziy1027@naver.com" disabled />
        </div>
        <div className="flex flex-col gap-2 relative">
          <label
            htmlFor="userName"
            className="text-text-primary text-sm font-medium "
          >
            비밀번호
          </label>
          <div className="relative">
            <Input name="password" type="password" value="password" disabled />
            <button
              type="button"
              onClick={() => setIsPasswordModalOpen(true)}
              className="bg-brand-primary text-text-inverse rounded-lg padding h-8 w-18.5 absolute right-2 top-[50%] -translate-y-1/2"
            >
              변경하기
            </button>
          </div>
        </div>
      </form>
      {isPasswordModalOpen && (
        <PasswordModal onClose={() => setIsPasswordModalOpen(false)} />
      )}
    </>
  );
}
