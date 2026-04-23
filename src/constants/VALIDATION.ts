/**
 * 인증/회원가입 폼에서 사용하는 유효성 검사 기준을 정의하는 파일입니다.
 */

export const AUTH_FORM_VALIDATION_RULES = {
  OAUTH_SIGN_UP_NAME_MAX_LENGTH: 10,
  USER_NAME_MAX_LENGTH: 20,
  USER_PASSWORD_ALLOWED_CHARACTERS_REGEX: /^[a-zA-Z0-9!@#$%^&*]+$/,
  USER_PASSWORD_MIN_LENGTH: 8,
} as const;
