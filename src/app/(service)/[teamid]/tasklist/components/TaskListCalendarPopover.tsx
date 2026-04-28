/**
 * 할 일 보드에서 월 이동용 인라인 달력을 띄웁니다.
 */

import type { RefObject } from 'react';

import { DatePicker } from '@/components/common/form';
import { cn } from '@/utils/cn';

type TaskListCalendarPopoverProps = {
  calendarRef: RefObject<HTMLDivElement | null>;
  onSelectDate: (date: Date | null) => void;
  selectedDate: Date;
  /** 보드: 버튼 아래 떠 있는 팝오버. 모달: 레이아웃 아래로 펼쳐져 높이가 늘어남. */
  variant?: 'anchored' | 'inlineExpand';
};

export default function TaskListCalendarPopover({
  calendarRef,
  onSelectDate,
  selectedDate,
  variant = 'anchored',
}: TaskListCalendarPopoverProps) {
  return (
    <div
      ref={calendarRef}
      role="dialog"
      aria-label="날짜 선택 달력"
      className={cn(
        variant === 'inlineExpand'
          ? [
              'box-border h-[258px] w-84 max-w-full shrink-0 overflow-hidden rounded-xl border border-brand-primary bg-background-primary shadow-lg',
              '[&_.coworkers-date-picker]:!w-84 [&_.react-datepicker]:!m-0 [&_.react-datepicker]:!h-full [&_.react-datepicker]:!min-h-0 [&_.react-datepicker]:!w-84 [&_.react-datepicker]:!max-w-full [&_.react-datepicker]:!border-0 [&_.react-datepicker]:!rounded-none',
            ]
          : 'absolute top-12 right-0 z-20',
      )}
    >
      <DatePicker isInline selected={selectedDate} onChange={onSelectDate} />
    </div>
  );
}
