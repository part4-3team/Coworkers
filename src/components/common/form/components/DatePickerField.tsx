'use client';

/**
 * 날짜 입력 필드와 에러 메시지 영역을 감싸는 래퍼입니다.
 */

import type { ReactNode } from 'react';

type DatePickerFieldProps = {
  children: ReactNode;
  errorMessage?: string;
};

export default function DatePickerField({
  children,
  errorMessage,
}: DatePickerFieldProps) {
  return (
    <div className="flex w-full flex-col gap-2">
      {children}

      {errorMessage && (
        <p className="text-xs font-medium text-status-danger md:text-sm">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
