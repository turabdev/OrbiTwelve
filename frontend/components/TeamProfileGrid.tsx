"use client";

import ProfileCard from "@/components/ProfileCard";

interface TeamMemberData {
  _id: string;
  name: string;
  role: string;
  photo: string;
  bio: string;
  order: number;
}

interface TeamProfileGridProps {
  team: TeamMemberData[];
}

export default function TeamProfileGrid({ team }: TeamProfileGridProps) {
  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 py-20 md:grid-cols-2">
      {team.map((member) => (
        <ProfileCard
          key={member._id}
          avatarUrl={member.photo || "/placeholder-avatar.png"}
          name={member.name}
          title={member.role}
          handle={member.name.toLowerCase().replace(/\s+/g, "")}
          status="Online"
        />
      ))}
    </div>
  );
}