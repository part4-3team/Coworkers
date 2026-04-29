import Image from 'next/image';

import { MemberChipsProps } from '@/app/(service)/[teamid]/types';
import { icUserXlarge } from '@/assets/index';

export default function MemberChip({
  members,
}: {
  members: MemberChipsProps[];
}) {
  return (
    <div className="border-background-tertiary border rounded-lg flex gap-2 h-8 pr-2 pl-3 justify-center items-center  ">
      <div className="flex flex-row ">
        {members.map((member) => (
          <Image
            key={member.userId}
            src={member.userImage || icUserXlarge}
            alt={member.userName}
            className="w-6 h-6 rounded-lg -ml-2 object-cover border border-background-inverse bg-background-tertiary"
            width="24"
            height="24"
          />
        ))}
      </div>
      <p className="text-text-default text-sm font-medium">{members.length}</p>
    </div>
  );
}
