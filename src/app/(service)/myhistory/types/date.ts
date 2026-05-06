export type MyHistoryDateSelectionMode = 'all' | 'month' | 'range';

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
