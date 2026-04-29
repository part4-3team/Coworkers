/**
 * 클라이언트에서 인증 세션을 저장하고 읽는 유틸입니다.
 */

const ACCESS_TOKEN_COOKIE_KEY = 'access-token';
const AUTH_SESSION_STORAGE_KEY = 'coworkers-auth-session';
const AUTH_SESSION_CHANGE_EVENT = 'coworkers-auth-session-change';

export type AuthSessionUser = {
  email?: string;
  image?: string | null;
  nickname?: string;
  teamName?: string;
};

export type AuthSession = {
  accessToken: string;
  refreshToken: string;
  user?: AuthSessionUser;
};

function isBrowser() {
  return typeof window !== 'undefined';
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function getCookieValue(name: string) {
  if (!isBrowser()) {
    return null;
  }

  const key = `${name}=`;
  const cookie = document.cookie
    .split('; ')
    .find((cookieItem) => cookieItem.startsWith(key));

  return cookie?.slice(key.length) ?? null;
}

function emitAuthSessionChange() {
  if (!isBrowser()) {
    return;
  }

  window.dispatchEvent(new Event(AUTH_SESSION_CHANGE_EVENT));
}

function buildAccessTokenCookie(accessToken: string) {
  return `${ACCESS_TOKEN_COOKIE_KEY}=${accessToken}; path=/; SameSite=Lax`;
}

function buildExpiredAccessTokenCookie() {
  return `${ACCESS_TOKEN_COOKIE_KEY}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax`;
}

function toAuthSessionUser(value: unknown): AuthSessionUser | undefined {
  if (!isRecord(value)) {
    return undefined;
  }

  return {
    email: typeof value.email === 'string' ? value.email : undefined,
    image:
      typeof value.image === 'string' || value.image === null
        ? value.image
        : undefined,
    nickname: typeof value.nickname === 'string' ? value.nickname : undefined,
    teamName: typeof value.teamName === 'string' ? value.teamName : undefined,
  };
}

export function extractAuthSession(data: unknown): AuthSession | null {
  if (!isRecord(data)) {
    return null;
  }

  const candidates = [
    data,
    isRecord(data.data) ? data.data : null,
    isRecord(data.session) ? data.session : null,
    isRecord(data.authSession) ? data.authSession : null,
  ].filter(
    (candidate): candidate is Record<string, unknown> => candidate !== null,
  );

  for (const candidate of candidates) {
    if (
      typeof candidate.accessToken === 'string' &&
      typeof candidate.refreshToken === 'string'
    ) {
      return {
        accessToken: candidate.accessToken,
        refreshToken: candidate.refreshToken,
        user: toAuthSessionUser(candidate.user),
      };
    }
  }

  return null;
}

export function getAuthSession() {
  if (!isBrowser()) {
    return null;
  }

  const storedSession = window.localStorage.getItem(AUTH_SESSION_STORAGE_KEY);

  if (!storedSession) {
    return null;
  }

  try {
    return extractAuthSession(JSON.parse(storedSession));
  } catch {
    return null;
  }
}

export function saveAuthSession(session: AuthSession) {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.setItem(
    AUTH_SESSION_STORAGE_KEY,
    JSON.stringify(session),
  );
  document.cookie = buildAccessTokenCookie(session.accessToken);
  emitAuthSessionChange();
}

export function clearAuthSession() {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.removeItem(AUTH_SESSION_STORAGE_KEY);
  document.cookie = buildExpiredAccessTokenCookie();
  emitAuthSessionChange();
}

export function getStoredAccessToken() {
  const session = getAuthSession();

  if (session?.accessToken) {
    return session.accessToken;
  }

  return getCookieValue(ACCESS_TOKEN_COOKIE_KEY);
}

export function hasAuthSession() {
  return Boolean(getStoredAccessToken());
}

export function subscribeAuthSessionChange(onChange: () => void) {
  if (!isBrowser()) {
    return () => {};
  }

  window.addEventListener(AUTH_SESSION_CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener(AUTH_SESSION_CHANGE_EVENT, onChange);
  };
}
