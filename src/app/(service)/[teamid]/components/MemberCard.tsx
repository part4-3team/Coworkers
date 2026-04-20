import { MemberCardProps } from '@/app/(service)/[teamid]/types';

export default function MemberCard({ name, email }: MemberCardProps) {
  return (
    <div>
      <span>{name}</span>
      {email && <span>{email}</span>}
    </div>
  );
}
