'use client';

/**
 * 댓글 입력창 컴포넌트입니다.
 *
 * - 기본 placeholder: "댓글을 달아주세요"
 * - 입력이 없으면 회색 버튼, 있으면 파란 버튼
 * - 버튼 클릭 또는 Enter 키로 제출 (Shift + Enter는 줄바꿈)
 * - 내용이 길어지면 높이 자동 증가
 */

import { type ChangeEvent, type KeyboardEvent, useRef, useState } from 'react';

import type { CommentInputProps } from '@/components/common/form/types';
import { cn } from '@/utils/cn';

export default function CommentInput({
  id,
  placeholder = '댓글을 달아주세요',
  disabled,
  className,
  onSubmit,
}: CommentInputProps) {
  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const isActive = value.trim().length > 0 && !disabled;

  const resizeTextarea = () => {
    if (!textareaRef.current) return;
    textareaRef.current.style.height = 'auto';
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  };

  const resetTextareaHeight = () => {
    if (!textareaRef.current) return;
    textareaRef.current.style.height = 'auto';
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    resizeTextarea();
  };

  const handleSubmit = () => {
    if (!isActive) return;

    onSubmit?.(value.trim());
    setValue('');
    resetTextareaHeight();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="w-full">
      <div className="relative">
        <textarea
          ref={textareaRef}
          id={id}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          rows={1}
          className={cn(
            'min-h-11 w-full resize-none overflow-hidden rounded-xl border border-background-tertiary bg-background-primary',
            'md:min-h-12',
            'px-4 py-3 pr-14 text-sm text-text-primary outline-none md:text-base',
            'placeholder:text-text-default',
            'focus:border-brand-primary',
            'disabled:cursor-not-allowed disabled:bg-background-secondary',
            className,
          )}
        />

        <button
          type="button"
          onClick={handleSubmit}
          disabled={!isActive}
          aria-label="댓글 등록"
          className="absolute right-3 bottom-2.5 flex h-6 w-6 items-center justify-center"
        >
          {isActive ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="12" fill="#74A1FB" />
              <path
                d="M8 11L12 7M12 7L16 11M12 7V16"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="12" fill="#64748B" />
              <path
                d="M8 11L12 7M12 7L16 11M12 7V16"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
