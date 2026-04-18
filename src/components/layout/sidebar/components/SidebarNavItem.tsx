/**
 * 사이드바 메뉴 목록에서 하나의 링크 아이템을 렌더링하는 컴포넌트입니다.
 */

import Link from 'next/link';

import type { SidebarNavItemProps } from '@/components/layout/sidebar/types';
import { cn } from '@/utils/cn';

export default function SidebarNavItem({
  href,
  icon,
  isActive = false,
  isExpanded,
  label,
  variant = 'team',
}: SidebarNavItemProps) {
  const linkElement = (
    <Link
      href={href}
      className={cn(
        'flex items-center overflow-hidden font-medium transition-colors',
        variant === 'team' &&
          (isExpanded
            ? 'h-12 gap-4 rounded-lg px-5 text-base hover:bg-background-secondary'
            : 'size-10 justify-center rounded-lg hover:bg-background-secondary'),
        variant === 'team' &&
          (isActive
            ? 'bg-brand-secondary text-brand-primary'
            : 'text-text-primary'),
        variant === 'addTeam' &&
          'justify-center border border-brand-primary text-brand-primary hover:bg-brand-secondary',
        variant === 'addTeam' &&
          (isExpanded
            ? 'mt-6 h-12 w-full gap-2 rounded-lg text-base'
            : 'mt-6 size-10 rounded-lg'),
        variant === 'board' && 'text-text-primary',
        variant === 'board' &&
          (isExpanded
            ? 'h-12 w-full gap-4 rounded-lg px-5 text-base hover:bg-background-secondary'
            : 'size-10 justify-center rounded-lg hover:bg-background-secondary'),
      )}
      aria-current={isActive ? 'page' : undefined}
    >
      <span
        aria-hidden="true"
        className={cn(
          'block size-5 shrink-0',
          variant === 'team' &&
            (isActive ? 'bg-brand-primary' : 'bg-text-disabled'),
          variant === 'addTeam' && 'bg-brand-primary',
          variant === 'board' && 'bg-text-disabled',
        )}
        style={{
          WebkitMask: `url(${icon.src}) center / contain no-repeat`,
          mask: `url(${icon.src}) center / contain no-repeat`,
        }}
      />
      {isExpanded && <span className="whitespace-nowrap">{label}</span>}
    </Link>
  );

  if (variant === 'team') {
    return <li className={cn(isExpanded && 'w-full')}>{linkElement}</li>;
  }

  return linkElement;
}
