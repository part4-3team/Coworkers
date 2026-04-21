/**
 * 프로필 이미지와 팀 이미지 업로드를 담당하는 훅 파일입니다.
 */

'use client';

import { useMutation } from '@tanstack/react-query';

import { uploadImage } from '@/api/imageApi';
import { queryKeys } from '@/api/queryKeys';

type UploadImageVariables = {
  file: File;
  teamId: string;
  token?: string;
};

export function useUploadImage() {
  return useMutation({
    mutationFn: ({ file, teamId, token }: UploadImageVariables) =>
      uploadImage(teamId, file, token),
    mutationKey: queryKeys.image.upload(),
  });
}
