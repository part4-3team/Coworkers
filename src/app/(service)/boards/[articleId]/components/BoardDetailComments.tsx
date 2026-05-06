'use client';

import Image from 'next/image';

import BoardDetailCommentItem from '@/app/(service)/boards/[articleId]/components/BoardDetailCommentItem';
import { useSortedComments } from '@/app/(service)/boards/[articleId]/hooks/useSortedComments';
import type {
  Comment,
  CommentListResponse,
  UserProfileResponse,
} from '@/app/(service)/boards/[articleId]/types';
import { IcArrowUpCircle, IcUserXlarge } from '@/assets';

export default function BoardDetailComments({
  commentList,
  userProfile,
}: {
  commentList: CommentListResponse;
  userProfile: UserProfileResponse;
}) {
  const sortedComments = useSortedComments({
    comments: commentList.list,
    userId: userProfile.id,
  });

  return (
    <div className="pb-9.75 md:pb-13.5">
      <div>
        <div className="flex items-center gap-1">
          <p className="text-base font-bold text-text-primary md:text-lg">
            댓글
          </p>
          <p className="text-base font-bold text-brand-primary md:text-lg">
            {commentList.list.length}
          </p>
        </div>
        <div className="flex items-center gap-3 mt-3 md:mt-4 md:gap-4">
          <div className="overflow-hidden size-7 rounded-md bg-background-tertiary flex items-center justify-center md:size-8">
            {userProfile.image ? (
              <Image
                src={userProfile.image}
                width={28}
                height={28}
                alt={`${userProfile.nickname}의 프로필 이미지`}
                className="size-7 object-cover md:size-8"
              />
            ) : (
              <IcUserXlarge
                width={28}
                height={28}
                className="size-7 md:size-8"
                role="img"
                aria-label={`${userProfile.nickname}의 프로필 이미지`}
              />
            )}
          </div>
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="댓글을 달아주세요"
              className="w-full border-y border-background-tertiary p-3 text-sm font-normal 
              text-text-primary outline-none placeholder:text-text-default placeholder:text-sm md:text-base"
            />
            <button
              type="button"
              aria-label="댓글 등록"
              className="absolute right-3 bottom-3 flex h-6 w-6 items-center justify-center"
              onClick={() => {}}
            >
              <IcArrowUpCircle
                width={24}
                height={24}
                role="img"
                aria-label="댓글 등록"
              />
            </button>
          </div>
        </div>
      </div>
      <div>
        {commentList.list.length > 0 ? (
          <div className="mt-7 md:mt-9">
            <ul>
              {sortedComments.map((comment: Comment) => (
                <BoardDetailCommentItem
                  key={comment.id}
                  comment={comment}
                  userProfile={userProfile}
                />
              ))}
            </ul>
          </div>
        ) : (
          <div className="pt-5 border-t border-background-tertiary mt-7 md:mt-9">
            <p className="text-sm font-normal text-text-default text-center py-12.5 md:py-20 lg:py-12.5">
              아직 작성된 댓글이 없습니다.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
