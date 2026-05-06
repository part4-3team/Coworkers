'use client';

import { useEffect, useRef, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';

import { uploadImage } from '@/api/imageApi';
import { accountSchema } from '@/app/(service)/mypage/schemas/accountSchema';
import {
  AccountFormValues,
  UseAccountFormProps,
  UserInfo,
} from '@/app/(service)/mypage/types';
import { useToast } from '@/components/common/toast';

export function useAccountForm({
  initialEmail,
  initialName,
  initialImage,
  isDirty,
  onDirtyChange,
  onSubmitData,
}: UseAccountFormProps) {
  const { showToast, removeToast } = useToast();
  const toastIdRef = useRef<string | null>(null);
  const imageRef = useRef<string | null>(initialImage ?? null);
  const [imageResetKey, setImageResetKey] = useState(0);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<AccountFormValues>({
    resolver: zodResolver(accountSchema),
    mode: 'onChange',
    defaultValues: {
      name: initialName,
    },
  });

  useEffect(() => {
    if (isDirty) {
      return;
    }

    reset({ name: initialName });
  }, [initialName, isDirty, reset]);

  const name = useWatch({
    control,
    name: 'name',
  });

  const handleImageChange = async (file: File | null) => {
    if (file) {
      const { url } = await uploadImage(file);
      imageRef.current = url;
    } else {
      imageRef.current = null;
    }

    const changed = file !== null;

    if (changed && !isDirty) {
      toastIdRef.current = showToast(
        '저장하지 않은 변경사항이 있어요!',
        'error',
        {
          hideCloseButton: true,
          label: '변경사항 취소하기',
          textClassName: 'text-status-danger',
          onClick: () => {
            reset({ name: initialName });
            imageRef.current = initialImage ?? null;
            setImageResetKey((prev) => prev + 1);
            onDirtyChange(false);
          },
        },
      );
      onDirtyChange(true);
    }

    if (!changed && isDirty) {
      if (toastIdRef.current) removeToast(toastIdRef.current);
      onDirtyChange(false);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    register('name').onChange(e);

    const changed = e.target.value !== initialName;

    if (changed && !isDirty) {
      toastIdRef.current = showToast(
        '저장하지 않은 변경사항이 있어요!',
        'error',
        {
          hideCloseButton: true,
          label: '변경사항 취소하기',
          textClassName: 'text-status-danger',
          onClick: () => {
            reset({ name: initialName });
            onDirtyChange(false);
          },
        },
      );

      onDirtyChange(true);
    }

    if (!changed && isDirty) {
      if (toastIdRef.current) {
        removeToast(toastIdRef.current);
      }

      onDirtyChange(false);
    }
  };

  const onSubmit = (data: AccountFormValues) => {
    const payload: Partial<Pick<UserInfo, 'nickname' | 'image'>> = {};

    if (data.name !== initialName) {
      payload.nickname = data.name;
    }

    if (imageRef.current !== initialImage) {
      payload.image = imageRef.current ?? undefined;
    }

    onSubmitData(payload);

    if (toastIdRef.current) removeToast(toastIdRef.current);
    onDirtyChange(false);
  };

  return {
    email: initialEmail,
    name,
    errors,
    register,
    handleSubmit,
    handleNameChange,
    handleImageChange,
    onSubmit,
    imageResetKey,
  };
}
