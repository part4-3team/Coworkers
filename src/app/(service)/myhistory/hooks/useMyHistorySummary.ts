'use client';

/**
 * 마이 히스토리 요약 아코디언 상태를 관리하는 훅입니다.
 */

import { useState } from 'react';

import { MY_HISTORY_SUMMARY_ITEMS } from '@/app/(service)/myhistory/constants';

export default function useMyHistorySummary() {
  const [activeItemId, setActiveItemId] = useState<string | null>(
    MY_HISTORY_SUMMARY_ITEMS[0].id,
  );

  const handleSelectItem = (itemId: string) => {
    setActiveItemId((prev) => (prev === itemId ? null : itemId));
  };

  return {
    activeItemId,
    handleSelectItem,
  } as const;
}
