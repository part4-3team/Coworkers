/**
 * 완료된 히스토리 할 일 카드 한 개를 렌더링하는 컴포넌트입니다.
 */

'use client';

import Image from 'next/image';

import {
  MY_HISTORY_DETAIL_ASSIGNEE,
  MY_HISTORY_DETAIL_COMMENTS,
  MY_HISTORY_DETAIL_DESCRIPTION,
  MY_HISTORY_DETAIL_STARTED_AT,
} from '@/app/(service)/myhistory/constants';
import useTaskActionMenu from '@/app/(service)/myhistory/hooks/useTaskActionMenu';
import type { MyHistoryTask } from '@/app/(service)/myhistory/types';
import {
  icCalendarSmall,
  icCheckboxCheckedSmall,
  icCheckInverse,
  icComment,
  icMoreVerticalSmall,
  icRepeatSmall,
} from '@/assets';
import { EditDeleteModal } from '@/components/common/modal';
import TaskDetailPanelBody from '@/components/common/rightPanel/components/TaskDetailPanelBody';
import TaskDetailPanelMeta from '@/components/common/rightPanel/components/TaskDetailPanelMeta';
import useRightPanel from '@/components/layout/hooks/useRightPanel';

type HistoryTaskCardProps = {
  task: MyHistoryTask;
};

export default function HistoryTaskCard({ task }: HistoryTaskCardProps) {
  const { openRightPanel } = useRightPanel();
  const {
    actionMenuButtonRef,
    actionMenuRef,
    closeActionMenu,
    isActionMenuOpen,
    toggleActionMenu,
  } = useTaskActionMenu();

  const handleEdit = () => {
    closeActionMenu();

    openRightPanel({
      body: (
        <TaskDetailPanelBody
          commentCount={task.commentCount}
          comments={MY_HISTORY_DETAIL_COMMENTS}
          description={MY_HISTORY_DETAIL_DESCRIPTION}
        />
      ),
      footer: (
        <div className="flex justify-end">
          <button
            type="button"
            className="inline-flex h-11 items-center gap-1.5 rounded-full bg-brand-primary px-5 text-sm font-semibold text-text-inverse md:h-12 md:px-6 md:text-base"
          >
            <Image
              src={icCheckInverse}
              alt=""
              width={16}
              height={16}
              className="size-4"
            />
            완료하기
          </button>
        </div>
      ),
      headerAction: (
        <span
          className="flex size-6 items-center justify-center"
          aria-hidden="true"
        >
          <Image
            src={icMoreVerticalSmall}
            alt=""
            width={20}
            height={20}
            className="size-5"
          />
        </span>
      ),
      meta: (
        <TaskDetailPanelMeta
          assigneeName={MY_HISTORY_DETAIL_ASSIGNEE}
          frequency={task.frequency}
          startedAt={MY_HISTORY_DETAIL_STARTED_AT}
        />
      ),
      title: task.title,
    });
  };

  return (
    <article className="relative flex items-center rounded-lg bg-background-secondary px-3.5 py-3">
      <div className="min-w-0 flex-1">
        <div className="flex min-w-0 items-center gap-2">
          <Image
            src={icCheckboxCheckedSmall}
            alt=""
            width={22}
            height={22}
            className="size-5.5 shrink-0"
          />
          <span className="truncate text-sm font-medium text-interaction-inactive line-through md:text-base">
            {task.title}
          </span>
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

      <button
        ref={actionMenuButtonRef}
        type="button"
        aria-label={`${task.title} 더보기`}
        aria-haspopup="menu"
        aria-expanded={isActionMenuOpen}
        className="ml-3 flex size-8 shrink-0 items-center justify-center rounded-lg"
        onClick={toggleActionMenu}
      >
        <Image src={icMoreVerticalSmall} alt="" width={22} height={22} />
      </button>

      {isActionMenuOpen && (
        <div ref={actionMenuRef} className="absolute top-12 right-3.5 z-20">
          <EditDeleteModal onEdit={handleEdit} onDelete={closeActionMenu} />
        </div>
      )}
    </article>
  );
}
