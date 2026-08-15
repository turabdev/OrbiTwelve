import type { FC } from "react";
import type { ClientMarqueeProps } from "@/types/portfolios";

const ClientMarquee: FC<ClientMarqueeProps> = ({ section, clients }) => {
  const loop = [...clients, ...clients];

  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <p className="mb-8 text-center text-xs uppercase tracking-[0.18em] text-muted-foreground">
          {section.title}
        </p>

        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-linear-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-linear-to-l from-background to-transparent" />

          <div className="flex animate-marquee items-center gap-14 whitespace-nowrap">
            {loop.map((client, index) => (
              <img
                key={`${client.name}-${index}`}
                src={client.icon}
                alt={client.name}
                title={client.name}
                loading="lazy"
                className="h-9 w-auto opacity-60 transition-opacity hover:opacity-100 dark:invert md:h-10"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientMarquee;
