'use client';

/**
 * 마이 히스토리 상단 필터 버튼의 활성 상태를 관리하는 훅입니다.
 */

import { useState } from 'react';

import { MY_HISTORY_FILTERS } from '@/app/(service)/myhistory/constants';

export default function useHistoryFilters() {
  const [activeFilterId, setActiveFilterId] = useState<string | null>(
    MY_HISTORY_FILTERS[0].id,
  );

  const handleSelectFilter = (filterId: string) => {
    setActiveFilterId((prev) => (prev === filterId ? null : filterId));
  };

  return {
    activeFilterId,
    handleSelectFilter,
  } as const;
}
