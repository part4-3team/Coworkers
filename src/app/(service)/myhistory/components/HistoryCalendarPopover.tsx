import type { RefObject } from 'react';

import { DatePicker } from '@/components/common/form';

type HistoryCalendarPopoverProps = {
  calendarRef: RefObject<HTMLDivElement | null>;
  onSelectDate: (date: Date | null) => void;
  selectedDate: Date;
};

export default function HistoryCalendarPopover({
  calendarRef,
  onSelectDate,
  selectedDate,
}: HistoryCalendarPopoverProps) {
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
