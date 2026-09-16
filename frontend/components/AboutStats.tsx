import RollingCounter from "@/components/RollingCounter";
import type { StatItem } from "@/types/about";

export interface AboutStatsFields {
  founded: number;
  clients: number;
  projects: number;
  industries: number;
  countries: number;
  employees: number;
}

function buildStats(fields: AboutStatsFields): StatItem[] {
  return [
    { value: fields.founded, suffix: "", label: "Founded in" },
    { value: fields.clients, suffix: "+", label: "Clients" },
    { value: fields.projects, suffix: "+", label: "Projects" },
    { value: fields.industries, suffix: "+", label: "Industries" },
    { value: fields.countries, suffix: "+", label: "Countries" },
    { value: fields.employees, suffix: "+", label: "Employees" },
  ];
}

export default function AboutStats({ fields }: { fields: AboutStatsFields }) {
  const stats = buildStats(fields);

  return (
    <section className="px-6 py-16">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 md:grid-cols-6">
        {stats.map((stat, i) => (
          <div key={i} className="text-center">
            <div className="text-3xl font-medium tracking-tight text-(--color-dark-panel) md:text-4xl">
              <RollingCounter value={stat.value} suffix={stat.suffix} />
            </div>
            <p className="mt-2 text-xs uppercase tracking-[0.14em] text-dark-panel/50">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
