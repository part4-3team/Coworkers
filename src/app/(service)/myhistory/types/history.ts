export type MyHistoryFilter = {
  count: number;
  id: string;
  label: string;
};

export type MyHistoryFilterId = 'once' | 'recurring';

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
  description: string;
  doneAt: string;
  dueDate: string;
  frequency: string;
  id: string;
  startedAt: string;
  title: string;
};

export type MyHistoryCompletedTaskRecord = {
  date?: string;
  description?: string | null;
  displayIndex?: number;
  doneAt?: string;
  frequency?: string;
  id?: number | string;
  name?: string;
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
