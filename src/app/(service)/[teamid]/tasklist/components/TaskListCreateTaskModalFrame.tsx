'use client';

import type { ReactNode } from 'react';

import Image from 'next/image';

import { icCloseMedium } from '@/assets';
import ModalPortal from '@/components/common/modal/components/ModalPortal';
import { cn } from '@/utils/cn';

type TaskListCreateTaskModalFrameProps = {
  children: ReactNode;
  footer: ReactNode;
  intro: ReactNode;
  isCalendarOpen: boolean;
  onClose: () => void;
};

export default function TaskListCreateTaskModalFrame({
  children,
  footer,
  intro,
  isCalendarOpen,
  onClose,
}: TaskListCreateTaskModalFrameProps) {
  return (
    <ModalPortal>
      <div
        className="fixed top-0 right-0 bottom-0 left-0 z-999 flex justify-center bg-black/60 items-end-safe pb-[env(safe-area-inset-bottom)] pt-[env(safe-area-inset-top)] md:items-center md:justify-center md:px-4 md:pb-0 md:pt-0"
        onClick={onClose}
      >
        <div
          className={cn(
            'relative flex max-h-[min(92dvh,calc(100dvh-env(safe-area-inset-top)-env(safe-area-inset-bottom)))] min-h-0 w-full flex-col overflow-x-hidden overflow-y-auto rounded-t-2xl bg-white p-5 text-center shadow-[0_-8px_30px_rgba(0,0,0,0.08)]',
            'md:max-h-none md:max-w-96 md:overflow-visible md:rounded-3xl md:p-6 md:shadow-none',
            isCalendarOpen ? 'md:min-h-[930px]' : 'md:min-h-166',
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            className="absolute top-4 right-[max(1rem,env(safe-area-inset-right))] z-10 md:right-4"
            onClick={onClose}
            aria-label="모달 닫기"
          >
            <Image src={icCloseMedium} alt="모달 닫기" width={24} height={24} />
          </button>

          {intro}

          {children}

          {footer}
        </div>
      </div>
    </ModalPortal>
  );
}
