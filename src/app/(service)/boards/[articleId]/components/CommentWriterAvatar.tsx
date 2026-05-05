import Image from 'next/image';

import { IcUserXlarge } from '@/assets';

type CommentWriterAvatarProps = {
  image: string | null;
  nickname: string;
};

export default function CommentWriterAvatar({
  image,
  nickname,
}: CommentWriterAvatarProps) {
  return (
    <div className="flex h-7 w-7 shrink-0 overflow-hidden rounded-lg bg-background-tertiary md:h-9 md:w-9">
      {image ? (
        <Image
          src={image}
          alt={nickname}
          width={28}
          height={28}
          className="size-7 object-cover md:size-9"
        />
      ) : (
        <IcUserXlarge
          width={28}
          height={28}
          className="size-7 object-cover md:size-9"
          role="img"
          aria-label={`${nickname}의 프로필 이미지`}
        />
      )}
    </div>
  );
}
