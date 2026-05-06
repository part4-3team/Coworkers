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
  onResetRange,
  selectedRange,
  toggleCalendar,
}: UseHistoryMonthNavigatorParams) {
  const [draftRange, setDraftRange] = useState<MyHistoryDraftDateRange>({
    endDate: selectedRange.endDate,
    startDate: selectedRange.startDate,
  });
  const isSelectingEndDate = Boolean(
    draftRange.startDate && !draftRange.endDate,
  );

  const rangeMonthLimit = useMemo(() => {
    if (!draftRange.startDate || !isSelectingEndDate) return {};

    return {
      maxDate: getMonthEndDate(draftRange.startDate),
      minDate: getMonthStartDate(draftRange.startDate),
    };
  }, [draftRange.startDate, isSelectingEndDate]);

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
      if (selectedRange.mode === 'range') {
        setDraftRange({
          endDate: null,
          startDate: null,
        });
        onResetRange();
        toggleCalendar();
        return;
      }

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
