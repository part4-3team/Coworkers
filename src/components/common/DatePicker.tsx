/**
 * 공용 날짜 선택 컴포넌트입니다.
 */

import type { InputHTMLAttributes } from 'react';

type DatePickerProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>;

export default function DatePicker(props: DatePickerProps) {
  return <input type="date" {...props} />;
}
