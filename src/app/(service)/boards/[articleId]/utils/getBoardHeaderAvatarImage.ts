/**
 * 헤더 아바타는 게시글에 포함된 작성자 이미지(`writer.image`)만 사용합니다. `isOwner`는 메뉴 권한용입니다.
 */
type GetBoardHeaderAvatarImageParams = {
  currentUserId?: number;
  writerId: number;
  writerImage?: string | null;
};

export function getBoardHeaderAvatarImage({
  currentUserId,
  writerId,
  writerImage,
}: GetBoardHeaderAvatarImageParams) {
  const isOwner = writerId === currentUserId;
  const trimmedWriter = writerImage?.trim() ?? '';

  return {
    headerAvatarImage: trimmedWriter.length > 0 ? trimmedWriter : null,
    isOwner,
  };
}
