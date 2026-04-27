import { useState } from 'react';

export function useCreateTeamForm() {
  const [teamName, setTeamName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChangeTeamName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setTeamName(value);

    if (!value.trim()) {
      setErrorMessage('팀 이름을 입력해주세요.');
      return;
    }

    setErrorMessage('');
  };

  const isDisabled = !teamName.trim() || Boolean(errorMessage);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isDisabled) return;

    // TODO: 팀 생성 API 연결
    console.log('팀 생성:', teamName);
  };

  return {
    teamName,
    errorMessage,
    isDisabled,
    handleChangeTeamName,
    handleSubmit,
  };
}
