import Image from 'next/image';

import { MemberCardProps } from '@/app/(service)/[teamid]/types';
import { icMoreVerticalLarge, icUserXlarge } from '@/assets/index';

export default function MemberCard({
  name,
  email,
  userImage,
  onClick,
}: MemberCardProps) {
  return (
    <div className="flex gap-3 items-center cursor-default">
      <div className="overflow-hidden w-8 h-8 rounded-lg bg-background-tertiary">
        <Image
          src={userImage || icUserXlarge}
          width={userImage ? 32 : 24}
          height={userImage ? 32 : 24}
          alt={`${name}'s profile photo`}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1">
        <p className="font-semibold text-text-primary text-sm text-left">
          {name}
        </p>
        <p className="font-normal text-text-secondary text-xs text-left">
          {email}
        </p>
      </div>
      <button onClick={onClick}>
        <Image src={icMoreVerticalLarge} width="16" height="16" alt="" />
      </button>
    </div>
  );
}
