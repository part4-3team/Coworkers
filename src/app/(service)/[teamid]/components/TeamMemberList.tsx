// member/TeamMemberList.tsx
import MemberCard from './MemberCard';
import { MOCK_MEMBERS } from '../constants';
import { MemberChipsProps } from '../types';
export default function TeamMemberList() {
  return (
    <section className="hidden xl:flex w-60 bg-background-inverse mt-11 px-5 py-6 rounded-2xl border border-border-secondary shrink-0 flex-col gap-4 ">
      <div className="flex justify-between items-center">
        <h2 className="text-text-primary text-base font-medium">
          멤버{' '}
          <span className="text-text-default font-normal">
            ({MOCK_MEMBERS.members.length}명)
          </span>
        </h2>
        <button className="text-brand-primary font-semibold text-sm">
          초대하기 +
        </button>
      </div>
      <div className="flex flex-col gap-4.5">
        {MOCK_MEMBERS.members.map((items: MemberChipsProps) => (
          <MemberCard
            key={items.userEmail}
            userImage={items.userImage}
            name={items.userName}
            email={items.userEmail}
          />
        ))}
      </div>
    </section>
  );
}
