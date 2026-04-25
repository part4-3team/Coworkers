/**
 * 페이지 상단 제목 영역을 렌더링하는 공용 컴포넌트입니다.
 */

'use client';

import { icSettingsLarge } from '@/assets';
import { ListDropdown } from '@/components/common/dropdown';
import type { PageHeaderProps } from '@/components/common/pageHeader/types';
import { cn } from '@/utils/cn';

export default function PageHeader({
  className,
  hasSettingsButton = false,
  title,
}: PageHeaderProps) {
  const handleActionClick = () => undefined;

  return (
    <div
      className={cn(
        'flex items-center 2xl:h-16 2xl:rounded-xl 2xl:bg-background-inverse 2xl:px-6 2xl:shadow-[0_8px_20px_rgba(49,84,153,0.12)]',
        className,
      )}
    >
      <div className="flex items-center gap-2 md:gap-2.5 2xl:w-full 2xl:justify-between 2xl:gap-0">
        <h1 className="text-xl font-bold text-text-primary md:text-2xl">
          {title}
        </h1>

        {hasSettingsButton && (
          <ListDropdown
            className="relative"
            items={[
              { label: '수정하기', onClick: handleActionClick },
              { label: '삭제하기', onClick: handleActionClick },
            ]}
            menuClassName="mt-2 w-30 overflow-hidden rounded-lg border border-background-tertiary py-0 md:w-30"
            trigger={
              <>
                <span className="sr-only">{`${title} 설정 메뉴 열기`}</span>
                <span
                  className="block size-5 bg-interaction-inactive md:size-6"
                  aria-hidden="true"
                  style={{
                    WebkitMask: `url(${icSettingsLarge.src}) center / contain no-repeat`,
                    mask: `url(${icSettingsLarge.src}) center / contain no-repeat`,
                  }}
                />
              </>
            }
          />
        )}
      </div>
    </div>
  );
}
