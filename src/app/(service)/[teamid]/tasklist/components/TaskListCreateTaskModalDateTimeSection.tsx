'use client';

import type { RefObject } from 'react';

import TaskListCalendarPopover from '@/app/(service)/[teamid]/tasklist/components/TaskListCalendarPopover';
import {
  CREATE_TASK_MODAL_COLUMN_CLASS,
  DATE_TIME_TRIGGER_ACTIVE_CLASS,
  DATE_TIME_TRIGGER_CLASS,
  MODAL_HEADING_TYPO,
} from '@/app/(service)/[teamid]/tasklist/createTaskModalConstants';
import {
  formatFullKoreanDate,
  formatKoreanMeridiemTime,
} from '@/app/(service)/[teamid]/tasklist/utils/boardDate';
import { cn } from '@/utils/cn';

type TaskListCreateTaskModalDateTimeSectionProps = {
  calendarButtonRef: RefObject<HTMLDivElement | null>;
  calendarRef: RefObject<HTMLDivElement | null>;
  formId: string;
  isCalendarOpen: boolean;
  isTimePopoverOpen: boolean;
  onDateChange: (date: Date | null) => void;
  onOpenDateCalendar: () => void;
  onOpenTime: () => void;
  selectedDate: Date;
  startTime: string;
  timePopoverContainerRef: RefObject<HTMLDivElement | null>;
  onStartTimeChange: (value: string) => void;
};

export default function TaskListCreateTaskModalDateTimeSection({
  calendarButtonRef,
  calendarRef,
  formId,
  isCalendarOpen,
  isTimePopoverOpen,
  onDateChange,
  onOpenDateCalendar,
  onOpenTime,
  selectedDate,
  startTime,
  timePopoverContainerRef,
  onStartTimeChange,
}: TaskListCreateTaskModalDateTimeSectionProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4',
        CREATE_TASK_MODAL_COLUMN_CLASS,
        isCalendarOpen && 'relative z-50',
      )}
    >
      <p
        id={`${formId}-datetime-heading`}
        className={cn(MODAL_HEADING_TYPO, 'text-left')}
      >
        시작 날짜 및 시간
      </p>
      <div
        className="flex w-full min-w-0 flex-col gap-4"
        role="group"
        aria-labelledby={`${formId}-datetime-heading`}
      >
        <div className="relative z-30">
          <div className="flex w-full min-w-0 flex-row flex-nowrap items-stretch gap-2">
            <div ref={calendarButtonRef} className="min-w-0 flex-1 basis-0">
              <button
                type="button"
                aria-label="날짜 선택"
                aria-haspopup="dialog"
                aria-expanded={isCalendarOpen}
                className={cn(
                  DATE_TIME_TRIGGER_CLASS,
                  'w-full min-w-0 truncate',
                  isCalendarOpen && DATE_TIME_TRIGGER_ACTIVE_CLASS,
                )}
                onClick={onOpenDateCalendar}
              >
                {formatFullKoreanDate(selectedDate)}
              </button>
            </div>
            <div
              ref={timePopoverContainerRef}
              className="relative z-10 w-[124px] shrink-0"
            >
              <button
                type="button"
                aria-label="시작 시간 선택"
                aria-expanded={isTimePopoverOpen}
                aria-haspopup="dialog"
                className={cn(
                  DATE_TIME_TRIGGER_CLASS,
                  'w-full min-w-0 cursor-pointer',
                  isTimePopoverOpen && DATE_TIME_TRIGGER_ACTIVE_CLASS,
                )}
                onClick={onOpenTime}
              >
                {formatKoreanMeridiemTime(startTime)}
              </button>
              {isTimePopoverOpen ? (
                <div
                  className="absolute top-full right-0 z-30 mt-1 w-full min-w-[124px] max-w-[200px] rounded-xl border border-brand-primary bg-background-primary p-3 shadow-lg"
                  role="dialog"
                  aria-label="시간 선택"
                >
                  <label htmlFor={`${formId}-time-native`} className="sr-only">
                    시간
                  </label>
                  <input
                    id={`${formId}-time-native`}
                    type="time"
                    step={300}
                    value={startTime}
                    onChange={(e) => onStartTimeChange(e.target.value)}
                    className="h-11 w-full rounded-lg border border-background-tertiary bg-background-primary px-3 text-base font-medium text-text-primary outline-none focus:border-brand-primary md:h-12"
                  />
                </div>
              ) : null}
            </div>
          </div>
          {isCalendarOpen ? (
            <TaskListCalendarPopover
              variant="modalOverlay"
              calendarRef={calendarRef}
              selectedDate={selectedDate}
              onSelectDate={onDateChange}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
