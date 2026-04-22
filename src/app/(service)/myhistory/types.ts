/**
 * 마이 히스토리 페이지에서 사용하는 타입을 정의하는 파일입니다.
 */

export type MyHistoryFilter = {
  count: number;
  id: string;
  label: string;
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
