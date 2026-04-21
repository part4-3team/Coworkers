/**
 * 프로필 이미지와 팀 이미지 업로드 관련 API를 정의하는 파일입니다.
 */

import { apiClient, teamEndpoint } from '@/api/apiClient';

export type UploadImageResponse = {
  url: string;
};

export async function uploadImage(teamId: string, file: File, token?: string) {
  const body = new FormData();
  body.append('image', file);

  return apiClient<UploadImageResponse>(
    teamEndpoint('/images/upload', teamId),
    {
      body,
      method: 'POST',
      token,
    },
  );
}
