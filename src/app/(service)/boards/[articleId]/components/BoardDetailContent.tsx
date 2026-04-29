import Image from 'next/image';

import type { BoardDetailProps } from '@/app/(service)/boards/[articleId]/types';

export default function BoardDetailContent({ boardDetail }: BoardDetailProps) {
  return (
    <div className="py-4 md:py-7 lg:pb-10">
      <p className="text-sm font-regular leading-5.5 text-text-primary md:text-base md:leading-6">
        {boardDetail.content}
      </p>
      <div className="w-35 h-35 mt-5 md:mt-6 md:w-50 md:h-50 rounded-xl overflow-hidden">
        {boardDetail.image && (
          <Image
            src={boardDetail.image}
            alt={`${boardDetail.title} 게시글 이미지`}
            width={140}
            height={140}
            className="object-cover object-center w-full h-full"
          />
        )}
      </div>
    </div>
  );
}
