'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { useToast } from '@/components/common/toast';
import { ROUTES } from '@/constants/ROUTES';

export default function useBoardWrite(initialData?: {
  title: string;
  content: string;
  image?: string;
}) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    content: initialData?.content || '',
    image: initialData?.image || '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, title: e.target.value });
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setFormData({ ...formData, content: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.content.trim()) {
      showToast('제목과 내용을 모두 입력해주세요.', 'error');
      return;
    }

    try {
      setIsLoading(true);
      showToast('게시글이 성공적으로 등록되었습니다.', 'success');
      router.push(ROUTES.BOARDS);
    } catch (error) {
      showToast('등록 중 오류가 발생했습니다.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    isLoading,
    handleTitleChange,
    handleContentChange,
    handleSubmit,
  };
}
