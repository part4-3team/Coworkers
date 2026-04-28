/**
 * 플로팅 버튼으로 열리는 할 일 만들기 모달입니다.
 * 공용 ModalFrame은 수정하지 않고 ModalPortal + 로컬 패널만 사용합니다.
 */

'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';

import Image from 'next/image';

import TaskListCalendarPopover from '@/app/(service)/[teamid]/tasklist/components/TaskListCalendarPopover';
import TaskListRepeatWeekdayPicker from '@/app/(service)/[teamid]/tasklist/components/TaskListRepeatWeekdayPicker';
import TaskListSelectDropdown, {
  type TaskListSelectDropdownItem,
} from '@/app/(service)/[teamid]/tasklist/components/TaskListSelectDropdown';
import useTaskListCalendarPopover from '@/app/(service)/[teamid]/tasklist/hooks/useTaskListCalendarPopover';
import {
  formatFullKoreanDate,
  formatKoreanMeridiemTime,
} from '@/app/(service)/[teamid]/tasklist/utils/boardDate';
import { icCloseMedium } from '@/assets';
import ContentTextarea from '@/components/common/form/components/ContentTextarea';
import Input from '@/components/common/form/components/Input';
import TitleInput from '@/components/common/form/components/TitleInput';
import ModalPortal from '@/components/common/modal/components/ModalPortal';
import { cn } from '@/utils/cn';

/** ONCE | DAILY | MONTHLY | WEEKLY */
type RepeatValue = 'once' | 'daily' | 'monthly' | 'weekly';

const REPEAT_ITEMS: TaskListSelectDropdownItem<RepeatValue>[] = [
  { value: 'once', label: '반복 안함' },
  { value: 'daily', label: '매일' },
  { value: 'monthly', label: '매월' },
  { value: 'weekly', label: '주 반복' },
];

/** 메인 제목·폼 소제목 공통 (요소 종류와 관계없이 동일 렌더링) */
const modalHeadingTypo = cn(
  'm-0 block text-base font-medium leading-[19px] tracking-normal text-[#1E293B]',
);

const dateTimeTriggerClass = cn(
  'flex h-11 w-full min-w-0 items-center rounded-xl border border-background-tertiary bg-background-primary px-4 text-left text-sm font-medium text-text-primary',
  'md:h-12 md:text-base',
);

/** 모바일: 필드 전체 너비. md+: 피그마 고정 너비 */
const repeatTriggerLayoutClass = 'block w-full md:w-50 md:min-w-50';

type TaskListCreateTaskModalProps = {
  onClose: () => void;
  onSubmit?: () => void;
};

function clampMonthDay(n: number): number {
  if (Number.isNaN(n) || n < 1) return 1;
  if (n > 31) return 31;
  return Math.floor(n);
}

export default function TaskListCreateTaskModal({
  onClose,
  onSubmit,
}: TaskListCreateTaskModalProps) {
  const formId = useId();
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(() => new Date());
  const [startTime, setStartTime] = useState('15:30');
  const [repeat, setRepeat] = useState<RepeatValue>('once');
  const [weekDays, setWeekDays] = useState<number[]>([1, 2, 3, 4, 5]);
  const [monthDay, setMonthDay] = useState(() => new Date().getDate());
  const [memo, setMemo] = useState('');

  const {
    calendarButtonRef,
    calendarRef,
    closeCalendar,
    isCalendarOpen,
    toggleCalendar,
  } = useTaskListCalendarPopover();

  const timePopoverContainerRef = useRef<HTMLDivElement>(null);
  const [isTimePopoverOpen, setIsTimePopoverOpen] = useState(false);

  const toggleTimePopover = useCallback(() => {
    setIsTimePopoverOpen((prev) => !prev);
  }, []);

  const closeTimePopover = useCallback(() => {
    setIsTimePopoverOpen(false);
  }, []);

  useEffect(() => {
    if (!isTimePopoverOpen) return;

    const handleOutsideClick = (event: MouseEvent) => {
      if (
        timePopoverContainerRef.current &&
        !timePopoverContainerRef.current.contains(event.target as Node)
      ) {
        setIsTimePopoverOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isTimePopoverOpen]);

  const handleDateChange = (date: Date | null) => {
    if (!date) return;
    setStartDate(date);
    closeCalendar();
  };

  const handleCreate = () => {
    onSubmit?.();
    onClose();
  };

  const toggleWeekDay = (dayIndex: number) => {
    setWeekDays((prev) =>
      prev.includes(dayIndex)
        ? prev.filter((d) => d !== dayIndex)
        : [...prev, dayIndex].sort((a, b) => a - b),
    );
  };

  const handleOpenTime = () => {
    if (isCalendarOpen) closeCalendar();
    toggleTimePopover();
  };

  const handleOpenDateCalendar = () => {
    closeTimePopover();
    toggleCalendar();
  };

  const selected = startDate ?? new Date();

  return (
    <ModalPortal>
      <div
        className="fixed top-0 right-0 bottom-0 left-0 z-999 flex justify-center bg-black/60 items-end-safe pb-[env(safe-area-inset-bottom)] pt-[env(safe-area-inset-top)] md:items-center md:justify-center md:px-4 md:pb-0 md:pt-0"
        onClick={onClose}
      >
        <div
          className={cn(
            'relative flex max-h-[min(92dvh,calc(100dvh-env(safe-area-inset-top)-env(safe-area-inset-bottom)))] min-h-0 w-full flex-col overflow-x-hidden overflow-y-auto rounded-t-2xl bg-white p-5 text-center shadow-[0_-8px_30px_rgba(0,0,0,0.08)]',
            'md:max-h-none md:max-w-96 md:overflow-visible md:rounded-3xl md:p-6 md:shadow-none',
            isCalendarOpen ? 'md:min-h-[930px]' : 'md:min-h-166',
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            className="absolute top-4 right-[max(1rem,env(safe-area-inset-right))] z-10 md:right-4"
            onClick={onClose}
            aria-label="모달 닫기"
          >
            <Image src={icCloseMedium} alt="모달 닫기" width={24} height={24} />
          </button>

          <div className="mx-auto flex w-full max-w-70 flex-col items-center gap-3 px-1 md:max-w-none md:w-[227px] md:gap-4 md:px-0">
            <p className={cn(modalHeadingTypo, 'text-center')}>할 일 만들기</p>
            <p className="text-center text-sm font-medium leading-[17px] text-[#64748B]">
              할 일은 실제로 행동 가능한 작업 중심으로
              <br />
              작성해주시면 좋습니다.
            </p>
          </div>

          <div className="mt-4 flex w-full flex-col gap-5 text-left md:gap-6">
            <div className="flex flex-col gap-2">
              <label
                htmlFor={`${formId}-title`}
                className={cn(modalHeadingTypo, 'text-left')}
              >
                할 일 제목
              </label>
              <TitleInput
                id={`${formId}-title`}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="할 일 제목을 입력해주세요."
              />
            </div>

            <div className="flex flex-col gap-2">
              <p
                id={`${formId}-datetime-heading`}
                className={cn(modalHeadingTypo, 'text-left')}
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
                        dateTimeTriggerClass,
                        'h-11 w-full min-w-0 truncate px-3 md:h-12 md:w-[204px]',
                        isCalendarOpen &&
                          'border-brand-primary ring-1 ring-brand-primary/30',
                      )}
                      onClick={handleOpenDateCalendar}
                    >
                      {formatFullKoreanDate(selected)}
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
                        dateTimeTriggerClass,
                        'h-11 w-full min-w-0 cursor-pointer px-2 md:h-12 md:px-3',
                        isTimePopoverOpen &&
                          'border-brand-primary ring-1 ring-brand-primary/30',
                      )}
                      onClick={handleOpenTime}
                    >
                      {formatKoreanMeridiemTime(startTime)}
                    </button>
                    {isTimePopoverOpen ? (
                      <div
                        className="absolute top-full left-0 z-30 mt-1 w-[min(200px,calc(100vw-3rem))] rounded-xl border border-brand-primary bg-background-primary p-3 shadow-lg"
                        role="dialog"
                        aria-label="시간 선택"
                      >
                        <label
                          htmlFor={`${formId}-time-native`}
                          className="sr-only"
                        >
                          시간
                        </label>
                        <input
                          id={`${formId}-time-native`}
                          type="time"
                          step={300}
                          value={startTime}
                          onChange={(e) => setStartTime(e.target.value)}
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
                    selectedDate={selected}
                    onSelectDate={handleDateChange}
                  />
                ) : null}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <p
                id={`${formId}-repeat-heading`}
                className={cn(modalHeadingTypo, 'text-left')}
              >
                반복 설정
              </p>
              <div
                className="flex flex-col gap-3"
                role="group"
                aria-labelledby={`${formId}-repeat-heading`}
              >
                <TaskListSelectDropdown<RepeatValue>
                  items={REPEAT_ITEMS}
                  value={repeat}
                  onChange={setRepeat}
                  placeholder="선택"
                  className={repeatTriggerLayoutClass}
                />

                {repeat === 'weekly' ? (
                  <div className="flex flex-col gap-2">
                    <p
                      id={`${formId}-weekday-heading`}
                      className={cn(modalHeadingTypo, 'text-left')}
                    >
                      반복 요일
                    </p>
                    <div aria-labelledby={`${formId}-weekday-heading`}>
                      <TaskListRepeatWeekdayPicker
                        selectedDays={weekDays}
                        onToggleDay={toggleWeekDay}
                      />
                    </div>
                  </div>
                ) : null}

                {repeat === 'monthly' ? (
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor={`${formId}-monthday`}
                      className={cn(modalHeadingTypo, 'text-left')}
                    >
                      매월 반복 일
                    </label>
                    <Input
                      id={`${formId}-monthday`}
                      type="number"
                      inputMode="numeric"
                      min={1}
                      max={31}
                      value={monthDay}
                      onChange={(e) => {
                        const t = e.target.value;
                        if (t === '') return;
                        const v = Number(t);
                        if (Number.isNaN(v)) return;
                        setMonthDay(clampMonthDay(v));
                      }}
                      onBlur={() => setMonthDay((d) => clampMonthDay(d))}
                      className="max-w-30"
                      aria-label="매월 반복할 날짜 1~31"
                    />
                  </div>
                ) : null}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor={`${formId}-memo`}
                className={cn(modalHeadingTypo, 'text-left')}
              >
                할 일 메모
              </label>
              <ContentTextarea
                id={`${formId}-memo`}
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
                placeholder="메모를 입력해주세요."
                rows={4}
              />
            </div>
          </div>

          <div className="mx-auto mt-5 w-full max-w-90 pt-2 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:mt-6 md:pb-0 md:pt-0">
            <button
              type="button"
              className="bg-brand-primary rounded-xl px-4 py-2.75 w-full font-medium text-white hover:enabled:bg-interaction-hover disabled:bg-interaction-inactive"
              onClick={handleCreate}
            >
              만들기
            </button>
          </div>
        </div>
      </div>
    </ModalPortal>
  );
}
