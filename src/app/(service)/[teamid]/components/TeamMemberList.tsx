// member/TeamMemberList.tsx
import MemberCard from './MemberCard';

export default function TeamMemberList() {
  return (
    <section>
      <h2>멤버</h2>
      <MemberCard name="우지은" email="ss@codeit.co.kr" />
      {/* members.map */}
    </section>
  );
}
