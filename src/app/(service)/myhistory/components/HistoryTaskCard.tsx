/**
 * 완료된 히스토리 할 일 카드 한 개를 렌더링하는 컴포넌트입니다.
 */

'use client';

import Image from 'next/image';

import useHistoryTaskCard from '@/app/(service)/myhistory/hooks/useHistoryTaskCard';
import type { MyHistoryTask } from '@/app/(service)/myhistory/types';
import {
  icCalendarSmall,
  icComment,
  icMoreVerticalSmall,
  icRepeatSmall,
} from '@/assets';
import { ListDropdown } from '@/components/common/dropdown';
import { TaskDeleteConfirmModal } from '@/components/common/modal';
import TodoCheckUncheck from '@/components/common/todo/TodoCheckUncheck';

type HistoryTaskCardProps = {
  task: MyHistoryTask;
};

export default function HistoryTaskCard({ task }: HistoryTaskCardProps) {
  const {
    handleCloseDeleteModal,
    handleConfirmDelete,
    handleEdit,
    handleOpenDeleteModal,
    isDeleteModalOpen,
  } = useHistoryTaskCard({ task });

  return (
    <article className="relative flex items-center rounded-lg bg-background-secondary px-3.5 py-3">
      <div className="min-w-0 flex-1">
        <div className="flex min-w-0 items-center gap-2">
          <TodoCheckUncheck label={task.title} checked />
          <span className="flex shrink-0 items-center gap-1 text-sm font-medium text-text-default md:text-base">
            <Image
              src={icComment}
              alt=""
              width={22}
              height={22}
              className="size-5.5"
            />
            {task.commentCount}
          </span>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-normal text-text-default md:mt-2.5 md:text-base 2xl:mt-2">
          <span className="flex items-center gap-2">
            <Image src={icCalendarSmall} alt="" width={16} height={16} />
            {task.dueDate}
          </span>
          <span aria-hidden="true">|</span>
          <span className="flex items-center gap-2">
            <Image src={icRepeatSmall} alt="" width={22} height={22} />
            {task.frequency}
          </span>
        </div>
      </div>

      <ListDropdown
        className="ml-3 shrink-0"
        items={[
          { label: '수정하기', onClick: handleEdit },
          { label: '삭제하기', onClick: handleOpenDeleteModal },
        ]}
        menuClassName="mt-1 w-30 overflow-hidden rounded-lg border border-background-tertiary py-0 md:w-30"
        trigger={
          <>
            <span className="sr-only">{`${task.title} 더보기`}</span>
            <span
              className="flex size-8 items-center justify-center rounded-lg"
              aria-hidden="true"
            >
              <Image src={icMoreVerticalSmall} alt="" width={22} height={22} />
            </span>
          </>
        }
      />

      {isDeleteModalOpen && (
        <TaskDeleteConfirmModal
          onClose={handleCloseDeleteModal}
          onConfirm={handleConfirmDelete}
        />
      )}
    </article>
  );
}
