import Image from 'next/image';
import { MemberChipsProps } from '../types';

export default function MemberChip({
  members,
}: {
  members: MemberChipsProps[];
}) {
  return (
    <div className="border-background-tertiary border rounded-lg flex gap-2 h-8 px-2 justify-center items-center pl-3 ">
      <div className="flex flex-row ">
        {members.map((member) => (
          <Image
            key={member.userId}
            src={member.userImage}
            alt={member.userName}
            className="w-6 h-6 rounded-lg -ml-2 object-cover border border-background-inverse"
            width="24"
            height="24"
          />
        ))}
      </div>
      <p className="text-text-default text-[13px] font-medium">
        {members.length}
      </p>
    </div>
  );
}
