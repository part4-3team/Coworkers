import type { SidebarTeam } from '@/components/layout/sidebar/types';
import type {
  LayoutMembership,
  LayoutMeResponse,
} from '@/components/layout/types/auth';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

export function toMembershipArray(data: unknown): LayoutMembership[] {
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

export function toMeResponse(data: unknown): LayoutMeResponse | undefined {
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

export function toSidebarTeams(data: unknown): SidebarTeam[] {
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
