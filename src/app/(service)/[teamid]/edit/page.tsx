/**
 * 팀 수정하기 페이지를 구성하는 파일입니다.
 */
'use client';
import { useState } from 'react';

import { useRouter } from 'next/navigation';

import AddUserImg from '@/components/common/adduserimg/AddUserImg';
import { Input } from '@/components/common/form';
import { useToast } from '@/components/common/toast';
export default function EditTeamPage() {
  const { showToast } = useToast();
  const router = useRouter();

  const [teamName, setTeamName] = useState('기존 팀이름 가져오기'); // 기존 팀 이름으로 초기화

  const handleEditTeam = () => {
    if (!teamName.trim()) {
      showToast('팀 이름을 입력해주세요.', 'error');
      return;
    }

    // TODO: API 호출로 팀 이름 저장

    showToast('팀 이름이 수정 되었습니다.', 'success');
    router.push(`/${teamName}`); // 수정된 팀 이름으로 이동
  };
  return (
    <div className="px-4 py-25 md:px-14 md:flex md:justify-around md:items-center h-full">
      <div className="bg-background-primary px-6 pt-10 pb-15 rounded-[20px] w-full max-w-xl md:px-11">
        <h2 className="text-text-primary font-bold text-xl mb-8">
          팀 이름 변경하기
        </h2>
        <form className="flex flex-col gap-3">
          <AddUserImg />
          <div className="flex flex-col gap-2 mb-10">
            <label
              htmlFor="teamName"
              className="text-sm text-text-primary font-medium"
            >
              팀 이름
            </label>
            <Input
              id="teamName"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)} // 입력값 반영
            />
          </div>
        </form>
        <button
          className="text-base text-text-inverse bg-brand-primary w-full h-12 rounded-xl mb-5 hover:bg-interaction-hover"
          onClick={handleEditTeam}
        >
          수정하기
        </button>
        <p className="text-sm text-text-default font-normal text-center break-keep">
          팀 이름은 회사명이나 모임 이름 등으로 설정하면 좋아요.
        </p>
      </div>
    </div>
  );
}
