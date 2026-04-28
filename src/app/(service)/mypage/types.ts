import { z } from 'zod';

import { accountSchema } from '@/app/(service)/signup/schemas/accountSchema';

export type AccountFormProps = {
  isDirty: boolean;
  onDirtyChange: (isDirty: boolean) => void;
};

export type AccountFormValues = z.infer<typeof accountSchema>;

export type UseAccountFormProps = {
  initialName: string;
  isDirty: boolean;
  onDirtyChange: (value: boolean) => void;
};
