import { Reveal, SectionHeader } from "./Reveal";
import {
  Boxes,
  Layers,
  Circle,
  Flame,
  Car,
  Bike,
  Plug,
  KeyRound,
  ArrowUpRight,
} from "lucide-react";

const services = [
  { icon: Boxes, title: "Injection Molds", text: "High-precision thermoplastic injection molds for consumer and industrial products." },
  { icon: Layers, title: "Plastic Molds", text: "Multi-cavity, family and stack molds for large-volume plastic parts." },
  { icon: Circle, title: "Rubber Molds", text: "Compression and transfer rubber molds for seals, gaskets and elastomer parts." },
  { icon: Flame, title: "Die-Casting Molds", text: "Aluminum and zinc die-casting tooling with exceptional thermal life." },
  { icon: Car, title: "Automotive Molds", text: "Under-hood, interior and structural molds meeting automotive PPAP standards." },
  { icon: Bike, title: "Motorcycle Molds", text: "Housings, panels and functional components for two-wheeler manufacturers." },
  { icon: Plug, title: "Electrical Appliance Molds", text: "Complex enclosures and thin-wall parts for white goods and small appliances." },
  { icon: KeyRound, title: "Lock & Commodity Molds", text: "Precision lock components and everyday commodity tooling at scale." },
];

export function Services() {
  return (
    <section id="services" className="relative py-32">
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{ background: "radial-gradient(900px circle at 80% 20%, rgba(212,0,23,0.08), transparent 60%)" }}
      />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeader
          eyebrow="Services"
          title={<>End-to-end mold solutions, from <span className="text-metallic">concept to production</span>.</>}
          description="Eight specialized capabilities under one roof, engineered for reliability and long tool life."
        />

        <div className="mt-20 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={(i % 4) * 0.06}>
              <a
                href="#contact"
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-surface/60 p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-white/25 hover:shadow-[0_30px_60px_-30px_rgba(0,0,0,0.9)]"
              >
                <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

                <div className="mb-8 flex items-start justify-between">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-white/[0.12] to-transparent ring-1 ring-white/10">
                    <s.icon size={20} strokeWidth={1.5} className="text-silver transition-colors group-hover:text-primary" />
                  </div>
                  <ArrowUpRight
                    size={18}
                    className="text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                  />
                </div>

                <h3 className="font-display text-lg font-semibold text-foreground">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>

                <div className="mt-6 flex items-center gap-2 border-t border-white/5 pt-4 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  <span>Request Quote</span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
