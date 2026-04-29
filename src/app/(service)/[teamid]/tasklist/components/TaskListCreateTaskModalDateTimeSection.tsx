'use client';

import type { RefObject } from 'react';

import TaskListCalendarPopover from '@/app/(service)/[teamid]/tasklist/components/TaskListCalendarPopover';
import {
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
    <div className="flex flex-col gap-2">
      <p
        id={`${formId}-datetime-heading`}
        className={cn(MODAL_HEADING_TYPO, 'text-left')}
      >
        시작 날짜 및 시간
      </p>
      <div
        className="flex w-full min-w-0 flex-col gap-3 sm:gap-4"
        role="group"
        aria-labelledby={`${formId}-datetime-heading`}
      >
        <div className="flex w-full min-w-0 flex-row items-stretch gap-2 md:w-84 md:max-w-84">
          <div
            ref={calendarButtonRef}
            className="min-w-0 flex-1 md:w-51 md:min-w-51 md:flex-none md:shrink-0"
          >
            <button
              type="button"
              aria-label="날짜 선택"
              aria-haspopup="dialog"
              aria-expanded={isCalendarOpen}
              className={cn(
                DATE_TIME_TRIGGER_CLASS,
                'h-11 w-full min-w-0 truncate px-3 md:h-12 md:w-51',
                isCalendarOpen &&
                  'border-brand-primary ring-1 ring-brand-primary/30',
              )}
              onClick={onOpenDateCalendar}
            >
              {formatFullKoreanDate(selectedDate)}
            </button>
          </div>
          <div
            ref={timePopoverContainerRef}
            className="relative w-[32%] min-w-27 max-w-31 shrink-0 md:w-31 md:min-w-31 md:max-w-none md:shrink-0"
          >
            <button
              type="button"
              aria-label="시작 시간 선택"
              aria-expanded={isTimePopoverOpen}
              aria-haspopup="dialog"
              className={cn(
                DATE_TIME_TRIGGER_CLASS,
                'h-11 w-full min-w-0 cursor-pointer px-2 md:h-12 md:px-3',
                isTimePopoverOpen &&
                  'border-brand-primary ring-1 ring-brand-primary/30',
              )}
              onClick={onOpenTime}
            >
              {formatKoreanMeridiemTime(startTime)}
            </button>
            {isTimePopoverOpen ? (
              <div
                className="absolute top-full left-0 z-30 mt-1 w-[min(200px,calc(100vw-3rem))] rounded-xl border border-brand-primary bg-background-primary p-3 shadow-lg"
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
                  className="h-11 w-full rounded-lg border border-background-tertiary bg-background-primary px-3 text-sm font-medium text-text-primary outline-none focus:border-brand-primary md:h-12 md:text-base"
                />
              </div>
            ) : null}
          </div>
        </div>
        {isCalendarOpen ? (
          <TaskListCalendarPopover
            variant="inlineExpand"
            calendarRef={calendarRef}
            selectedDate={selectedDate}
            onSelectDate={onDateChange}
          />
        ) : null}
      </div>
    </div>
  );
}
