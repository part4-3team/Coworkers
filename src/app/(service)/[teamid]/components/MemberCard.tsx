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
      <div className="overflow-hidden w-9 h-9 rounded-xl bg-background-tertiary">
        <Image
          src={userImage || icUserXlarge}
          width={36}
          height={36}
          alt={`${name}'s profile photo`}
          className={userImage ? 'w-full h-full object-cover' : 'w-6 h-6'}
        />
      </div>
      <div className="flex-1">
        <p className="font-semibold text-text-primary text-base text-left">
          {name}
        </p>
        <p className="font-normal text-text-secondary text-sm text-left">
          {email}
        </p>
      </div>
      <button onClick={onClick}>
        <Image src={icMoreVerticalLarge} width="16" height="16" alt="" />
      </button>
    </div>
  );
}
