import Image from 'next/image';

import { IcUserXlarge } from '@/assets';
import { cn } from '@/utils/cn';

type CommentWriterAvatarProps = {
  image: string | null;
  nickname: string;
  width?: number;
  height?: number;
  containerClassName?: string;
  imageClassName?: string;
  iconClassName?: string;
};

export default function CommentWriterAvatar({
  image,
  nickname,
  width = 28,
  height = 28,
  containerClassName,
  imageClassName,
  iconClassName,
}: CommentWriterAvatarProps) {
  return (
    <div
      className={cn(
        'flex h-7 w-7 shrink-0 overflow-hidden rounded-lg bg-background-tertiary md:h-9 md:w-9',
        containerClassName,
      )}
    >
      {image ? (
        <Image
          src={image}
          alt={nickname}
          width={width}
          height={height}
          className={cn('size-7 object-cover md:size-9', imageClassName)}
        />
      ) : (
        <IcUserXlarge
          width={width}
          height={height}
          className={cn('size-7 object-cover md:size-9', iconClassName)}
          role="img"
          aria-label={`${nickname}의 프로필 이미지`}
        />
      )}
    </div>
  );
}
