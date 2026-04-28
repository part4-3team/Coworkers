/**
 * 게시글 상세 페이지를 구성하는 파일입니다.
 */

import BoardDetailComments from '@/app/(service)/boards/[articleId]/components/BoardDetailComments';
import BoardDetailContent from '@/app/(service)/boards/[articleId]/components/BoardDetailContent';
import BoardDetailEditForm from '@/app/(service)/boards/[articleId]/components/BoardDetailEditForm';
import BoardDetailHeader from '@/app/(service)/boards/[articleId]/components/BoardDetailHeader';
import { MOCK_COMMENT_LIST } from '@/app/(service)/boards/[articleId]/constants';
import type {
  BoardDetailParams,
  UserProfileResponse,
} from '@/app/(service)/boards/[articleId]/types';
import { MOCK_BOARD_POSTS } from '@/app/(service)/boards/constants';
import { Post } from '@/app/(service)/boards/types';

export default async function BoardDetailPage({
  params,
  searchParams,
}: {
  params: Promise<BoardDetailParams>;
  searchParams: Promise<{ edit?: string }>;
}) {
  const { articleId } = await params;
  const { edit } = await searchParams;

  const isEditMode = edit === 'true';

  const allPosts = MOCK_BOARD_POSTS as unknown as (Post &
    UserProfileResponse)[];
  const boardDetail = allPosts.find(
    (post) => post.id.toString() === articleId,
  ) as Post;
  const userProfile = allPosts.find(
    (post) => post.id === boardDetail.writer.id,
  ) as UserProfileResponse;

  return (
    <div className="max-w-225 items-center bg-background-primary rounded-[20px] mx-4 mt-4 mb-8.25 md:mx-6.5 md:mt-17 md:mb-19 xl:mx-46 xl:my-19">
      <div className="px-5.5 py-9.75 md:px-10 md:py-13.5 lg:px-15">
        {isEditMode ? (
          <BoardDetailEditForm boardDetail={boardDetail} />
        ) : (
          <div>
            <BoardDetailHeader
              boardDetail={boardDetail}
              userProfile={userProfile}
            />
            <BoardDetailContent
              boardDetail={boardDetail}
              userProfile={userProfile}
            />
            <BoardDetailComments commentList={MOCK_COMMENT_LIST} />
          </div>
        )}
      </div>
    </div>
  );
}
