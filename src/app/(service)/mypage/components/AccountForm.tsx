'use client';

import { useState } from 'react';

import PasswordModal from '@/app/(service)/mypage/components/PasswordModal';
import { useAccountForm } from '@/app/(service)/mypage/hook/useAccountForm';
import { AccountFormProps } from '@/app/(service)/mypage/types';
import AddUserImg from '@/components/common/adduserimg/AddUserImg';
import { Input } from '@/components/common/form';

export default function AccountForm({
  isDirty,
  onDirtyChange,
}: AccountFormProps) {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const initialName = '송현';

  const { name, errors, register, handleSubmit, handleNameChange, onSubmit } =
    useAccountForm({
      initialName,
      isDirty,
      onDirtyChange,
    });

  return (
    <>
      <form
        id="accountForm"
        onSubmit={handleSubmit(onSubmit)}
        className="flex gap-6 flex-col"
      >
        <AddUserImg />

        <div className="flex flex-col gap-3">
          <label htmlFor="userName">이름</label>

          <Input
            id="userName"
            value={name}
            {...register('name')}
            onChange={handleNameChange}
          />

          {errors.name && <p>{errors.name.message}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="userEmail">이메일</label>
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
            id="userPassword"
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
