'use client';

import { useContext } from 'react';

import { ServiceLayoutContext } from '@/components/layout/context/ServiceLayoutContext';

export default function useServiceLayoutContext() {
  const context = useContext(ServiceLayoutContext);

  if (context) {
    return context;
  }

  throw new Error(
    'useServiceLayoutContext는 ServiceLayoutProvider 안에서 사용해야 합니다.',
  );
}
