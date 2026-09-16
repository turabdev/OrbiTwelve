export interface AboutPvmFields {
  purpose: string;
  vision: string;
  mission: string;
}

export default function AboutPvm({ fields }: { fields: AboutPvmFields }) {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
        <div className="rounded-3xl border border-dark-panel/10 p-8">
          <h3 className="text-lg font-medium tracking-tight text-(--color-dark-panel)">
            Our Purpose
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-dark-panel/70">
            {fields.purpose}
          </p>
        </div>
        <div className="rounded-3xl border border-dark-panel/10 p-8">
          <h3 className="text-lg font-medium tracking-tight text-(--color-dark-panel)">
            Our Vision
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-dark-panel/70">
            {fields.vision}
          </p>
        </div>
        <div className="rounded-3xl border border-dark-panel/10 p-8">
          <h3 className="text-lg font-medium tracking-tight text-(--color-dark-panel)">
            Our Mission
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-dark-panel/70">
            {fields.mission}
          </p>
        </div>
      </div>
    </section>
  );
}
