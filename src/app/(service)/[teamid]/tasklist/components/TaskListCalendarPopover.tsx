/**
 * 할 일 보드에서 월 이동용 인라인 달력을 띄웁니다.
 */

import type { RefObject } from 'react';

import { DatePicker } from '@/components/common/form';

type TaskListCalendarPopoverProps = {
  calendarRef: RefObject<HTMLDivElement | null>;
  onSelectDate: (date: Date | null) => void;
  selectedDate: Date;
};

export default function TaskListCalendarPopover({
  calendarRef,
  onSelectDate,
  selectedDate,
}: TaskListCalendarPopoverProps) {
  return (
    <div
      ref={calendarRef}
      role="dialog"
      aria-label="날짜 선택 달력"
      className="absolute top-12 right-0 z-20"
    >
      <DatePicker isInline selected={selectedDate} onChange={onSelectDate} />
    </div>
  );
}
