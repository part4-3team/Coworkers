import { EMPTY_HISTORY_FILTER_ID } from '@/app/(service)/myhistory/constants';
import type {
  MyHistoryDateRange,
  MyHistoryDateSection,
  MyHistoryDisplayDateSection,
} from '@/app/(service)/myhistory/types';
import {
  formatHistoryDate,
  isDateWithinHistoryRange,
  parseHistoryDateKey,
} from '@/app/(service)/myhistory/utils/formatHistoryDate';

export function hasHistoryTasks(
  activeFilterId: string | null,
  sections: readonly MyHistoryDisplayDateSection[],
) {
  if (activeFilterId === EMPTY_HISTORY_FILTER_ID) return false;

  return sections.some((section) =>
    section.groups.some((group) => group.tasks.length > 0),
  );
}

export function getHistorySectionsInRange(
  sections: readonly MyHistoryDateSection[],
  range: MyHistoryDateRange,
) {
  return sections
    .map((section) => {
      const parsedDate = parseHistoryDateKey(section.date);

      return {
        ...section,
        dateLabel: formatHistoryDate(parsedDate),
        parsedDate,
      };
    })
    .filter((section) => isDateWithinHistoryRange(section.parsedDate, range))
    .sort((firstSection, secondSection) => {
      return (
        firstSection.parsedDate.getTime() - secondSection.parsedDate.getTime()
      );
    })
    .map((section) => ({
      dateLabel: section.dateLabel,
      groups: section.groups,
      id: section.id,
    }));
}
