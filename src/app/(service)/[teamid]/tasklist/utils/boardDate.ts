/**
 * 할 일 보드(월·주 선택)용 날짜 유틸입니다.
 */

const WEEKDAY_LABELS = ['일', '월', '화', '수', '목', '금', '토'] as const;

export function addDays(date: Date, dayCount: number): Date {
  const next = new Date(date);
  next.setDate(date.getDate() + dayCount);
  return next;
}

export function addMonths(date: Date, monthCount: number): Date {
  const next = new Date(date);
  next.setMonth(date.getMonth() + monthCount);
  return next;
}

export function getMonthStart(date: Date, monthOffset = 0): Date {
  const base = addMonths(date, monthOffset);
  return new Date(base.getFullYear(), base.getMonth(), 1);
}

export function formatYearMonth(date: Date): string {
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월`;
}

/** 월요일 시작 주의 월요일 00:00 */
export function startOfWeekMonday(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  return d;
}

export function formatWeekdayLabel(date: Date): string {
  return WEEKDAY_LABELS[date.getDay()] ?? '';
}
