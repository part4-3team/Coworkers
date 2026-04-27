import { useState } from 'react';

export function useCreateTeamForm() {
  const [teamName, setTeamName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const validateTeamName = (value: string) => {
    if (!value.trim()) {
      return '';
    }

    if (/[^a-zA-Z0-9가-힣\s]/.test(value)) {
      return '특수기호가 포함된 이름은 사용할 수 없습니다.';
    }

    if (value.length > 8) {
      return '8자 이내로 작성해 주세요.';
    }

    // TODO: API 연결 후 중복 검사 추가
    // return '이미 존재하는 이름입니다.';

    return '';
  };

  const handleChangeTeamName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTeamName(value);
    setErrorMessage(validateTeamName(value));
  };

  const handleBlurTeamName = () => {
    if (!teamName.trim()) {
      setErrorMessage('');
    }
  };

  const isDisabled = !teamName.trim() || Boolean(errorMessage);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isDisabled) return;

    console.log('팀 생성:', teamName);
  };

  return {
    teamName,
    errorMessage,
    isDisabled,
    handleChangeTeamName,
    handleBlurTeamName,
    handleSubmit,
  };
}
