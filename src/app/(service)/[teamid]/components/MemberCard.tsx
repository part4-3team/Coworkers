import { MemberCardProps } from '@/app/(service)/[teamid]/types';
import Image from 'next/image';
import { icMoreVerticalLarge } from '@/assets/index';

export default function MemberCard({
  name,
  email,
  userImage,
}: MemberCardProps) {
  return (
    <div className="flex gap-3 items-center">
      <div className="overflow-hidden w-8 h-8 rounded-lg">
        <Image
          src={userImage}
          width="32"
          height="32"
          alt={`${name}'s profile photo`}
          className="w-full h-fit object-cover"
        />
      </div>
      <div className="flex-1">
        <p className="font-semibold text-text-primary text-sm">{name}</p>
        <p className="font-normal text-text-secondary text-xs">{email}</p>
      </div>
      <button>
        <Image src={icMoreVerticalLarge} width="16" height="16" alt="" />
      </button>
    </div>
  );
}
