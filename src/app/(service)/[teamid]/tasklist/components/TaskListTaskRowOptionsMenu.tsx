/**
 * 할 일 리스트 전용 더보기 메뉴 래퍼입니다.
 * 공용 ListDropdown 포털을 재사용하되, 피그마에 맞는 메뉴 폭과 모서리만 조정합니다.
 */

'use client';

import { ListDropdown } from '@/components/common/dropdown';
import { cn } from '@/utils/cn';

export type TaskListTaskRowOptionsMenuItem = {
  label: string;
  onClick: () => void;
};

type TaskListTaskRowOptionsMenuProps = {
  trigger: React.ReactNode;
  items: TaskListTaskRowOptionsMenuItem[];
  className?: string;
};

export default function TaskListTaskRowOptionsMenu({
  trigger,
  items,
  className,
}: TaskListTaskRowOptionsMenuProps) {
  return (
    <ListDropdown
      className={cn('relative inline-flex shrink-0 items-center', className)}
      items={items}
      menuClassName="z-50! rounded-lg border-background-tertiary shadow-md"
      trigger={trigger}
    />
  );
}
