import Image from 'next/image';

import type { Post } from '@/app/(service)/boards/types';
import ic_best from '@/assets/icons/ic_best.svg';
import ic_heart_small from '@/assets/icons/ic_heart_small.svg';

export default function BoardBestCard({ post }: { post: Post }) {
  const likeCount = post.likeCount > 999 ? '999+' : post.likeCount.toString();

  return (
    <div className="p-5 bg-background-primary rounded-[20px]">
      <div className="flex items-center gap-1 bg-background-secondary rounded-full px-3 py-1.5 w-18 h-7.5">
        <Image
          src={ic_best}
          alt="베스트 게시글 따봉 모양 아이콘"
          width={18}
          height={18}
          className="bg-brand-primary"
        />
        <span className="text-brand-primary text-sm font-bold leading-4.25">
          인기
        </span>
      </div>
      <div className="flex flex-row items-center justify-between gap-3 mt-3 lg:mt-4">
        <div>
          <span className="text-text-primary text-base font-bold line-clamp-1 leading-4.75 lg:text-lg lg:leading-5.25">
            {post.title}
          </span>
          <p className="text-text-default text-sm font-normal leading-4.25 mt-1.5 line-clamp-2 lg:text-base lg:leading-5 lg:mt-2">
            {post.content}
          </p>
        </div>
        <div>
          {post.image && (
            <div className="relative w-12 h-12 rounded-lg overflow-hidden lg:w-15 lg:h-15">
              <Image
                src={post.image}
                alt={`${post.title} 게시글 이미지`}
                fill
                className="object-cover object-center"
              />
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between gap-2 mt-3 lg:mt-4.25 min-w-0">
        <div className="flex min-w-0 flex-1 items-center">
          <span className="text-text-primary text-xs font-medium leading-4 min-w-0 truncate lg:text-sm lg:leading-4.25">
            {post.writer.nickname}
          </span>
          <span className="text-text-primary text-xs font-medium leading-4 shrink-0 px-2 lg:text-sm lg:leading-4.25">
            |
          </span>
          <span className="text-interaction-inactive text-xs font-medium leading-4 shrink-0 lg:text-sm lg:leading-4.25">
            {post.createdAt}
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <Image
            src={ic_heart_small}
            alt="좋아요 모양 아이콘"
            width={16}
            height={16}
          />
          <span className="text-interaction-inactive text-xs font-medium leading-4 lg:text-sm lg:leading-4.25">
            {likeCount}
          </span>
        </div>
      </div>
    </div>
  );
}
