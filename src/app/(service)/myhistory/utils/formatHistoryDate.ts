import type {
  MyHistoryDateRange,
  MyHistoryResolvedDateRange,
} from '@/app/(service)/myhistory/types';

const WEEK_DAY_LABELS = ['일', '월', '화', '수', '목', '금', '토'] as const;
const MONTH_PAD_LENGTH = 2;
const DAY_PAD_LENGTH = 2;

function padMonth(month: number) {
  return String(month).padStart(MONTH_PAD_LENGTH, '0');
}

function padDay(day: number) {
  return String(day).padStart(DAY_PAD_LENGTH, '0');
}

export function parseHistoryDateKey(dateKey: string) {
  const [year, month, day] = dateKey.split('-').map(Number);

  return new Date(year, month - 1, day);
}

export function addDays(date: Date, dayCount: number) {
  const nextDate = new Date(date);
  nextDate.setDate(date.getDate() + dayCount);

  return nextDate;
}

export function addMonths(date: Date, monthCount: number) {
  const nextDate = new Date(date);
  nextDate.setMonth(date.getMonth() + monthCount);

  return nextDate;
}

export function getMonthStartDate(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function getMonthEndDate(date: Date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

export function createHistoryMonthRange(
  date: Date,
  mode: MyHistoryDateRange['mode'] = 'month',
): MyHistoryDateRange {
  return {
    endDate: getMonthEndDate(date),
    mode,
    startDate: getMonthStartDate(date),
  };
}

export function normalizeHistoryDateRange(
  startDate: Date,
  endDate: Date,
): MyHistoryResolvedDateRange {
  if (startDate.getTime() <= endDate.getTime()) {
    return { endDate, startDate };
  }

  return {
    endDate: startDate,
    startDate: endDate,
  };
}

export function formatHistoryMonth(date: Date) {
  return `${date.getFullYear()}.${padMonth(date.getMonth() + 1)}`;
}

export function formatHistoryShortDate(date: Date) {
  return `${date.getFullYear()}.${padMonth(date.getMonth() + 1)}.${padDay(date.getDate())}`;
}

function isFullHistoryMonthRange(range: MyHistoryDateRange) {
  return (
    isSameHistoryMonth(range.startDate, range.endDate) &&
    range.startDate.getDate() === 1 &&
    range.endDate.getTime() === getMonthEndDate(range.startDate).getTime()
  );
}

export function getHistoryRangeTitleParts(range: MyHistoryDateRange) {
  if (range.mode === 'month' || isFullHistoryMonthRange(range)) {
    return [formatHistoryMonth(range.startDate)] as const;
  }

  if (range.startDate.getTime() === range.endDate.getTime()) {
    return [formatHistoryShortDate(range.startDate)] as const;
  }

  return [
    formatHistoryShortDate(range.startDate),
    formatHistoryShortDate(range.endDate),
  ] as const;
}

export function formatHistoryRangeTitle(range: MyHistoryDateRange) {
  return getHistoryRangeTitleParts(range).join(' - ');
}

export function isSameHistoryMonth(firstDate: Date, secondDate: Date) {
  return (
    firstDate.getFullYear() === secondDate.getFullYear() &&
    firstDate.getMonth() === secondDate.getMonth()
  );
}

export function isDateWithinHistoryRange(
  date: Date,
  range: MyHistoryResolvedDateRange,
) {
  const time = date.getTime();

  return time >= range.startDate.getTime() && time <= range.endDate.getTime();
}

export function formatHistoryDate(date: Date) {
  const weekDay = WEEK_DAY_LABELS[date.getDay()];

  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 (${weekDay})`;
}
