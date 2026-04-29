'use client';

import Image from 'next/image';

import BoardDetailCommentItem from '@/app/(service)/boards/[articleId]/components/BoardDetailCommentItem';
import type {
  Comment,
  CommentListResponse,
  UserProfileResponse,
} from '@/app/(service)/boards/[articleId]/types';
import { IcArrowUpCircle, IcUserLarge } from '@/assets';

export default function BoardDetailComments({
  commentList,
  userProfile,
}: {
  commentList: CommentListResponse;
  userProfile: UserProfileResponse;
}) {
  return (
    <div>
      <div className="flex items-center gap-1">
        <p className="text-base font-bold text-text-primary md:text-lg">댓글</p>
        <span className="text-base font-bold text-brand-primary md:text-lg">
          {commentList.list.length}
        </span>
      </div>
      <div className="flex items-center gap-3 mt-3 md:mt-4 md:gap-4">
        <div className="flex shrink-0 overflow-hidden rounded-lg w-7 h-7 md:w-9 md:h-9">
          {userProfile.image ? (
            <Image
              src={userProfile.image}
              alt="댓글 작성자 프로필 이미지"
              width={28}
              height={28}
              className="object-cover w-full h-full"
            />
          ) : (
            <IcUserLarge
              width={28}
              height={28}
              className="w-full h-full"
              role="img"
              aria-label="댓글 작성자 프로필 이미지"
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
      {commentList.list.length > 0 ? (
        <div className="mt-7 md:mt-9">
          <ul>
            {commentList.list.map((comment: Comment) => (
              <BoardDetailCommentItem key={comment.id} comment={comment} />
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
  );
}
