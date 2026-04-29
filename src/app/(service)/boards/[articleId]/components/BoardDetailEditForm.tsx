'use client';

import Image from 'next/image';

import useBoardWrite from '@/app/(service)/boards/hooks/useBoardWrite';
import { Post } from '@/app/(service)/boards/types';
import { icCloseLarge, icPlusBoard, icStarRed } from '@/assets';
import Button from '@/components/common/button/components/Button';
import { ContentTextarea, TitleInput } from '@/components/common/form';
import { cn } from '@/utils/cn';

export default function BoardDetailEditForm({
  boardDetail,
}: {
  boardDetail: Post;
}) {
  const {
    formData,
    isLoading,
    handleTitleChange,
    handleContentChange,
    handleSubmit,
  } = useBoardWrite({
    title: boardDetail.title,
    content: boardDetail.content,
    image: boardDetail.image,
  });
  const hasImage = !!boardDetail.image;

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h2 className="text-text-primary text-xl font-bold leading-6">
          게시글 수정
        </h2>
        <div className="mt-8 md:mt-10">
          <div>
            <div className="flex items-center gap-1 md:gap-1.5">
              <span className="block text-text-primary text-sm font-bold md:text-base">
                제목
              </span>
              <Image src={icStarRed} alt="필수 입력" width={8} height={8} />
            </div>
            <TitleInput
              id="title"
              placeholder="제목을 입력해주세요."
              className="mt-2.25 md:mt-3"
              value={formData.title}
              onChange={handleTitleChange}
            />
          </div>
          <div className="mt-6 md:mt-8">
            <div className="flex items-center gap-1 md:gap-1.5">
              <span className="block text-text-primary text-sm font-bold md:text-base">
                내용
              </span>
              <Image src={icStarRed} alt="필수 입력" width={8} height={8} />
            </div>
            <ContentTextarea
              id="content"
              placeholder="내용을 입력하세요"
              className="mt-2 h-50 md:mt-3 md:h-60"
              value={formData.content}
              onChange={handleContentChange}
            />
          </div>
          <div className="mt-6 md:mt-8">
            <span className="block text-text-primary text-sm font-bold md:text-base">
              이미지
            </span>
            <div className="flex gap-3">
              {hasImage && (
                <div className="relative">
                  <div className="mt-2 w-20 h-20 rounded-xl flex justify-center items-center overflow-hidden md:mt-3 md:w-30 md:h-30">
                    <Image
                      src={boardDetail.image as string}
                      alt="게시글 이미지"
                      width={80}
                      height={80}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <button
                    type="button"
                    className="absolute top-1 -right-2 w-6 h-6 z-10 bg-background-primary rounded-full 
                    border border-border-secondary flex justify-center items-center cursor-pointer"
                  >
                    <Image
                      src={icCloseLarge}
                      alt="게시글 이미지 삭제"
                      width={18}
                      height={18}
                      className="w-4.5 h-4.5 fill-icon-primary"
                    />
                  </button>
                </div>
              )}
              <button
                type="button"
                className="mt-2 w-20 h-20 border border-background-tertiary rounded-xl flex justify-center items-center md:mt-3 md:w-30 md:h-30"
                disabled={hasImage}
              >
                <Image
                  src={icPlusBoard}
                  alt="게시글 이미지 추가"
                  width={20}
                  height={20}
                  className="w-5 h-5 fill-background-tertiary flex justify-center items-center md:w-7.5 md:h-7.5"
                />
              </button>
            </div>
          </div>
          <div className="mt-12 md:mt-14.25">
            <Button
              className={cn(
                'bg-brand-primary text-text-inverse hover:bg-interaction-hover',
                'font-semibold text-base leading-4.75',
                'w-full h-12 py-3.5 rounded-xl',
              )}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? '수정 중...' : '수정하기'}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
