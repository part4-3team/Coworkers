/**
 * 사이드바의 팀 목록, 팀 추가, 자유게시판 링크 영역입니다.
 */

import SidebarNavItem from '@/components/layout/sidebar/components/SidebarNavItem';
import {
  ACTIVE_TEAM_ID,
  SIDEBAR_ICONS,
  SIDEBAR_LINKS,
  SIDEBAR_TEAMS,
} from '@/components/layout/sidebar/constants';
import type { SidebarNavProps } from '@/components/layout/sidebar/types';
import { ROUTES } from '@/constants/ROUTES';
import { cn } from '@/utils/cn';

export default function SidebarNav({ isExpanded }: SidebarNavProps) {
  return (
    <nav
      aria-label="사이드바 메뉴"
      className={cn(
        'flex flex-col',
        isExpanded ? 'mt-14 px-3.75' : 'mt-11 items-center px-3',
      )}
    >
      <ul
        className={cn(
          'flex flex-col',
          isExpanded ? 'w-full gap-2' : 'items-center gap-2',
        )}
      >
        {SIDEBAR_TEAMS.map((team) => (
          <SidebarNavItem
            key={team.id}
            href={ROUTES.TEAM(team.id)}
            icon={SIDEBAR_ICONS.team}
            isActive={team.id === ACTIVE_TEAM_ID}
            isExpanded={isExpanded}
            label={team.name}
            variant="team"
          />
        ))}
      </ul>

      <SidebarNavItem
        href={SIDEBAR_LINKS.addTeam.href}
        icon={SIDEBAR_ICONS.teamAdd}
        isExpanded={isExpanded}
        label={SIDEBAR_LINKS.addTeam.label}
        variant="addTeam"
      />

      <div
        className={cn(
          'bg-background-tertiary',
          isExpanded ? 'my-7 h-px w-full' : 'my-6 h-px w-10',
        )}
      />

      <SidebarNavItem
        href={SIDEBAR_LINKS.boards.href}
        icon={SIDEBAR_ICONS.board}
        isExpanded={isExpanded}
        label={SIDEBAR_LINKS.boards.label}
        variant="board"
      />
    </nav>
  );
}
