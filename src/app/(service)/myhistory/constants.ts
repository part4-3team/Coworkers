/**
 * 마이 히스토리 페이지 전반에서 사용하는 상수와 목업 데이터를 정의합니다.
 */

import type {
  MyHistoryDateSection,
  MyHistoryFilter,
  MyHistorySummaryItem,
  MyHistoryTask,
} from '@/app/(service)/myhistory/types';
import type { RightPanelComment } from '@/components/common/rightPanel/types';

const DEFAULT_TASK = {
  commentCount: 3,
  frequency: '매일 반복',
  title: '법인 설립 안내 드리기',
} as const;

const TODAY = new Date();

function formatDateKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function createRelativeDateKey(monthOffset: number, day: number) {
  return formatDateKey(
    new Date(TODAY.getFullYear(), TODAY.getMonth() + monthOffset, day),
  );
}

function formatTaskDueDate(dateKey: string) {
  const [year, month, day] = dateKey.split('-').map(Number);

  return `${year}년 ${month}월 ${day}일`;
}

const createTasks = (
  prefix: string,
  count: number,
  dateKey: string,
): MyHistoryTask[] =>
  Array.from({ length: count }, (_, index) => ({
    ...DEFAULT_TASK,
    dueDate: formatTaskDueDate(dateKey),
    id: `${prefix}-${index + 1}`,
  }));

const createGroup = (
  dateKey: string,
  prefix: string,
  title: string,
  teamName: string,
  taskCount: number,
) => ({
  id: prefix,
  tasks: createTasks(prefix, taskCount, dateKey),
  teamName,
  title,
});

const createSummaryDetails = (
  prefix: string,
  items: readonly { countText: string; title: string }[],
) =>
  items.map((item, index) => ({
    ...item,
    id: `${prefix}-${index + 1}`,
  }));

export const EMPTY_HISTORY_FILTER_ID = 'product';

export const MY_HISTORY_DETAIL_ASSIGNEE = '안해나';

export const MY_HISTORY_DETAIL_DESCRIPTION =
  '필수 정보 10분 입력하면 3일 안에 빈 법인 설립이 완료되는 법인 설립 서비스의 장점에 대해 상세하게 설명드리기';

export const MY_HISTORY_DETAIL_STARTED_AT = '2024년 7월 29일 오후 3:30';

export const MY_HISTORY_DETAIL_COMMENTS = [
  {
    author: '김다혜',
    content: '혹시 관련해서 미팅 오늘 중으로 가능하신가요?',
    id: 'history-comment-1',
    meta: '1일전',
  },
  {
    author: '이연지',
    content:
      '법인 설립 비용 관련해서 해당 레퍼런스도 체크해보면 좋을 것 같아요\nhttps://www.codeit.kr',
    id: 'history-comment-2',
    meta: '2024. 07. 25',
  },
] as const satisfies readonly RightPanelComment[];

export const MY_HISTORY_FILTERS = [
  { count: 3, id: 'management', label: '경영 관리팀' },
  { count: 20, id: 'product', label: '프로덕트 팀' },
  { count: 8, id: 'marketing', label: '마케팅 팀' },
  { count: 5, id: 'contents', label: '콘텐츠 팀' },
  { count: 11, id: 'design', label: '디자인 팀' },
  { count: 6, id: 'operations', label: '운영 지원팀' },
  { count: 9, id: 'business', label: '사업 개발팀' },
  { count: 14, id: 'finance', label: '재무 회계팀' },
] as const satisfies readonly MyHistoryFilter[];

export const MY_HISTORY_SUMMARY_ITEMS = [
  {
    countText: '3개',
    details: createSummaryDetails('management', [
      { countText: '3/5', title: '변경 등기' },
      { countText: '3/5', title: '법인 등기' },
      { countText: '2/5', title: '서류 검토' },
    ]),
    id: 'management',
    title: '경영 관리팀',
  },
  {
    countText: '20개',
    details: createSummaryDetails('product', [
      { countText: '8/20', title: '기획 검토' },
      { countText: '7/20', title: '기능 설계' },
      { countText: '5/20', title: 'QA 대응' },
    ]),
    id: 'product',
    title: '프로덕트 팀',
  },
  {
    countText: '8개',
    details: createSummaryDetails('marketing', [
      { countText: '3/8', title: '콘텐츠 검수' },
      { countText: '2/8', title: '캠페인 정리' },
      { countText: '3/8', title: '성과 리포트' },
    ]),
    id: 'marketing',
    title: '마케팅 팀',
  },
  {
    countText: '5개',
    details: createSummaryDetails('contents', [
      { countText: '2/5', title: '카피 초안' },
      { countText: '1/5', title: '콘텐츠 배포' },
      { countText: '2/5', title: '수정 반영' },
    ]),
    id: 'contents',
    title: '콘텐츠 팀',
  },
  {
    countText: '11개',
    details: createSummaryDetails('design', [
      { countText: '4/11', title: '배너 디자인' },
      { countText: '4/11', title: '썸네일 제작' },
      { countText: '3/11', title: '스타일 정리' },
    ]),
    id: 'design',
    title: '디자인 팀',
  },
  {
    countText: '6개',
    details: createSummaryDetails('operations', [
      { countText: '2/6', title: '운영 정책' },
      { countText: '2/6', title: '문의 대응' },
      { countText: '2/6', title: '운영 정리' },
    ]),
    id: 'operations',
    title: '운영 지원팀',
  },
  {
    countText: '9개',
    details: createSummaryDetails('business', [
      { countText: '3/9', title: '제안서 작성' },
      { countText: '3/9', title: '미팅 정리' },
      { countText: '3/9', title: '계약 검토' },
    ]),
    id: 'business',
    title: '사업 개발팀',
  },
  {
    countText: '14개',
    details: createSummaryDetails('finance', [
      { countText: '5/14', title: '정산 확인' },
      { countText: '4/14', title: '비용 검토' },
      { countText: '5/14', title: '회계 마감' },
    ]),
    id: 'finance',
    title: '재무 회계팀',
  },
] as const satisfies readonly MyHistorySummaryItem[];

export const MY_HISTORY_SECTIONS = [
  {
    date: createRelativeDateKey(0, 10),
    groups: [
      createGroup(
        createRelativeDateKey(0, 10),
        'current-company-registration-10',
        '법인 등기',
        '경영관리팀',
        3,
      ),
      createGroup(
        createRelativeDateKey(0, 10),
        'current-change-registration-10',
        '변경 등기',
        '프로덕트팀',
        2,
      ),
    ],
    id: 'current-10',
  },
  {
    date: createRelativeDateKey(0, 12),
    groups: [
      createGroup(
        createRelativeDateKey(0, 12),
        'current-company-registration-12',
        '법인 설립',
        '경영관리팀',
        2,
      ),
      createGroup(
        createRelativeDateKey(0, 12),
        'current-doc-review-12',
        '서류 검토',
        '마케팅팀',
        1,
      ),
    ],
    id: 'current-12',
  },
  {
    date: createRelativeDateKey(0, 15),
    groups: [
      createGroup(
        createRelativeDateKey(0, 15),
        'current-company-registration-15',
        '법인 등기',
        '경영관리팀',
        3,
      ),
      createGroup(
        createRelativeDateKey(0, 15),
        'current-content-review-15',
        '콘텐츠 검수',
        '콘텐츠팀',
        2,
      ),
    ],
    id: 'current-15',
  },
  {
    date: createRelativeDateKey(0, 21),
    groups: [
      createGroup(
        createRelativeDateKey(0, 21),
        'current-meeting-summary-21',
        '미팅 정리',
        '사업 개발팀',
        2,
      ),
      createGroup(
        createRelativeDateKey(0, 21),
        'current-finance-review-21',
        '비용 검토',
        '재무 회계팀',
        2,
      ),
    ],
    id: 'current-21',
  },
  {
    date: createRelativeDateKey(1, 2),
    groups: [
      createGroup(
        createRelativeDateKey(1, 2),
        'next-service-guide-02',
        '서비스 안내',
        '경영관리팀',
        2,
      ),
      createGroup(
        createRelativeDateKey(1, 2),
        'next-feature-design-02',
        '기능 설계',
        '프로덕트팀',
        2,
      ),
    ],
    id: 'next-02',
  },
  {
    date: createRelativeDateKey(1, 8),
    groups: [
      createGroup(
        createRelativeDateKey(1, 8),
        'next-campaign-report-08',
        '캠페인 정리',
        '마케팅팀',
        3,
      ),
    ],
    id: 'next-08',
  },
  {
    date: createRelativeDateKey(1, 15),
    groups: [
      createGroup(
        createRelativeDateKey(1, 15),
        'next-banner-design-15',
        '배너 디자인',
        '디자인 팀',
        2,
      ),
      createGroup(
        createRelativeDateKey(1, 15),
        'next-operation-policy-15',
        '운영 정책',
        '운영 지원팀',
        2,
      ),
    ],
    id: 'next-15',
  },
  {
    date: createRelativeDateKey(1, 22),
    groups: [
      createGroup(
        createRelativeDateKey(1, 22),
        'next-contract-review-22',
        '계약 검토',
        '사업 개발팀',
        3,
      ),
      createGroup(
        createRelativeDateKey(1, 22),
        'next-account-closing-22',
        '회계 마감',
        '재무 회계팀',
        2,
      ),
    ],
    id: 'next-22',
  },
] as const satisfies readonly MyHistoryDateSection[];
