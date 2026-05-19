'use client';

/**
 * 팀 참여하기 페이지를 구성하는 파일입니다.
 */

import { useJoinTeamForm } from '@/app/(service)/jointeam/hooks/useJoinTeamForm';
import { PrimaryButton } from '@/components/common/button';
import { Input } from '@/components/common/form';
import { cn } from '@/utils/cn';

export default function JoinTeamPage() {
  const { errorMessage, isDisabled, isPending, teamLinkField, handleSubmit } =
    useJoinTeamForm();

  return (
    <div className="flex h-full items-center justify-center px-4 py-24 md:px-14">
      <div className="w-full max-w-xl rounded-[20px] bg-background-primary px-6 py-11 md:p-11">
        <h2 className="mb-8 text-xl font-bold text-text-primary">
          팀 참여하기
        </h2>

        <h2 className="sr-only">팀 링크 입력</h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="mb-10 flex flex-col gap-3">
            <label
              htmlFor="teamLink"
              className="text-base font-medium text-text-primary"
            >
              팀 링크
            </label>

            <Input
              id="teamLink"
              placeholder="팀 링크를 입력해주세요."
              aria-invalid={Boolean(errorMessage)}
              className={cn(
                errorMessage &&
                  'border-status-danger focus:border-status-danger',
              )}
              {...teamLinkField}
            />

            {errorMessage && (
              <p className="mt-2 text-sm font-medium text-status-danger">
                {errorMessage}
              </p>
            )}
          </div>

          <PrimaryButton
            type="submit"
            disabled={isDisabled}
            className="mb-5 max-w-none"
          >
            {isPending ? '참여 중...' : '참여하기'}
          </PrimaryButton>
        </form>

        <p className="text-center text-sm font-normal text-text-default">
          공유받은 팀 링크를 입력해 참여할 수 있어요.
        </p>
      </div>
    </div>
  );
}
