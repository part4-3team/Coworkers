'use client';

/**
 * 공용 날짜 선택 컴포넌트입니다.
 */

import {
  RangeFieldDatePicker,
  SingleFieldDatePicker,
} from '@/components/common/form/components/FieldDatePicker';
import {
  RangeInlineDatePicker,
  SingleInlineDatePicker,
} from '@/components/common/form/components/InlineDatePicker';
import type { DatePickerProps } from '@/components/common/form/types';

export default function DatePicker(props: DatePickerProps) {
  if (props.isInline) {
    if (props.selectsRange) return <RangeInlineDatePicker {...props} />;

    return <SingleInlineDatePicker {...props} />;
  }

  if (props.selectsRange) return <RangeFieldDatePicker {...props} />;

  return <SingleFieldDatePicker {...props} />;
}
