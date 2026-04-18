/**
 * 사이드바에서 사용하는 메뉴 목데이터와 아이콘 매핑을 정의하는 파일입니다.
 */

import { icClipboardLarge, icPinSmall, icPlusLarge } from '@/assets';
import type { SidebarTeam } from '@/components/layout/sidebar/types';
import { ROUTES } from '@/constants/ROUTES';

export const SIDEBAR_DESKTOP_MEDIA_QUERY = '(min-width: 1024px)';

export const SIDEBAR_TEAMS: SidebarTeam[] = [
  { id: '22-3', name: '경영관리팀' },
  { id: 'product', name: '프로덕트팀' },
  { id: 'marketing', name: '마케팅팀' },
  { id: 'contents', name: '콘텐츠팀' },
];

export const ACTIVE_TEAM_ID = '22-3';

export const SIDEBAR_ICONS = {
  board: icClipboardLarge,
  team: icPinSmall,
  teamAdd: icPlusLarge,
} as const;

export const SIDEBAR_LINKS = {
  addTeam: {
    href: ROUTES.ADD_TEAM,
    label: '팀 추가하기',
  },
  boards: {
    href: ROUTES.BOARDS,
    label: '자유게시판',
  },
} as const;
