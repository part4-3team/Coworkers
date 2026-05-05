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

export type SidebarNavProps = SidebarExpandedProps & {
  isMobileDrawer?: boolean;
};

export type SidebarFooterProps = SidebarExpandedProps;

export type SidebarIcon = string;

export type SidebarTeam = {
  createdAt?: string;
  id: string;
  isOwner?: boolean;
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
  isMobileDrawer?: boolean;
  isOwnerIcon?: boolean;
  label: string;
  onClick?: () => void;
  variant?: SidebarNavItemVariant;
};

export type UseSidebarReturn = {
  handleSidebarInteraction: () => void;
  handleToggleSidebar: () => void;
  isExpanded: boolean;
};
