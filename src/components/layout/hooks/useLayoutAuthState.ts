'use client';

import { useEffect, useMemo, useState } from 'react';

import {
  DEFAULT_LAYOUT_CURRENT_USER,
  isGuestLayoutPath,
} from '@/components/layout/constants';
import type { LayoutCurrentUser } from '@/components/layout/constants';
import type { SidebarTeam } from '@/components/layout/sidebar/types';
import { useMeQuery, useMyMembershipsQuery } from '@/hooks/useUser';
import {
  getAuthSession,
  hasAuthSession,
  subscribeAuthSessionChange,
} from '@/utils/authSession';

type LayoutMembership = {
  group?: {
    id?: number | string;
    name?: string;
    teamId?: string;
  };
  role?: string;
};

type LayoutMeResponse = {
  email?: string;
  image?: string | null;
  nickname?: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function getSessionFallbackUser() {
  const session = getAuthSession();

  return {
    email: session?.user?.email,
    image: session?.user?.image,
    nickname: session?.user?.nickname,
    teamName: session?.user?.teamName,
  };
}

function getTeamIdFromPathname(pathname: string | null) {
  if (!pathname) {
    return null;
  }

  const [firstSegment] = pathname.split('/').filter(Boolean);

  if (
    !firstSegment ||
    firstSegment === 'boards' ||
    firstSegment === 'myhistory' ||
    firstSegment === 'mypage' ||
    firstSegment === 'addteam' ||
    firstSegment === 'jointeam' ||
    firstSegment === 'login' ||
    firstSegment === 'signup' ||
    firstSegment === 'oauth'
  ) {
    return null;
  }

  return firstSegment;
}

function toMembershipArray(data: unknown): LayoutMembership[] {
  if (Array.isArray(data)) {
    return data.filter(isRecord) as LayoutMembership[];
  }

  if (!isRecord(data)) {
    return [];
  }

  if (Array.isArray(data.list)) {
    return data.list.filter(isRecord) as LayoutMembership[];
  }

  if (Array.isArray(data.memberships)) {
    return data.memberships.filter(isRecord) as LayoutMembership[];
  }

  if (isRecord(data.data)) {
    return toMembershipArray(data.data);
  }

  return [];
}

function toMeResponse(data: unknown): LayoutMeResponse | undefined {
  if (!isRecord(data)) {
    return undefined;
  }

  const candidate = isRecord(data.data) ? data.data : data;

  return {
    email: typeof candidate.email === 'string' ? candidate.email : undefined,
    image:
      typeof candidate.image === 'string' || candidate.image === null
        ? candidate.image
        : undefined,
    nickname:
      typeof candidate.nickname === 'string' ? candidate.nickname : undefined,
  };
}

function toSidebarTeams(data: unknown): SidebarTeam[] {
  const memberships = toMembershipArray(data);

  return memberships.reduce<SidebarTeam[]>((teams, membership) => {
    const teamId =
      membership.group?.id !== undefined ? String(membership.group.id) : null;
    const teamName =
      typeof membership.group?.name === 'string' ? membership.group.name : null;

    if (!teamId || !teamName) {
      return teams;
    }

    teams.push({
      id: teamId,
      isOwner: membership.role === 'ADMIN',
      name: teamName,
    });

    return teams;
  }, []);
}

function getCurrentUser(
  pathname: string | null,
  meData: LayoutMeResponse | undefined,
  teams: SidebarTeam[],
): LayoutCurrentUser {
  const sessionFallbackUser = getSessionFallbackUser();
  const currentPathTeamId = getTeamIdFromPathname(pathname);
  const currentPathTeam = teams.find((team) => team.id === currentPathTeamId);
  const firstTeam = teams[0];

  return {
    email: meData?.email ?? sessionFallbackUser.email,
    image: meData?.image ?? sessionFallbackUser.image ?? null,
    name:
      meData?.nickname ??
      sessionFallbackUser.nickname ??
      DEFAULT_LAYOUT_CURRENT_USER.name,
    teamName:
      currentPathTeam?.name ??
      sessionFallbackUser.teamName ??
      firstTeam?.name ??
      DEFAULT_LAYOUT_CURRENT_USER.teamName,
  };
}

export default function useLayoutAuthState(pathname: string | null) {
  const [isSessionReady, setIsSessionReady] = useState(false);
  const isAuthenticated = isSessionReady && !isGuestLayoutPath(pathname);

  const { data: meResponse } = useMeQuery<unknown>({
    options: {
      enabled: isAuthenticated,
    },
  });
  const { data: membershipsData } = useMyMembershipsQuery<unknown>({
    options: {
      enabled: isAuthenticated,
    },
  });

  const teams = useMemo(() => {
    if (!isAuthenticated) {
      return [];
    }

    const membershipTeams = toSidebarTeams(membershipsData);

    if (membershipTeams.length > 0) {
      return membershipTeams;
    }

    return toSidebarTeams(meResponse);
  }, [isAuthenticated, meResponse, membershipsData]);
  const meData = useMemo(() => {
    if (!isAuthenticated) {
      return undefined;
    }

    return toMeResponse(meResponse);
  }, [isAuthenticated, meResponse]);

  useEffect(() => {
    const syncLayoutAuthState = () => {
      setIsSessionReady(hasAuthSession());
    };

    syncLayoutAuthState();
    return subscribeAuthSessionChange(syncLayoutAuthState);
  }, []);

  return useMemo(
    () => ({
      currentUser: isAuthenticated
        ? getCurrentUser(pathname, meData, teams)
        : DEFAULT_LAYOUT_CURRENT_USER,
      isAuthenticated,
      teams: isAuthenticated ? teams : [],
    }),
    [isAuthenticated, meData, pathname, teams],
  );
}
