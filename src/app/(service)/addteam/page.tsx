'use client';

/**
 * 팀 생성하기 페이지를 구성하는 파일입니다.
 */

import AddUserImg from '@/components/common/adduserimg/AddUserImg';
import { Input } from '@/components/common/form';

import { useCreateTeamForm } from './hooks/useCreateTeamForm';

export default function CreateTeamPage() {
  const {
    teamName,
    errorMessage,
    isDisabled,
    handleChangeTeamName,
    handleSubmit,
  } = useCreateTeamForm();

  return (
    <div className="px-4 py-25 md:px-14 md:flex md:justify-around md:items-center h-full">
      <div className="bg-background-primary px-6 pt-10 pb-15 rounded-[20px] w-full max-w-xl">
        <h2 className="text-text-primary font-bold text-xl mb-8">
          팀 생성하기
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
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
              onChange={handleChangeTeamName}
              placeholder="팀 이름을 입력해주세요."
            />

            {errorMessage && (
              <p className="text-xs text-status-danger">{errorMessage}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isDisabled}
            className="text-base text-text-inverse bg-brand-primary w-full h-12 rounded-xl mb-5 hover:bg-interaction-hover disabled:opacity-40"
          >
            생성하기
          </button>
        </form>

        <p className="text-xs text-text-default font-normal text-center">
          팀 이름은 회사명이나 모임 이름 등으로 설정하면 좋아요.
        </p>
      </div>
    </div>
  );
}
