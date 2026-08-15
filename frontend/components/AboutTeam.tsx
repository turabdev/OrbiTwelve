import type { TeamMember } from "@/types/about";

export default function AboutTeam({ team }: { team: TeamMember[] }) {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <p className="text-center text-xs uppercase tracking-[0.18em] text-dark-panel/50">
          Leadership
        </p>
        <h2 className="mt-3 text-balance text-center text-3xl font-medium tracking-tight md:text-5xl">
          Who's behind it
        </h2>

        <div className="mx-auto mt-14 grid max-w-3xl gap-6 sm:grid-cols-2">
          {team.map((member, i) => (
            <div
              key={i}
              className="rounded-3xl bg-(--color-dark-panel) p-8 text-background"
            >
              <div className="grid h-14 w-14 place-items-center rounded-full bg-background/10 text-lg font-semibold">
                {member.name.charAt(0)}
              </div>
              <h3 className="mt-5 text-xl font-medium tracking-tight">{member.name}</h3>
              <p className="mt-1 text-xs uppercase tracking-[0.14em] text-background/60">
                {member.role}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-background/75">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}