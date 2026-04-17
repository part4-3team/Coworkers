/**
 * 프로젝트 전역에서 사용하는 에러 메시지를 정의하는 파일입니다.
 */

export const ERROR_MESSAGES = {
  EMAIL_REQUIRED: '이메일은 필수 입력입니다.',
  EMAIL_INVALID: '이메일 형식으로 작성해 주세요.',
  NAME_REQUIRED: '이름은 필수 입력입니다.',
  NAME_MAX_LENGTH: '이름은 최대 20자까지 가능합니다.',
  OAUTH_NAME_MAX_LENGTH: '이름은 최대 10자까지 가능합니다.',
  PASSWORD_REQUIRED: '비밀번호는 필수 입력입니다.',
  PASSWORD_MIN_LENGTH: '비밀번호는 최소 8자 이상입니다.',
  PASSWORD_ALLOWED_CHARS: '비밀번호는 숫자, 영문, 특수문자로만 가능합니다.',
  PASSWORD_CONFIRM_REQUIRED: '비밀번호 확인을 입력해주세요.',
  PASSWORD_MISMATCH: '비밀번호가 일치하지 않습니다.',
  LOGIN_FAILED: '이메일 혹은 비밀번호를 확인해주세요.',
  NAME_DUPLICATED: '이미 사용 중인 이름입니다.',
  TEAM_NAME_DUPLICATED: '이미 존재하는 이름입니다.',
} as const;
