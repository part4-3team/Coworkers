'use client';

import { useState } from 'react';

import { MY_HISTORY_SECTIONS } from '@/app/(service)/myhistory/constants';
import {
  getDatedHistorySections,
  hasHistoryTasks,
} from '@/app/(service)/myhistory/utils/getHistorySections';

export default function useHistoryBoard(activeFilterId: string | null) {
  const [selectedDate, setSelectedDate] = useState(() => new Date());

  return {
    datedHistorySections: getDatedHistorySections(
      MY_HISTORY_SECTIONS,
      selectedDate,
    ),
    hasTasks: hasHistoryTasks(activeFilterId, MY_HISTORY_SECTIONS),
    selectedDate,
    setSelectedDate,
  } as const;
}
