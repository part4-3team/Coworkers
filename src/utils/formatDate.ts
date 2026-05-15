/**
 * 화면 표시용 날짜 포맷 변환 유틸 함수 파일입니다.
 */

const KST_TIME_FORMAT = new Intl.DateTimeFormat('en-CA', {
  hour: '2-digit',
  hour12: false,
  minute: '2-digit',
  timeZone: 'Asia/Seoul',
});

// YYYY-MM-DD 형식의 날짜 전용 문자열은 시각 없음으로 판단
const DATE_ONLY_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

export function formatKSTTime(dateString?: string): string | null {
  if (!dateString || DATE_ONLY_PATTERN.test(dateString)) return null;
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return null;
  return KST_TIME_FORMAT.format(date);
}
