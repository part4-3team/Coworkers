'use client';

/**
 * 팀 생성하기 페이지를 구성하는 파일입니다.
 */

import { useCreateTeamForm } from '@/app/(service)/addteam/hooks/useCreateTeamForm';
import AddUserImg from '@/components/common/adduserimg/AddUserImg';
import { Input } from '@/components/common/form';

export default function CreateTeamPage() {
  const {
    teamName,
    errorMessage,
    isDisabled,
    handleChangeTeamName,
    handleChangeFile,
    handleSubmit,
  } = useCreateTeamForm();

  return (
    <div className="flex h-full items-center justify-center px-4 py-24 md:px-14">
      <div className="w-full max-w-xl rounded-[20px] bg-background-primary px-6 pb-15 pt-10">
        <h2 className="mb-8 text-xl font-bold text-text-primary">
          팀 생성하기
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <AddUserImg onChangeFile={handleChangeFile} />

          <div className="mb-10 flex flex-col gap-2">
            <label
              htmlFor="teamName"
              className="text-sm font-medium text-text-primary"
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
            className="mb-5 h-12 w-full rounded-xl bg-brand-primary text-base text-text-inverse hover:bg-interaction-hover disabled:cursor-not-allowed disabled:opacity-40"
          >
            생성하기
          </button>
        </form>

        <p className="text-center text-xs font-normal text-text-default">
          팀 이름은 회사명이나 모임 이름 등으로 설정하면 좋아요.
        </p>
      </div>
    </div>
  );
}
