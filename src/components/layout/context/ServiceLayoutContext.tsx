'use client';

import { createContext } from 'react';
import type { PropsWithChildren } from 'react';

import useServiceLayoutState from '@/components/layout/hooks/useServiceLayoutState';
import type { ServiceLayoutContextValue } from '@/components/layout/types';

export const ServiceLayoutContext =
  createContext<ServiceLayoutContextValue | null>(null);

export function ServiceLayoutProvider({ children }: PropsWithChildren) {
  const value = useServiceLayoutState();

  return (
    <ServiceLayoutContext.Provider value={value}>
      {children}
    </ServiceLayoutContext.Provider>
  );
}
