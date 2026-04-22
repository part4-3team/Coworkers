'use client';

/**
 * 프로필 이미지 업로드 버튼 컴포넌트입니다.
 */

import { useId, useRef, type ChangeEvent } from 'react';

import Button from '@/components/common/button/components/Button';
import type { ProfileImageButtonProps } from '@/components/common/form/types';

export default function ProfileImageButton({
  id,
  buttonText = '프로필 사진 추가',
  accept = 'image/*',
  disabled,
  onChange,
}: ProfileImageButtonProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const ref = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    onChange?.(file);

    e.target.value = '';
  };

  return (
    <>
      <Button
        type="button"
        onClick={() => ref.current?.click()}
        disabled={disabled}
      >
        {buttonText}
      </Button>

      <input
        ref={ref}
        id={inputId}
        type="file"
        accept={accept}
        disabled={disabled}
        className="hidden"
        onChange={handleChange}
      />
    </>
  );
}
