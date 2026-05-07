import { cookies } from 'next/headers';

import { apiClient } from '@/api/apiClient';

export async function fetchWithAuth(endpoint: string) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('access-token')?.value;
  return apiClient<unknown>(endpoint, {
    cache: 'no-store',
    token: accessToken,
  });
}
