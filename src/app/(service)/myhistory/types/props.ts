import type { RefObject } from 'react';

import type {
  MyHistoryDateRange,
  MyHistoryResolvedDateRange,
} from '@/app/(service)/myhistory/types/date';
import type {
  MyHistoryDisplayDateSection,
  MyHistoryFilter,
  MyHistorySummaryItem,
  MyHistoryTask,
  MyHistoryTaskGroup,
} from '@/app/(service)/myhistory/types/history';
import type { DatePickerRangeValue } from '@/components/common/form/types';

export type HistoryMonthNavigatorProps = {
  onApplyRange: (range: MyHistoryResolvedDateRange) => void;
  onMoveMonth: (monthOffset: number) => void;
  onResetRange: () => void;
  selectedRange: MyHistoryDateRange;
  title: string;
};

export type UseHistoryMonthNavigatorParams = {
  closeCalendar: () => void;
  isCalendarOpen: boolean;
  onApplyRange: (range: MyHistoryResolvedDateRange) => void;
  onMoveMonth: (monthOffset: number) => void;
  onResetRange: () => void;
  selectedRange: MyHistoryDateRange;
  toggleCalendar: () => void;
};

export type HistoryBoardProps = {
  activeFilterId: string | null;
  datedHistorySections: readonly MyHistoryDisplayDateSection[];
  filters: readonly MyHistoryFilter[];
  hasTasks: boolean;
  isError: boolean;
  isLoading: boolean;
  onApplyRange: (range: MyHistoryResolvedDateRange) => void;
  onMoveMonth: (monthOffset: number) => void;
  onResetRange: () => void;
  onSelectFilter: (filterId: string) => void;
  selectedRange: MyHistoryDateRange;
  title: string;
};

export type HistoryCalendarPopoverProps = {
  calendarRef: RefObject<HTMLDivElement | null>;
  endDate: Date | null;
  maxDate?: Date;
  minDate?: Date;
  onSelectRange: (range: DatePickerRangeValue) => void;
  openToDate: Date;
  startDate: Date | null;
};

export type HistoryDateSectionProps = {
  section: MyHistoryDisplayDateSection;
};

export type HistoryFilterTabsProps = {
  activeFilterId: string | null;
  filters: readonly MyHistoryFilter[];
  onSelectFilter: (filterId: string) => void;
};

export type HistoryTaskCardProps = {
  task: MyHistoryTask;
};

export type HistoryTaskGroupProps = {
  group: MyHistoryTaskGroup;
};

export type MyHistorySummaryProps = {
  activeItemId: string | null;
  items: readonly MyHistorySummaryItem[];
  onSelectItem: (itemId: string) => void;
};

export type UseHistoryTaskCardParams = {
  task: MyHistoryTask;
};
