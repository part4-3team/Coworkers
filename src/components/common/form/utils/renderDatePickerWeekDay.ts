import { WEEK_DAY_LABELS } from '@/components/common/form/constants';

import type { ReactDatePickerCustomDayNameProps } from 'react-datepicker';

export function renderDatePickerWeekDay({
  day,
}: ReactDatePickerCustomDayNameProps) {
  return WEEK_DAY_LABELS[day.getDay()];
}
