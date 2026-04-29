/**
 * 여러 유저의 프로필 이미지를 겹쳐서 표시하는 아바타 스택 컴포넌트입니다.
 * 배열 앞쪽(왼쪽) 이미지가 겹침 영역에서 위에 보이도록 쌓습니다.
 */

import Image from 'next/image';

import type { AvatarStackProps } from '@/components/common/avatar/types';
import { cn } from '@/utils/cn';

export default function AvatarStack({ members, className }: AvatarStackProps) {
  return (
    <div
      className={cn(
        'flex h-7 w-18.75 flex-row items-center gap-1.5 rounded-lg border border-background-tertiary bg-background-primary py-1 pr-2 pl-1 md:h-8 md:w-21.75',
        className,
      )}
    >
      <div className="flex min-w-0 flex-1 flex-row items-center">
        {members.map((member, index) => (
          <Image
            key={member.userId}
            src={member.userImage}
            alt={member.userName}
            width={24}
            height={24}
            className="relative -ml-1.5 size-5 shrink-0 rounded-lg border border-background-inverse object-cover first:ml-0 md:-ml-2 md:size-6"
            style={{ zIndex: members.length - index }}
          />
        ))}
      </div>
      <p className="shrink-0 text-sm font-medium text-text-default">
        {members.length}
      </p>
    </div>
  );
}
