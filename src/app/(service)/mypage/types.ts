import { z } from 'zod';

import { accountSchema } from '@/app/(service)/mypage/schemas/accountSchema';

export type AccountFormProps = {
  isDirty: boolean;
  onDirtyChange: (isDirty: boolean) => void;
  userInfo: UserInfo;
  onSubmitData: (data: Partial<Pick<UserInfo, 'nickname' | 'image'>>) => void;
  onSubmitError?: string | null;
};

export type AccountFormValues = z.infer<typeof accountSchema>;

export type UseAccountFormProps = {
  initialEmail: string;
  initialName: string;
  initialImage?: string | null;
  isDirty: boolean;
  onDirtyChange: (value: boolean) => void;
  onSubmitData: (data: Partial<Pick<UserInfo, 'nickname' | 'image'>>) => void;
};

export type UserInfo = {
  id: number;
  email: string;
  nickname: string;
  image?: string | null;
};
