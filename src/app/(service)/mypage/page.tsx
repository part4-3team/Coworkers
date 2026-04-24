/**
 * 계정 설정 페이지를 구성하는 파일입니다.
 */
'use client';
import { useState } from 'react';

import Image from 'next/image';

import { icLogout } from '@/assets/index';
import { PrimaryButton } from '@/components/common/button';

import AccountForm from './components/AccountForm';
import WithdrawModal from './components/WithdrawModal';

export default function MyPage() {
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);

  return (
    <div className="flex gap-4 flex-wrap px-4 py-20 md:px-16 md:py-18 xl:w-full xl:py-30 xl:max-w-7xl xl:px-20">
      <div className="bg-background-inverse px-5.5 pt-12 pb-16 rounded-[20px] flex flex-col gap-8 w-full xl:max-w-235">
        <h2 className="text-text-primary text-[20px] font-bold">계정 설정</h2>
        <AccountForm />
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

          <div className="flex justify-center items-center pt-10 w-70 m-auto">
            <PrimaryButton>저장하기</PrimaryButton>
          </div>
          {/* 소셜 회원 확인 후 노출 될 문구 */}
          <div className="flex justify-center items-center px-6 pt-10">
            <p className="text-brand-primary text-[15px] font-medium">
              소셜 로그인 회원입니다.
            </p>
          </div>
          {isWithdrawModalOpen && (
            <WithdrawModal onClose={() => setIsWithdrawModalOpen(false)} />
          )}
        </div>
      </div>
    </div>
  );
}
