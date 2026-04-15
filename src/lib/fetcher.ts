const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const TEAM_ID = process.env.NEXT_PUBLIC_TEAM_ID;

interface FetchOptions extends RequestInit {
  token?: string;
}

function normalizeEndpoint(endpoint: string) {
  return endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
}

export function teamEndpoint(endpoint: string, teamId = TEAM_ID) {
  if (!teamId) {
    throw new Error('NEXT_PUBLIC_TEAM_ID is not configured.');
  }

  return `/${teamId}${normalizeEndpoint(endpoint)}`;
}

export function buildApiUrl(endpoint: string) {
  if (/^https?:\/\//.test(endpoint)) {
    return endpoint;
  }

  if (!BASE_URL) {
    throw new Error('NEXT_PUBLIC_API_URL is not configured.');
  }

  return `${BASE_URL.replace(/\/$/, '')}${normalizeEndpoint(endpoint)}`;
}

async function getErrorMessage(res: Response) {
  const contentType = res.headers.get('Content-Type');

  if (!contentType?.includes('application/json')) {
    return `API Error: ${res.status}`;
  }

  const data = (await res.json().catch(() => null)) as {
    message?: string;
  } | null;

  return data?.message ?? `API Error: ${res.status}`;
}

/**
 * 공통 fetch 래퍼
 * @param endpoint - API 엔드포인트
 * @param options - fetch 옵션 및 토큰
 */
export async function fetcher<T>(
  endpoint: string,
  options: FetchOptions = {},
): Promise<T> {
  const { token, ...rest } = options;
  const headers = new Headers(rest.headers);
  const isFormData =
    typeof FormData !== 'undefined' && rest.body instanceof FormData;

  if (rest.body && !isFormData && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const res = await fetch(buildApiUrl(endpoint), {
    ...rest,
    headers,
  });

  if (!res.ok) {
    throw new Error(await getErrorMessage(res));
  }

  if (res.status === 204) {
    return undefined as T;
  }

  return res.json() as Promise<T>;
}
