/**
 * 할 일 목록 컬럼의 한 행(제목·진행 배지·더보기 메뉴)입니다.
 * 케밥 메뉴는 lg 이상에서만 표시합니다.
 */

'use client';

import Image from 'next/image';

import type { TaskListColumnItem } from '@/app/(service)/[teamid]/tasklist/types';
import { icMoreVerticalLarge } from '@/assets';
import { Badge } from '@/components/common/badge';
import { ListDropdown } from '@/components/common/dropdown';
import { cn } from '@/utils/cn';

type TaskListNavItemProps = {
  item: TaskListColumnItem;
  isActive: boolean;
  onSelect: () => void;
};

export default function TaskListNavItem({
  item,
  isActive,
  onSelect,
}: TaskListNavItemProps) {
  return (
    <li className="list-none">
      <article
        className={cn(
          'flex h-13.75 w-full min-w-0 max-w-full items-center gap-3 rounded-xl border bg-background-primary py-0 pl-4 pr-3 transition-colors md:pl-5 lg:max-w-67.5',
          isActive
            ? 'border-brand-primary shadow-sm ring-1 ring-brand-primary/20'
            : 'border-background-tertiary hover:border-background-tertiary hover:bg-background-secondary',
        )}
        aria-current={isActive ? 'true' : undefined}
      >
        <button
          type="button"
          onClick={onSelect}
          className="min-w-0 flex-1 text-left outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
          aria-label={`${item.title} 목록 선택`}
        >
          <h2 className="truncate text-sm font-medium text-text-primary">
            {item.title}
          </h2>
        </button>
        <div className="flex shrink-0 items-center gap-1.5 [&_img]:block">
          <Badge
            completed={item.completed}
            total={item.total}
            className="items-center gap-1 leading-none"
          />
          <ListDropdown
            trigger={
              <span className="flex size-6 shrink-0 items-center justify-center rounded-md text-icon-primary hover:bg-background-tertiary">
                <Image
                  src={icMoreVerticalLarge}
                  alt=""
                  width={24}
                  height={24}
                  className="block size-6 shrink-0"
                />
              </span>
            }
            items={[
              {
                label: '이름 변경',
                onClick: () => {},
              },
              {
                label: '삭제',
                onClick: () => {},
              },
            ]}
            className="hidden shrink-0 lg:inline-flex"
          />
        </div>
      </article>
    </li>
  );
}
