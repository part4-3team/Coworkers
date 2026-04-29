import { IcMoreVerticalGray, IcSettingsLarge } from '@/assets/index';

export const MOCK_MEMBERS = {
  members: [
    {
      role: 'ADMIN',
      userImage: '',
      userEmail: 'admin@test.com',
      userName: '김석진',
      groupId: 4002,
      userId: 1,
    },
    {
      role: 'MEMBER',
      userImage: '',
      userEmail: 'user1@test.com',
      userName: '김철수',
      groupId: 4002,
      userId: 2,
    },
    {
      role: 'MEMBER',
      userImage: '',
      userEmail: 'user2@test.com',
      userName: '이영희',
      groupId: 4002,
      userId: 3,
    },
  ],
};

export const TODOS = [
  { id: 1, label: '법인 설립 안내 드리기', status: false },
  { id: 2, label: '법인 설립 혹은 변경 등기 비용 안내 드리기', status: false },
  {
    id: 3,
    label: '입력해주신 정보를 바탕으로 등기신청서 제출하기',
    status: true,
  },
  { id: 4, label: '법인 설립 혹은 변경 등기 비용 안내 드리기', status: false },
  {
    id: 5,
    label: '입력해주신 정보를 바탕으로 등기신청서 제출하기',
    status: false,
  },
];

export const STATUS = ['시작 전', '진행 중', '완료'] as const;

export const SETTING_BUTTON = (
  <IcSettingsLarge width="24" height="24" role="img" aria-label="설정 아이콘" />
);

export const DROPDOWN_BUTTON = (
  <IcMoreVerticalGray
    width="24"
    height="24"
    role="img"
    aria-label="드롭다운 버튼"
  />
);
