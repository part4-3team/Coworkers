'use client';

/**
 * 팀 참여하기 페이지를 구성하는 파일입니다.
 */

import { useJoinTeamForm } from '@/app/(service)/jointeam/hooks/useJoinTeamForm';
import { Input } from '@/components/common/form';

export default function JoinTeamPage() {
  const { teamLink, isDisabled, handleChangeTeamLink, handleSubmit } =
    useJoinTeamForm();

  return (
    <div className="flex h-full items-center justify-center px-4 py-24 md:px-14">
      <div className="w-full max-w-xl rounded-[20px] bg-background-primary px-6 pb-15 pt-10">
        <h2 className="mb-8 text-xl font-bold text-text-primary">
          팀 참여하기
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="mb-10 flex flex-col gap-2">
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

          <button
            type="submit"
            disabled={isDisabled}
            className="mb-5 h-12 w-full rounded-xl bg-brand-primary text-base text-text-inverse hover:bg-interaction-hover disabled:cursor-not-allowed disabled:opacity-40"
          >
            참여하기
          </button>
        </form>

        <p className="text-center text-xs font-normal text-text-default">
          공유받은 팀 링크를 입력해 참여할 수 있어요.
        </p>
      </div>
    </div>
  );
}
