const services = [
  { number: "01", name: "UI/UX Strategy" },
  { number: "02", name: "Digital Product Design" },
  { number: "03", name: "Visual Identity" },
  { number: "04", name: "Technical Development" },
];

export default function ServicesList() {
  return (
    <section className="relative w-full py-[64px] bg-[var(--background)]">
      <div className="mx-auto max-w-[1280px] px-[80px]">
        <div className="grid grid-cols-2 gap-x-[32px]">
          {/* Left column: heading */}
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--color-dark-panel)]">
              OUR CAPABILITIES
            </p>
            <h2 className="mt-[24px] w-[544px] text-[44px] leading-[1.1] font-semibold text-[var(--color-dark-panel)]">
              Expertise in precision.
            </h2>
          </div>

          {/* Right column: numbered service list */}
          <div>
            {services.map((service, index) => (
              <div
                key={service.number}
                className={`flex items-center justify-between h-[137px] ${
                  index !== 0 ? "border-t border-[var(--color-dark-panel)]/15" : ""
                }`}
              >
                <div className="flex items-center gap-[32px]">
                  <span className="text-sm font-semibold text-[var(--color-accent)]">
                    {service.number}
                  </span>
                  <h3 className="text-[26px] leading-[1.1] font-semibold text-[var(--color-dark-panel)]">
                    {service.name}
                  </h3>
                </div>

                <span className="inline-block w-[13px] h-[13px] text-[var(--color-dark-panel)]/60">
                  →
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
