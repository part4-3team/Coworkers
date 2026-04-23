import { EMPTY_HISTORY_FILTER_ID } from '@/app/(service)/myhistory/constants';
import type { MyHistoryDateSection } from '@/app/(service)/myhistory/types';
import {
  addDays,
  formatHistoryDate,
} from '@/app/(service)/myhistory/utils/formatHistoryDate';

export function hasHistoryTasks(
  activeFilterId: string | null,
  sections: readonly MyHistoryDateSection[],
) {
  if (activeFilterId === EMPTY_HISTORY_FILTER_ID) return false;

  return sections.some((section) =>
    section.groups.some((group) => group.tasks.length > 0),
  );
}

export function getDatedHistorySections(
  sections: readonly MyHistoryDateSection[],
  selectedDate: Date,
) {
  return sections.map((section, index) => ({
    ...section,
    date: formatHistoryDate(addDays(selectedDate, index)),
  }));
}
