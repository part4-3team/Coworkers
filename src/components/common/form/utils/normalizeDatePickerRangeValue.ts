import type { DatePickerRangeValue } from '@/components/common/form/types';

export function normalizeDatePickerRangeValue(
  date: Date | DatePickerRangeValue | null,
) {
  if (date === null) {
    return [null, null] satisfies DatePickerRangeValue;
  }

  if (Array.isArray(date)) {
    return date satisfies DatePickerRangeValue;
  }

  return null;
}
