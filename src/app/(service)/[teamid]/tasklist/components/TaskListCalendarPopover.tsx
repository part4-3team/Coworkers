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
  /**
   * anchored: 월 네비 버튼 오른쪽 아래 고정.
   * inlineExpand: 플로우에 펼쳐 높이 증가(보드 등).
   * modalOverlay: 할 일 만들기 모달 전용 — 버튼 행 아래에 겹쳐 띄워 모달 높이를 늘리지 않음.
   */
  variant?: 'anchored' | 'inlineExpand' | 'modalOverlay';
};

const EXPAND_DATE_PICKER_CLASS = cn(
  '!m-0 flex shrink-0 justify-center',
  'w-full max-w-[300px] md:max-w-[336px]',
  '[&_.coworkers-date-picker]:!mx-auto [&_.coworkers-date-picker]:!flex [&_.coworkers-date-picker]:!w-full [&_.coworkers-date-picker]:!max-w-[300px] md:[&_.coworkers-date-picker]:!max-w-[336px]',
  '[&_.coworkers-date-picker]:!justify-center',
  '[&_.react-datepicker]:!mx-auto [&_.react-datepicker]:!border-0 [&_.react-datepicker]:!shadow-none',
  '[&_.react-datepicker]:!h-full [&_.react-datepicker]:!min-h-0 [&_.react-datepicker]:!w-[300px] md:[&_.react-datepicker]:!w-[336px]',
  '[&_.react-datepicker__month-container]:!mx-auto',
);

export default function TaskListCalendarPopover({
  calendarRef,
  onSelectDate,
  selectedDate,
  variant = 'anchored',
}: TaskListCalendarPopoverProps) {
  const isAnchored = variant === 'anchored';
  const isInlineExpand = variant === 'inlineExpand';
  const isModalOverlay = variant === 'modalOverlay';
  const useExpandPicker = isInlineExpand || isModalOverlay;

  return (
    <div
      ref={calendarRef}
      role="dialog"
      aria-label="날짜 선택 달력"
      className={cn(
        isAnchored && 'absolute top-12 right-0 z-20',
        isInlineExpand && [
          'flex h-[258px] w-full shrink-0 justify-center overflow-hidden rounded-xl border border-brand-primary bg-background-primary shadow-lg',
        ],
        isModalOverlay && [
          'absolute left-0 right-0 top-full z-40 mt-2 flex h-[258px] max-h-[258px] w-full justify-center overflow-hidden rounded-xl border border-brand-primary bg-background-primary shadow-lg',
        ],
      )}
    >
      <DatePicker
        isInline
        selected={selectedDate}
        onChange={onSelectDate}
        className={cn(useExpandPicker && EXPAND_DATE_PICKER_CLASS)}
      />
    </div>
  );
}
