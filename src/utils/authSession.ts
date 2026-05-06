/**
 * 클라이언트에서 인증 세션을 저장하고 읽는 유틸입니다.
 */

const ACCESS_TOKEN_COOKIE_KEY = 'access-token';
const AUTH_SESSION_STORAGE_KEY = 'coworkers-auth-session';
const AUTH_SESSION_CHANGE_EVENT = 'coworkers-auth-session-change';

export type AuthSessionChangeReason =
  | 'saved'
  | 'manual'
  | 'expired'
  | 'unauthorized';

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

function decodeJwtPayload(accessToken: string) {
  if (!isBrowser()) {
    return null;
  }

  const [, encodedPayload] = accessToken.split('.');

  if (!encodedPayload) {
    return null;
  }

  const normalizedPayload = encodedPayload
    .replace(/-/g, '+')
    .replace(/_/g, '/')
    .padEnd(Math.ceil(encodedPayload.length / 4) * 4, '=');

  try {
    return JSON.parse(window.atob(normalizedPayload)) as {
      exp?: number;
    };
  } catch {
    return null;
  }
}

function emitAuthSessionChange(reason: AuthSessionChangeReason) {
  if (!isBrowser()) {
    return;
  }

  window.dispatchEvent(
    new CustomEvent(AUTH_SESSION_CHANGE_EVENT, {
      detail: {
        reason,
      },
    }),
  );
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
  emitAuthSessionChange('saved');
}

export function clearAuthSession(reason: AuthSessionChangeReason = 'manual') {
  if (!isBrowser()) {
    return;
  }

  const hasStoredSession =
    window.localStorage.getItem(AUTH_SESSION_STORAGE_KEY) !== null ||
    Boolean(getCookieValue(ACCESS_TOKEN_COOKIE_KEY));

  if (!hasStoredSession) {
    return;
  }

  window.localStorage.removeItem(AUTH_SESSION_STORAGE_KEY);
  document.cookie = buildExpiredAccessTokenCookie();
  emitAuthSessionChange(reason);
}

export function getStoredAccessToken() {
  const session = getAuthSession();

  if (session?.accessToken) {
    return session.accessToken;
  }

  return getCookieValue(ACCESS_TOKEN_COOKIE_KEY);
}

export function getAccessTokenExpirationTime(accessToken?: string | null) {
  if (!accessToken) {
    return null;
  }

  const payload = decodeJwtPayload(accessToken);

  if (typeof payload?.exp !== 'number') {
    return null;
  }

  return payload.exp * 1000;
}

export function isAccessTokenExpired(accessToken?: string | null) {
  const expirationTime = getAccessTokenExpirationTime(accessToken);

  if (!expirationTime) {
    return false;
  }

  return expirationTime <= Date.now();
}

export function hasAuthSession() {
  const accessToken = getStoredAccessToken();

  if (!accessToken) {
    return false;
  }

  return !isAccessTokenExpired(accessToken);
}

export function subscribeAuthSessionChange(
  onChange: (reason: AuthSessionChangeReason) => void,
) {
  if (!isBrowser()) {
    return () => {};
  }

  const handleChange = (event: Event) => {
    const reason =
      event instanceof CustomEvent && typeof event.detail?.reason === 'string'
        ? (event.detail.reason as AuthSessionChangeReason)
        : 'manual';

    onChange(reason);
  };

  window.addEventListener(AUTH_SESSION_CHANGE_EVENT, handleChange);
  return () => {
    window.removeEventListener(AUTH_SESSION_CHANGE_EVENT, handleChange);
  };
}
