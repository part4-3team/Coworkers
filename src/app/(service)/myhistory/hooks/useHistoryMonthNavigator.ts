import { useMemo, useState } from 'react';

import type {
  MyHistoryDraftDateRange,
  UseHistoryMonthNavigatorParams,
} from '@/app/(service)/myhistory/types';
import {
  getMonthEndDate,
  getMonthStartDate,
  normalizeHistoryDateRange,
} from '@/app/(service)/myhistory/utils/formatHistoryDate';
import type { DatePickerRangeValue } from '@/components/common/form/types';

export default function useHistoryMonthNavigator({
  closeCalendar,
  isCalendarOpen,
  onApplyRange,
  onMoveMonth,
  selectedRange,
  toggleCalendar,
}: UseHistoryMonthNavigatorParams) {
  const [draftRange, setDraftRange] = useState<MyHistoryDraftDateRange>({
    endDate: selectedRange.endDate,
    startDate: selectedRange.startDate,
  });

  const rangeMonthLimit = useMemo(() => {
    if (!draftRange.startDate || draftRange.endDate) return {};

    return {
      maxDate: getMonthEndDate(draftRange.startDate),
      minDate: getMonthStartDate(draftRange.startDate),
    };
  }, [draftRange.endDate, draftRange.startDate]);

  const handleRangeChange = (nextRange: DatePickerRangeValue) => {
    const [nextStartDate, nextEndDate] = nextRange;

    if (!nextStartDate) {
      setDraftRange({ endDate: null, startDate: null });
      return;
    }

    if (!nextEndDate) {
      setDraftRange({
        endDate: null,
        startDate: nextStartDate,
      });
      return;
    }

    const normalizedRange = normalizeHistoryDateRange(
      nextStartDate,
      nextEndDate,
    );

    setDraftRange(normalizedRange);
    onApplyRange(normalizedRange);
    closeCalendar();
  };

  const handleMoveMonth = (monthOffset: number) => {
    closeCalendar();
    onMoveMonth(monthOffset);
  };

  const handleToggleCalendar = () => {
    if (!isCalendarOpen) {
      setDraftRange({
        endDate: selectedRange.endDate,
        startDate: selectedRange.startDate,
      });
    }

    toggleCalendar();
  };

  return {
    draftRange,
    handleMoveMonth,
    handleRangeChange,
    handleToggleCalendar,
    rangeMonthLimit,
  } as const;
}
