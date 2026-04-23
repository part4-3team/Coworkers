const WEEK_DAY_LABELS = ['일', '월', '화', '수', '목', '금', '토'] as const;

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

export function formatHistoryMonth(date: Date) {
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월`;
}

export function formatHistoryDate(date: Date) {
  const weekDay = WEEK_DAY_LABELS[date.getDay()];

  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 (${weekDay})`;
}
