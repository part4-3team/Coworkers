/**
 * 사이드바에서 사용하는 메뉴 목데이터와 아이콘 매핑을 정의하는 파일입니다.
 */

import IcClipboardLargeUrl from '@/assets/icons/ic_clipboard_large.svg';
import IcCrownSmallUrl from '@/assets/icons/ic_crown_small.svg';
import IcPinSmallUrl from '@/assets/icons/ic_pin_small.svg';
import IcPlusLargeUrl from '@/assets/icons/ic_plus_large.svg';
import type { SidebarTeam } from '@/components/layout/sidebar/types';
import { ROUTES } from '@/constants/ROUTES';

export const SIDEBAR_DESKTOP_MEDIA_QUERY = '(min-width: 1024px)';

export const SIDEBAR_TEAMS: SidebarTeam[] = [
  { id: '22-3', isOwner: true, name: '경영관리팀' },
  { id: 'product', name: '프로덕트팀' },
  { id: 'marketing', name: '마케팅팀' },
  { id: 'contents', name: '콘텐츠팀' },
];

export const SIDEBAR_ICONS = {
  board: IcClipboardLargeUrl,
  team: IcPinSmallUrl,
  teamOwner: IcCrownSmallUrl,
  teamAdd: IcPlusLargeUrl,
} as const;

export const SIDEBAR_LINKS = {
  addTeam: {
    href: ROUTES.ADD_TEAM,
    label: '팀 추가하기',
  },
  boards: {
    href: ROUTES.BOARDS,
    label: '채용 / 홍보',
  },
} as const;
