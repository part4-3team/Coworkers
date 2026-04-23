'use client';

import Image from 'next/image';

import { icCloseLarge } from '@/assets';
import type { RightPanelContent } from '@/components/common/rightPanel/types';
import { cn } from '@/utils/cn';

type RightPanelShellProps = RightPanelContent & {
  className?: string;
  onClose: () => void;
};

export default function RightPanelShell({
  body,
  className,
  footer,
  headerAction,
  meta,
  onClose,
  title,
}: RightPanelShellProps) {
  return (
    <div
      className={cn(
        'relative flex h-full flex-col bg-background-inverse',
        className,
      )}
    >
      <div className="flex items-center px-6 pt-6 md:px-8 md:pt-8">
        <button
          type="button"
          aria-label="오른쪽 패널 닫기"
          onClick={onClose}
          className="flex size-6 items-center justify-center"
        >
          <Image src={icCloseLarge} alt="" width={24} height={24} />
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-6 pb-36 pt-8 md:px-8 md:pb-40 md:pt-10">
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-xl font-bold text-text-primary md:text-2xl">
            {title}
          </h2>
          {headerAction}
        </div>

        {meta && <div className="mt-5 md:mt-6">{meta}</div>}

        <div
          className={cn(
            'mt-6 border-t border-background-tertiary pt-6 md:mt-7 md:pt-7',
            !meta && 'mt-7 md:mt-8',
          )}
        >
          {body}
        </div>
      </div>

      {footer && (
        <div className="absolute inset-x-0 bottom-20 px-6 md:px-8">
          {footer}
        </div>
      )}
    </div>
  );
}
