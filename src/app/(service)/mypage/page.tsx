/**
 * 계정 설정 페이지를 구성하는 파일입니다.
 */
'use client';
import { useState } from 'react';

import Image from 'next/image';

import { icLogout } from '@/assets/index';
import AddUserImg from '@/components/common/adduserimg/AddUserImg';
import { Input } from '@/components/common/form';
import Modal from '@/components/common/modal';
import { useToast } from '@/components/common/toast';

import PasswordModal from './components/PasswordModal';
import WithdrawModal from './components/WithdrawModal';

export default function MyPage() {
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const { showToast } = useToast();

  const [initialName, setInitialName] = useState('송현');
  // Todo: 추후에 api 연결하고 값 가져올 예정
  const [name, setName] = useState(initialName);
  const [isDirty, setIsDirty] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setName(newValue);

    const changed = newValue !== initialName;

    if (changed && !isDirty) {
      showToast('저장하지 않은 변경사항이 있어요!', 'success', {
        label: '변경사항 저장하기',
        onClick: () => {},
      });
      setIsDirty(true);
    }

    if (!changed && isDirty) {
      setIsDirty(false);
    }
  };

  return (
    <div className="flex gap-4 flex-wrap px-4 py-20 md:px-16 md:py-18 xl:w-full xl:py-30 xl:max-w-7xl xl:px-20">
      <div className="bg-background-inverse px-5.5 pt-12 pb-16 rounded-[20px] flex flex-col gap-8 w-full xl:max-w-235">
        <h2 className="text-text-primary text-[20px] font-bold">계정 설정</h2>
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
              <Input
                name="password"
                type="password"
                value="password"
                disabled
              />
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
        <div className="mt-1">
          <button
            onClick={() => setIsWithdrawModalOpen(true)}
            className="flex gap-2 text-status-danger font-medium text-sm"
          >
            <Image
              src={icLogout}
              width={15.75}
              height={12}
              alt="회원 탈퇴 아이콘"
            />
            회원 탈퇴하기
          </button>
          {/* 소셜 회원 확인 후 노출 될 문구 */}
          <div className="flex justify-center items-center px-6 pt-10">
            <p className="text-brand-primary text-[15px] font-medium">
              소셜 로그인 회원입니다.
            </p>
          </div>

          {isWithdrawModalOpen && (
            <WithdrawModal onClose={() => setIsWithdrawModalOpen(false)} />
          )}
          {isPasswordModalOpen && (
            <PasswordModal onClose={() => setIsPasswordModalOpen(false)} />
          )}
        </div>
      </div>
    </div>
  );
}
