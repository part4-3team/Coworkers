'use client';

import { useMemo, useState } from 'react';

import { MY_HISTORY_SECTIONS } from '@/app/(service)/myhistory/constants';
import type { MyHistoryResolvedDateRange } from '@/app/(service)/myhistory/types';
import {
  addMonths,
  createHistoryMonthRange,
  formatHistoryRangeTitle,
} from '@/app/(service)/myhistory/utils/formatHistoryDate';
import {
  getHistorySectionsInRange,
  hasHistoryTasks,
} from '@/app/(service)/myhistory/utils/getHistorySections';

export default function useHistoryBoard(activeFilterId: string | null) {
  const [selectedRange, setSelectedRange] = useState(() =>
    createHistoryMonthRange(new Date()),
  );

  const datedHistorySections = useMemo(() => {
    return getHistorySectionsInRange(MY_HISTORY_SECTIONS, selectedRange);
  }, [selectedRange]);

  const handleApplyRange = ({
    endDate,
    startDate,
  }: MyHistoryResolvedDateRange) => {
    setSelectedRange({
      endDate,
      mode: 'range',
      startDate,
    });
  };

  const handleMoveMonth = (monthOffset: number) => {
    setSelectedRange((prevRange) =>
      createHistoryMonthRange(addMonths(prevRange.startDate, monthOffset)),
    );
  };

  return {
    datedHistorySections,
    handleApplyRange,
    handleMoveMonth,
    hasTasks: hasHistoryTasks(activeFilterId, datedHistorySections),
    selectedRange,
    title: formatHistoryRangeTitle(selectedRange),
  } as const;
}
