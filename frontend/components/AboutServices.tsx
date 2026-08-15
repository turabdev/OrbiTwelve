import type { ServiceItem } from "@/types/about";

export default function AboutServices({ services }: { services: ServiceItem[] }) {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <p className="text-center text-xs uppercase tracking-[0.18em] text-dark-panel/50">
          What we do
        </p>
        <h2 className="mt-3 text-balance text-center text-3xl font-medium tracking-tight md:text-5xl">
          Our services
        </h2>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <div
              key={i}
              className="rounded-3xl border border-dark-panel/10 bg-background p-7 transition-colors hover:border-(--color-accent)/40"
            >
              <span className="text-xs font-semibold text-(--color-accent)">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-lg font-medium tracking-tight text-(--color-dark-panel)">
                {service.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-dark-panel/70">
                {service.summary}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-dark-panel/50">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}