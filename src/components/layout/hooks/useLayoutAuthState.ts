'use client';

import { useEffect, useState } from 'react';

import {
  DEFAULT_LAYOUT_CURRENT_USER,
  isGuestLayoutPath,
} from '@/components/layout/constants';
import type { LayoutCurrentUser } from '@/components/layout/constants';
import {
  getAuthSession,
  hasAuthSession,
  subscribeAuthSessionChange,
} from '@/utils/authSession';

type LayoutAuthState = {
  currentUser: LayoutCurrentUser;
  isAuthenticated: boolean;
};

function getCurrentUser(): LayoutCurrentUser {
  const session = getAuthSession();
  const nickname = session?.user?.nickname;
  const teamName = session?.user?.teamName;

  return {
    name: nickname ?? DEFAULT_LAYOUT_CURRENT_USER.name,
    teamName: teamName ?? DEFAULT_LAYOUT_CURRENT_USER.teamName,
  };
}

export default function useLayoutAuthState(pathname: string | null) {
  const [layoutAuthState, setLayoutAuthState] = useState<LayoutAuthState>(
    () => ({
      currentUser: DEFAULT_LAYOUT_CURRENT_USER,
      isAuthenticated: false,
    }),
  );

  useEffect(() => {
    const syncLayoutAuthState = () => {
      setLayoutAuthState({
        currentUser: getCurrentUser(),
        isAuthenticated: hasAuthSession() && !isGuestLayoutPath(pathname),
      });
    };

    syncLayoutAuthState();
    return subscribeAuthSessionChange(syncLayoutAuthState);
  }, [pathname]);

  return layoutAuthState;
}
