/**
 * 사이드바에서 사용하는 TypeScript 타입을 정의하는 파일입니다.
 */

export type SidebarProps = Record<string, never>;

export type SidebarExpandedProps = {
  isExpanded: boolean;
};

export type SidebarHeaderProps = SidebarExpandedProps & {
  onToggle: () => void;
};

export type SidebarNavProps = SidebarExpandedProps;

export type SidebarFooterProps = SidebarExpandedProps;

export type SidebarIcon = {
  src: string;
};

export type SidebarTeam = {
  id: string;
  name: string;
};

export type SidebarLink = {
  href: string;
  label: string;
};

export type SidebarNavItemVariant = 'team' | 'addTeam' | 'board';

export type SidebarNavItemProps = SidebarExpandedProps & {
  href: string;
  icon: SidebarIcon;
  isActive?: boolean;
  label: string;
  variant?: SidebarNavItemVariant;
};

export type UseSidebarReturn = {
  handleToggleSidebar: () => void;
  isExpanded: boolean;
};
