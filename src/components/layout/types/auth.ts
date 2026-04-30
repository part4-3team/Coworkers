import type { LayoutCurrentUser } from '@/components/layout/constants';
import type { SidebarTeam } from '@/components/layout/sidebar/types';

export type LayoutMembershipGroup = {
  id?: number | string;
  name?: string;
  teamId?: string;
};

export type LayoutMembership = {
  group?: LayoutMembershipGroup;
  role?: string;
};

export type LayoutMeResponse = {
  email?: string;
  image?: string | null;
  nickname?: string;
};

export type LayoutSessionFallbackUser = {
  email?: string;
  image?: string | null;
  nickname?: string;
  teamName?: string;
};

export type LayoutAuthState = {
  currentUser: LayoutCurrentUser;
  isAuthenticated: boolean;
  teams: SidebarTeam[];
};
