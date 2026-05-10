// page.tsx
'use client';

import { use } from 'react';

import { TeamDetailData, TeamPageProps } from '@/app/(service)/[teamid]/types';
import { useTeamDetailQuery } from '@/hooks/useTeam';

import EditTeamForm from './EditTeamForm'; // EditTeamForm.tsx 별도 파일

export default function EditTeamPage({ params }: TeamPageProps) {
  const { teamid } = use(params);
  const { data: teamData } = useTeamDetailQuery<TeamDetailData>({
    teamId: teamid,
  });

  if (!teamData) return null;

  return <EditTeamForm teamData={teamData} teamid={teamid} />;
}
