/**
 * 플로팅 버튼으로 열리는 할 일 만들기 모달입니다.
 * 공용 ModalFrame은 수정하지 않고 ModalPortal + 로컬 패널만 사용합니다.
 */

'use client';

import TaskListCreateTaskModalDateTimeSection from '@/app/(service)/[teamid]/tasklist/components/TaskListCreateTaskModalDateTimeSection';
import TaskListCreateTaskModalFrame from '@/app/(service)/[teamid]/tasklist/components/TaskListCreateTaskModalFrame';
import TaskListCreateTaskModalIntro from '@/app/(service)/[teamid]/tasklist/components/TaskListCreateTaskModalIntro';
import TaskListCreateTaskModalRepeatSection from '@/app/(service)/[teamid]/tasklist/components/TaskListCreateTaskModalRepeatSection';
import { MODAL_HEADING_TYPO } from '@/app/(service)/[teamid]/tasklist/createTaskModalConstants';
import {
  clampMonthDay,
  useTaskListCreateTaskForm,
} from '@/app/(service)/[teamid]/tasklist/hooks/useTaskListCreateTaskForm';
import type { TaskListCreateTaskModalProps } from '@/app/(service)/[teamid]/tasklist/types';
import ContentTextarea from '@/components/common/form/components/ContentTextarea';
import TitleInput from '@/components/common/form/components/TitleInput';
import { cn } from '@/utils/cn';

export default function TaskListCreateTaskModal({
  onClose,
  onSubmit,
}: TaskListCreateTaskModalProps) {
  const {
    calendarButtonRef,
    calendarRef,
    formId,
    handleDateChange,
    handleOpenDateCalendar,
    handleOpenTime,
    isCalendarOpen,
    isTimePopoverOpen,
    memo,
    monthDay,
    repeat,
    selected,
    setMemo,
    setMonthDay,
    setRepeat,
    setStartTime,
    setTitle,
    startTime,
    timePopoverContainerRef,
    title,
    toggleWeekDay,
    weekDays,
  } = useTaskListCreateTaskForm();

  const handleCreate = () => {
    onSubmit?.();
    onClose();
  };

  return (
    <TaskListCreateTaskModalFrame
      intro={<TaskListCreateTaskModalIntro />}
      isCalendarOpen={isCalendarOpen}
      onClose={onClose}
      footer={
        <div className="mx-auto mt-5 w-full max-w-90 pt-2 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:mt-6 md:pb-0 md:pt-0">
          <button
            type="button"
            className="bg-brand-primary rounded-xl px-4 py-2.75 w-full font-medium text-white hover:enabled:bg-interaction-hover disabled:bg-interaction-inactive"
            onClick={handleCreate}
          >
            만들기
          </button>
        </div>
      }
    >
      <div className="mt-4 flex w-full flex-col gap-5 text-left md:gap-6">
        <div className="flex flex-col gap-2">
          <label
            htmlFor={`${formId}-title`}
            className={cn(MODAL_HEADING_TYPO, 'text-left')}
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

        <TaskListCreateTaskModalDateTimeSection
          calendarButtonRef={calendarButtonRef}
          calendarRef={calendarRef}
          formId={formId}
          isCalendarOpen={isCalendarOpen}
          isTimePopoverOpen={isTimePopoverOpen}
          onDateChange={handleDateChange}
          onOpenDateCalendar={handleOpenDateCalendar}
          onOpenTime={handleOpenTime}
          selectedDate={selected}
          startTime={startTime}
          timePopoverContainerRef={timePopoverContainerRef}
          onStartTimeChange={setStartTime}
        />

        <TaskListCreateTaskModalRepeatSection
          formId={formId}
          monthDay={monthDay}
          onMonthDayBlur={() => setMonthDay((d) => clampMonthDay(d))}
          onMonthDayChange={setMonthDay}
          onRepeatChange={setRepeat}
          onToggleWeekDay={toggleWeekDay}
          repeat={repeat}
          weekDays={weekDays}
        />

        <div className="flex flex-col gap-2">
          <label
            htmlFor={`${formId}-memo`}
            className={cn(MODAL_HEADING_TYPO, 'text-left')}
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
    </TaskListCreateTaskModalFrame>
  );
}
