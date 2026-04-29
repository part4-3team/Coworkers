/**
 * 할 일 항목의 체크 상태를 표시하는 공용 컴포넌트입니다.
 */

import Image from 'next/image';

import icCheckboxCheckedLarge from '@/assets/icons/ic_checkbox_checked_large.svg?url';
import icCheckboxLarge from '@/assets/icons/ic_checkbox_large.svg?url';

type TodoCheckUncheckProps = {
  label: string;
  checked: boolean;
  onChange?: (checked: boolean) => void;
};

export default function TodoCheckUncheck({
  label,
  checked,
  onChange,
}: TodoCheckUncheckProps) {
  return (
    <label className="inline-flex cursor-pointer items-center gap-2 md:gap-2.5">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
        className="sr-only"
      />

      <Image
        src={checked ? icCheckboxCheckedLarge : icCheckboxLarge}
        alt=""
        aria-hidden="true"
        width={16}
        height={16}
        className="h-3 w-3 shrink-0 md:h-4 md:w-4"
      />

      <span
        className={`text-sm font-medium leading-none truncate w-full md:text-base ${
          checked
            ? 'text-interaction-inactive line-through'
            : 'text-text-primary'
        }`}
      >
        {label}
      </span>
    </label>
  );
}
