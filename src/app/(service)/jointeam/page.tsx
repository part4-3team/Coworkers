'use client';

/**
 * 팀 참여하기 페이지를 구성하는 파일입니다.
 */

import { useJoinTeamForm } from '@/app/(service)/jointeam/hooks/useJoinTeamForm';
import { PrimaryButton } from '@/components/common/button';
import { Input } from '@/components/common/form';

export default function JoinTeamPage() {
  const { teamLink, isDisabled, handleChangeTeamLink, handleSubmit } =
    useJoinTeamForm();

  return (
    <div className="flex h-full items-center justify-center px-4 py-24 md:px-14">
      <div className="w-full max-w-xl rounded-[20px] bg-background-primary p-[44px]">
        <h2 className="mb-8 text-xl font-bold text-text-primary">
          팀 참여하기
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="mb-[40px] flex flex-col">
            <label
              htmlFor="teamLink"
              className="text-sm font-medium text-text-primary"
            >
              팀 링크
            </label>

            <Input
              id="teamLink"
              value={teamLink}
              onChange={handleChangeTeamLink}
              placeholder="팀 링크를 입력해주세요."
            />
          </div>

          <PrimaryButton
            type="submit"
            disabled={isDisabled}
            className="mb-5 max-w-none"
          >
            참여하기
          </PrimaryButton>
        </form>

        <p className="text-center text-xs font-normal text-text-default">
          공유받은 팀 링크를 입력해 참여할 수 있어요.
        </p>
      </div>
    </div>
  );
}
