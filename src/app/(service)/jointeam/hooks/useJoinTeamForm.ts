'use client';

import { useState } from 'react';

export function useJoinTeamForm() {
  const [teamLink, setTeamLink] = useState('');

  const handleChangeTeamLink = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTeamLink(e.target.value);
  };

  const isDisabled = !teamLink.trim();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isDisabled) return;

    // TODO: 참여 API 연결
  };

  return {
    teamLink,
    isDisabled,
    handleChangeTeamLink,
    handleSubmit,
  };
}
