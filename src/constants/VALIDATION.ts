/**
 * 프로젝트 전역에서 사용하는 유효성 검사 기준을 정의하는 파일입니다.
 */

export const VALIDATION = {
  NAME_MAX_LENGTH: 20,
  OAUTH_NAME_MAX_LENGTH: 10,
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_ALLOWED_CHARS_REGEX: /^[a-zA-Z0-9!@#$%^&*]+$/,
} as const;
