/**
 * 마이 히스토리 페이지의 목데이터와 필터 값을 정의하는 파일입니다.
 */

import type {
  MyHistoryDateSection,
  MyHistoryFilter,
  MyHistorySummaryItem,
  MyHistoryTask,
} from '@/app/(service)/myhistory/types';

const DEFAULT_TASK = {
  commentCount: 3,
  dueDate: '2024년 7월 29일',
  frequency: '매일 반복',
  title: '법인 설립 안내 드리기',
} as const;

const createTasks = (prefix: string, count: number): MyHistoryTask[] =>
  Array.from({ length: count }, (_, index) => ({
    ...DEFAULT_TASK,
    id: `${prefix}-${index + 1}`,
  }));

const createSummaryDetails = (
  prefix: string,
  items: readonly { countText: string; title: string }[],
) =>
  items.map((item, index) => ({
    ...item,
    id: `${prefix}-${index + 1}`,
  }));

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
    date: '2025년 5월 21일 (목)',
    groups: [
      {
        id: 'may-21-company-registration',
        tasks: createTasks('may-21-company-registration', 3),
        teamName: '경영관리팀',
        title: '법인 등기',
      },
      {
        id: 'may-21-change-registration',
        tasks: createTasks('may-21-change-registration', 2),
        teamName: '프로덕트팀',
        title: '변경 등기',
      },
    ],
    id: 'may-21',
  },
  {
    date: '2025년 5월 22일 (금)',
    groups: [
      {
        id: 'may-22-company-registration',
        tasks: createTasks('may-22-company-registration', 3),
        teamName: '경영관리팀',
        title: '법인 등기',
      },
      {
        id: 'may-22-change-registration',
        tasks: createTasks('may-22-change-registration', 2),
        teamName: '프로덕트팀',
        title: '변경 등기',
      },
    ],
    id: 'may-22',
  },
] as const satisfies readonly MyHistoryDateSection[];
