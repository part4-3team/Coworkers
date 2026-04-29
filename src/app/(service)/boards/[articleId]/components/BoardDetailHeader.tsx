'use client';

import { useBoardDetailMenu } from '@/app/(service)/boards/[articleId]/hooks/useBoardDetailMenu';
import { useLike } from '@/app/(service)/boards/[articleId]/hooks/useLike';
import type { BoardDetailProps } from '@/app/(service)/boards/[articleId]/types';
import { IcHeartFilledRed, IcHeartSmall, IcMoreVerticalLarge } from '@/assets';
import { Avatar } from '@/components/common/avatar';
import { ListDropdown } from '@/components/common/dropdown';
import Modal from '@/components/common/modal';

export default function BoardDetailHeader({
  boardDetail,
  userProfile,
}: BoardDetailProps) {
  const { menuItems, isDeleteModalOpen, handleDeleteConfirm } =
    useBoardDetailMenu(boardDetail.id.toString());
  const { isLiked, likeCount, handleLikeClick } = useLike({
    boardDetail,
    userProfile,
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="flex-1 truncate text-text-primary font-bold text-lg leading-5.25 md:text-xl md:leading-6">
          {boardDetail.title}
        </h2>
        <ListDropdown
          trigger={
            <IcMoreVerticalLarge
              width={24}
              height={24}
              className="cursor-pointer"
              role="img"
              aria-label="더보기 메뉴"
            />
          }
          items={menuItems}
        />
        {isDeleteModalOpen && (
          <Modal
            onClose={handleDeleteConfirm}
            title="게시글을 삭제하시겠습니까?"
            description="게시글 정보가 삭제됩니다."
            lineButtonText="닫기"
            onLineButtonClick={handleDeleteConfirm}
            subButtonText="삭제"
            onSubButtonClick={handleDeleteConfirm}
          />
        )}
      </div>
      <div className="flex items-center justify-between gap-2 mt-2 pb-3 border-b border-border-secondary md:mt-4">
        <div className="flex min-w-0 flex-1 items-center">
          <Avatar
            src={userProfile.image}
            alt={boardDetail.writer.nickname}
            size={24}
            className="mr-2"
          />
          <span className="text-text-primary text-sm font-medium leading-4 min-w-0 truncate md:text-base">
            {boardDetail.writer.nickname}
          </span>
          <span className="text-text-secondary text-sm font-medium leading-4 shrink-0 px-2 md:text-base">
            |
          </span>
          <span className="text-interaction-inactive text-sm font-medium leading-4 shrink-0 md:text-base">
            {boardDetail.createdAt}
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            className="flex items-center gap-1 cursor-pointer"
            onClick={handleLikeClick}
          >
            {isLiked ? (
              <IcHeartFilledRed
                width={16}
                height={16}
                className="w-4 h-4 md:w-6 md:h-6"
                role="img"
                aria-label="좋아요 모양 아이콘"
              />
            ) : (
              <IcHeartSmall
                width={16}
                height={16}
                className="w-4 h-4 md:w-6 md:h-6"
                role="img"
                aria-label="좋아요 모양 아이콘"
              />
            )}
            <span className="text-interaction-inactive text-sm font-medium leading-4 md:text-base">
              {likeCount}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
