/**
 * 할 일 반복 라벨을 화면 표시용 문자열로 변환하는 유틸입니다.
 */

import { TASKLIST_WEEKDAY_LABELS } from '@/app/(service)/[teamid]/tasklist/utils/boardDate';
import type { Task } from '@/types/task';

function normalizeWeekDays(weekDays?: number[]) {
  return (weekDays ?? [])
    .filter((day) => Number.isInteger(day) && day >= 0 && day <= 6)
    .sort((firstDay, secondDay) => firstDay - secondDay);
}

export function formatTaskListRepeatLabel(
  frequency: Task['frequency'],
  weekDays?: number[],
) {
  if (frequency === 'ONCE') {
    return '';
  }

  if (frequency === 'DAILY') {
    return '매일 반복';
  }

  if (frequency === 'MONTHLY') {
    return '매월 반복';
  }

  const normalizedWeekDays = normalizeWeekDays(weekDays);

  if (normalizedWeekDays.length === 0) {
    return '매주 반복';
  }

  return `${normalizedWeekDays
    .map((day) => TASKLIST_WEEKDAY_LABELS[day])
    .join(',')} 반복`;
}
