/**
 * 공용 드롭다운 컴포넌트입니다.
 */

import type { SelectHTMLAttributes } from 'react';

type DropdownProps = SelectHTMLAttributes<HTMLSelectElement>;

export default function Dropdown({ children, ...props }: DropdownProps) {
  return <select {...props}>{children}</select>;
}
