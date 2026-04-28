import type { RefObject } from 'react';

import type { DatePickerRangeValue } from '@/components/common/form/types';

/**
 * 마이 히스토리 페이지에서 사용하는 타입을 정의하는 파일입니다.
 */

export type MyHistoryFilter = {
  count: number;
  id: string;
  label: string;
};

export type MyHistoryDateSelectionMode = 'month' | 'range';

export type MyHistoryResolvedDateRange = {
  endDate: Date;
  startDate: Date;
};

export type MyHistoryDateRange = MyHistoryResolvedDateRange & {
  mode: MyHistoryDateSelectionMode;
};

export type MyHistoryDraftDateRange = {
  endDate: Date | null;
  startDate: Date | null;
};

export type MyHistorySummaryDetail = {
  countText: string;
  id: string;
  title: string;
};

export type MyHistorySummaryItem = {
  countText: string;
  details: MyHistorySummaryDetail[];
  id: string;
  title: string;
};

export type MyHistoryTask = {
  commentCount: number;
  dueDate: string;
  frequency: string;
  id: string;
  title: string;
};

export type MyHistoryTaskGroup = {
  id: string;
  tasks: MyHistoryTask[];
  teamName: string;
  title: string;
};

export type MyHistoryDateSection = {
  date: string;
  groups: MyHistoryTaskGroup[];
  id: string;
};

export type MyHistoryDisplayDateSection = Omit<MyHistoryDateSection, 'date'> & {
  dateLabel: string;
};

export type HistoryMonthNavigatorProps = {
  onApplyRange: (range: MyHistoryResolvedDateRange) => void;
  onMoveMonth: (monthOffset: number) => void;
  selectedRange: MyHistoryDateRange;
  title: string;
};

export type UseHistoryMonthNavigatorParams = {
  closeCalendar: () => void;
  isCalendarOpen: boolean;
  onApplyRange: (range: MyHistoryResolvedDateRange) => void;
  onMoveMonth: (monthOffset: number) => void;
  selectedRange: MyHistoryDateRange;
  toggleCalendar: () => void;
};

export type HistoryBoardProps = {
  activeFilterId: string | null;
  onSelectFilter: (filterId: string) => void;
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
  onSelectItem: (itemId: string) => void;
};

export type UseHistoryTaskCardParams = {
  task: MyHistoryTask;
};
